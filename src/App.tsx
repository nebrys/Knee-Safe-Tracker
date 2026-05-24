import React, { useState, useEffect, useRef } from "react";
import { DEFAULT_ROUTINES, ROUTINE_VERSION } from "./data/routines";
import { Header } from "./components/Header";
import { PrepSection } from "./components/PrepSection";
import { ExerciseCard } from "./components/ExerciseCard";
import { SupersetCard } from "./components/SupersetCard";
import { FloatingTimer } from "./components/FloatingTimer";
import { HistorySection } from "./components/HistorySection";
import { WeeklyProgress } from "./components/WeeklyProgress";
import { ActiveExerciseState, ActiveSession, HistoryItem, Routine, Exercise } from "./types";
import { Dumbbell, Save, Activity, Trash, CalendarRange, Clock, AlertCircle, Info, Sparkles, Download, Upload } from "lucide-react";

interface WorkoutGroup {
  type: "single" | "superset";
  pairingLetter?: string;
  exercises: {
    state: ActiveExerciseState;
    template: Exercise;
    originalIndex: number;
  }[];
}

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ulppl_theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Active workout routines
  const [routines, setRoutines] = useState<Routine[]>(() => {
    if (typeof window !== "undefined") {
      const storedVersion = localStorage.getItem("ulppl_routines_version");
      if (storedVersion && parseInt(storedVersion) === ROUTINE_VERSION) {
        const stored = localStorage.getItem("ulppl_custom_routines");
        if (stored) {
          try {
            return JSON.parse(stored);
          } catch (e) {
            console.error("Failed to parse custom routines, falling back to default", e);
          }
        }
      }
    }
    return DEFAULT_ROUTINES;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<"workout" | "progress" | "history">("workout");

  // Selected routine ID
  const [selectedRoutineId, setSelectedRoutineId] = useState<string>(() => {
    return routines[0]?.id || "upper1";
  });

  // Active workout tracking states (loads from crash recovery or initializes fresh)
  const [currentWorkoutState, setCurrentWorkoutState] = useState<ActiveExerciseState[]>([]);

  // Rest Timer states
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [timerTitle, setTimerTitle] = useState<string>("");
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Manual timer modal state
  const [isManualTimerModalOpen, setIsManualTimerModalOpen] = useState<boolean>(false);
  const [manualTimerValue, setManualTimerValue] = useState<number>(90);

  // Saved History sessions
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ulppl_v3_history");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse history", e);
        }
      }
    }
    return [];
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync dark mode class on HTML body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ulppl_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ulppl_theme", "light");
    }
  }, [isDarkMode]);

  // Toast trigger utility
  const triggerToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Helper function to load routine exercises into tracking state
  const loadWorkoutState = (routineId: string, forceFresh = false) => {
    const routine = routines.find(r => r.id === routineId);
    if (!routine) return;

    if (!forceFresh) {
      const saved = localStorage.getItem("ulppl_active_session");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as ActiveSession;
          if (parsed.routineId === routineId) {
            setCurrentWorkoutState(parsed.exercises);
            return;
          }
        } catch (e) {
          console.error("Failed to parse active backup session", e);
        }
      }
    }

    // Fresh initialization
    const freshState = routine.exercises.map(ex => ({
      exerciseId: ex.id,
      name: ex.name,
      targetReps: ex.reps,
      selectedReps: ex.defaultReps,
      loggedSets: Array(ex.sets).fill(null),
    }));
    setCurrentWorkoutState(freshState);
  };

  // Synchronize state changes for crash protection
  useEffect(() => {
    if (currentWorkoutState.length > 0) {
      const activeSession: ActiveSession = {
        routineId: selectedRoutineId,
        startTime: Date.now(),
        exercises: currentWorkoutState,
      };
      localStorage.setItem("ulppl_active_session", JSON.stringify(activeSession));
    }
  }, [currentWorkoutState, selectedRoutineId]);

  // Load selected workout on init or switch
  useEffect(() => {
    loadWorkoutState(selectedRoutineId);
  }, [selectedRoutineId, routines]);

  // Persistence of routines version index
  useEffect(() => {
    localStorage.setItem("ulppl_custom_routines", JSON.stringify(routines));
    localStorage.setItem("ulppl_routines_version", ROUTINE_VERSION.toString());
  }, [routines]);

  // Handle manual selection change
  const handleRoutineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rId = e.target.value;
    setSelectedRoutineId(rId);
    loadWorkoutState(rId, true); // force reset when changing drop-down
  };

  // Handle adjusting rep display selectors
  const handleAdjustReps = (exoIndex: number, amount: number) => {
    setCurrentWorkoutState(prev => {
      return prev.map((item, idx) => {
        if (idx === exoIndex) {
          return { ...item, selectedReps: Math.max(0, item.selectedReps + amount) };
        }
        return item;
      });
    });
  };

  // Handle manual keyboard edit of reps input
  const handleManualReps = (exoIndex: number, rawValue: string) => {
    let val = parseInt(rawValue);
    if (isNaN(val) || val < 0) val = 0;
    setCurrentWorkoutState(prev => {
      return prev.map((item, idx) => {
        if (idx === exoIndex) {
          return { ...item, selectedReps: val };
        }
        return item;
      });
    });
  };

  // Toggles the completed state of a set button log
  const handleToggleSet = (exoIndex: number, setIndex: number) => {
    const exerciseState = currentWorkoutState[exoIndex];
    if (!exerciseState) return;

    // Retrieve full template data for details like rest intervals
    const templateRoutine = routines.find(r => r.id === selectedRoutineId);
    if (!templateRoutine) return;
    const templateEx = templateRoutine.exercises[exoIndex];
    if (!templateEx) return;

    const isCurrentlyNull = exerciseState.loggedSets[setIndex] === null;

    setCurrentWorkoutState(prev => {
      return prev.map((item, idx) => {
        if (idx === exoIndex) {
          const sets = [...item.loggedSets];
          sets[setIndex] = isCurrentlyNull ? item.selectedReps : null;
          return { ...item, loggedSets: sets };
        }
        return item;
      });
    });

    // Run side effects OUTSIDE the state updater function to bypass double-eval triggers!
    if (isCurrentlyNull) {
      const seconds = parseRestToSeconds(templateEx.rest);
      startTimer(exerciseState.name, seconds);
    } else {
      stopTimer();
    }
  };

  // Toggles compliance of both exercises in a superset simultaneously
  const handleToggleSupersetSet = (originalIndices: number[], setIndex: number) => {
    if (originalIndices.length === 0) return;

    const firstIdx = originalIndices[0];
    const firstState = currentWorkoutState[firstIdx];
    if (!firstState) return;

    // Determine target completion state -- if any are unlogged, mark all completed
    const isCurrentlyNull = originalIndices.some(idx => currentWorkoutState[idx]?.loggedSets[setIndex] === null);

    // Retrieve active template for rest period
    const templateRoutine = routines.find(r => r.id === selectedRoutineId);
    if (!templateRoutine) return;
    
    // Use rest from the last exercise of the superset as the rest period
    const lastIdx = originalIndices[originalIndices.length - 1];
    const lastTemplate = templateRoutine.exercises[lastIdx];

    setCurrentWorkoutState(prev => {
      return prev.map((item, idx) => {
        if (originalIndices.includes(idx)) {
          const sets = [...item.loggedSets];
          sets[setIndex] = isCurrentlyNull ? item.selectedReps : null;
          return { ...item, loggedSets: sets };
        }
        return item;
      });
    });

    if (isCurrentlyNull && lastTemplate) {
      const timerName = `Superset ${lastTemplate.pairing?.charAt(0) || "Group"} Complete (Set ${setIndex + 1})`;
      const seconds = parseRestToSeconds(lastTemplate.rest);
      startTimer(timerName, seconds);
    } else {
      stopTimer();
    }
  };

  // Group workout items for layout rendering (supersets grouped, singles distinct)
  const getWorkoutGroups = (): WorkoutGroup[] => {
    const activeRoutine = routines.find(r => r.id === selectedRoutineId);
    if (!activeRoutine) return [];
    
    const groups: WorkoutGroup[] = [];
    let currentSupersetLetter: string | null = null;
    let currentSupersetExercises: { state: ActiveExerciseState; template: Exercise; originalIndex: number }[] = [];

    currentWorkoutState.forEach((state, originalIndex) => {
      const template = activeRoutine.exercises.find(e => e.id === state.exerciseId);
      if (!template) return;

      const pairing = template.pairing;
      // Pairing letters like "A" from "A1" or "A2" (only if explicitly marked as a superset)
      const pairingLetter = (template.isSuperset && pairing && pairing.length >= 2 && /^[A-Z]/.test(pairing)) 
        ? pairing.charAt(0) 
        : null;

      if (pairingLetter) {
        if (currentSupersetLetter === pairingLetter) {
          currentSupersetExercises.push({ state, template, originalIndex });
        } else {
          if (currentSupersetLetter !== null) {
            groups.push({
              type: "superset",
              pairingLetter: currentSupersetLetter,
              exercises: currentSupersetExercises,
            });
          }
          currentSupersetLetter = pairingLetter;
          currentSupersetExercises = [{ state, template, originalIndex }];
        }
      } else {
        if (currentSupersetLetter !== null) {
          groups.push({
            type: "superset",
            pairingLetter: currentSupersetLetter,
            exercises: currentSupersetExercises,
          });
          currentSupersetLetter = null;
          currentSupersetExercises = [];
        }
        groups.push({
          type: "single",
          exercises: [{ state, template, originalIndex }],
        });
      }
    });

    if (currentSupersetLetter !== null) {
      groups.push({
        type: "superset",
        pairingLetter: currentSupersetLetter,
        exercises: currentSupersetExercises,
      });
    }

    return groups;
  };

  // Custom regex pattern to normalize timing intervals from '45 seconds (after A2)', '2 min', etc.
  const parseRestToSeconds = (restStr: string): number => {
    let clean = restStr.toLowerCase().replace("rest:", "").trim();
    if (clean.includes("seconds") || clean.includes("s")) {
      const match = clean.match(/\d+/);
      return match ? parseInt(match[0]) : 45;
    }
    if (clean.includes("min") || clean.includes("m")) {
      const match = clean.match(/[\d.]+/);
      const val = match ? parseFloat(match[0]) : 2;
      return Math.round(val * 60);
    }
    return 60; // safe fallback
  };

  // Starts the interactive countdown timer with beep alerts
  const startTimer = (title: string, seconds: number) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimeRemaining(seconds);
    setTimerTitle(title);
    setIsTimerActive(true);

    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          setIsTimerActive(false);
          triggerSoundAlert();
          triggerToast("⏳ Rest complete! Begin your next set.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stops and clears active count state
  const stopTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsTimerActive(false);
  };

  const handleAdjustTimer = (seconds: number) => {
    setTimeRemaining(prev => {
      const val = prev + seconds;
      return val > 0 ? val : 0;
    });
  };

  // Launch Manual rest timer overrides
  const handleLaunchManualTimer = () => {
    setIsManualTimerModalOpen(false);
    startTimer("Manual Timer Trigger", manualTimerValue);
    triggerToast(`⏱️ Manual Rest Timer launched for ${manualTimerValue}s !`);
  };

  // Trigger web audio API beep sounds securely
  const triggerSoundAlert = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      let offset = 0;
      for (let i = 0; i < 5; i++) {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = "square"; // Cut through background noise better than sine
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + offset); // Higher pitch (C6)
        gainNode.gain.setValueAtTime(0.8, audioCtx.currentTime + offset); // Much louder (0.8 vs 0.15)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + offset + 0.3);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + offset);
        osc.stop(audioCtx.currentTime + offset + 0.3);
        offset += 0.4;
      }
    } catch (e) {
      console.log("No web audio permitted on this iframe browser scope", e);
    }
  };

  // Interactive inline renaming helper to modify template custom elements
  const handleRenameExercise = (exoIndex: number) => {
    const currentState = currentWorkoutState[exoIndex];
    if (!currentState) return;

    const newName = prompt(`Rename exercise details for:\n"${currentState.name}"`, currentState.name);
    if (newName && newName.trim() !== "") {
      const cleanName = newName.trim();
      
      // Update template to keep it persistent across routines
      setRoutines(prevRoutines => {
        return prevRoutines.map(r => {
          if (r.id === selectedRoutineId) {
            const updatedExercises = [...r.exercises];
            updatedExercises[exoIndex] = { ...updatedExercises[exoIndex], name: cleanName };
            return { ...r, exercises: updatedExercises };
          }
          return r;
        });
      });

      // Update current active tracking state too
      setCurrentWorkoutState(prev => {
        return prev.map((item, idx) => {
          if (idx === exoIndex) {
            return { ...item, name: cleanName };
          }
          return item;
        });
      });

      triggerToast("✏️ Exercise template updated!");
    }
  };

  // Persists the completed workout into localStorage logs
  const handleSaveSession = () => {
    const targetRoutine = routines.find(r => r.id === selectedRoutineId);
    if (!targetRoutine) return;

    let totalSetsCount = 0;
    let completedSetsCount = 0;

    currentWorkoutState.forEach(ex => {
      totalSetsCount += ex.loggedSets.length;
      completedSetsCount += ex.loggedSets.filter(s => s !== null).length;
    });

    if (completedSetsCount === 0) {
      alert("⚠️ No sets have been logged yet! Toggle sets to save session results.");
      return;
    }

    const sessionRecord: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: Date.now(),
      routineId: selectedRoutineId,
      routineName: targetRoutine.name,
      completedSets: completedSetsCount,
      totalSets: totalSetsCount,
      exercises: currentWorkoutState.map(ex => ({
        name: ex.name,
        isHold: targetRoutine.exercises.find(e => e.id === ex.exerciseId)?.isHold,
        sets: [...ex.loggedSets],
      })),
    };

    const newHistory = [sessionRecord, ...history];
    setHistory(newHistory);
    localStorage.setItem("ulppl_v3_history", JSON.stringify(newHistory));

    // Cleanup active backup state
    localStorage.removeItem("ulppl_active_session");
    
    triggerToast("💪 Congratulations! Workout session achieved.");
    stopTimer();
    
    // Reset tracker clean
    loadWorkoutState(selectedRoutineId, true);
  };

  // Erases a specific session log
  const handleDeleteRow = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem("ulppl_v3_history", JSON.stringify(newHistory));
    triggerToast("🗑️ Log deleted");
  };

  // Clean-up/Prune historical archive to N entries
  const handlePruneHistory = (count: number) => {
    if (history.length <= count) {
      triggerToast(`Archive index is already under ${count} entries.`);
      return;
    }
    const pruned = history.slice(0, count);
    setHistory(pruned);
    localStorage.setItem("ulppl_v3_history", JSON.stringify(pruned));
    triggerToast(`📋 Pruned archive to latest ${count} entries.`);
  };

  // Erases entire local stores
  const handleClearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem("ulppl_v3_history");
    triggerToast("💥 All workout logs have been completely reset.");
  };

  // Restore imported historical logs
  const handleImportHistory = (imported: HistoryItem[]) => {
    setHistory(imported);
    localStorage.setItem("ulppl_v3_history", JSON.stringify(imported));
    triggerToast("📥 History successfully restored!");
  };

  // Toggle tab
  const handleToggleHistoryTab = () => {
    setActiveTab(prev => (prev === "history" ? "workout" : "history"));
  };

  // Export current routines as JSON backup
  const handleExportRoutines = () => {
    try {
      const dataStr = JSON.stringify(routines, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `knee_safe_custom_routines_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast("📥 Custom routines configuration exported!");
    } catch (err) {
      console.error("Routine export failed", err);
      triggerToast("❌ Routine export failed.");
    }
  };

  // Import custom routines from JSON backup
  const handleImportRoutines = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          // Verify simple key properties for security and type safety
          const isValid = parsed.every(r => r && typeof r === "object" && typeof r.id === "string" && Array.isArray(r.exercises));
          if (isValid) {
            setRoutines(parsed);
            
            // Safe selector restoration
            const activeIdExists = parsed.some(r => r.id === selectedRoutineId);
            const targetId = activeIdExists ? selectedRoutineId : (parsed[0]?.id || "upper1");
            setSelectedRoutineId(targetId);
            loadWorkoutState(targetId, true); // force re-sync of display UI state

            triggerToast("📤 Custom routines parsed and restored successfully!");
          } else {
            triggerToast("❌ Invalid routine config format: JSON lacks valid routines structure.");
          }
        } else {
          triggerToast("❌ Invalid format: JSON must be an Array of routines.");
        }
      } catch (err) {
        console.error(err);
        triggerToast("❌ Failed to parse: File is not a valid JSON document.");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // reset input
  };

  // Active routine details
  const activeRoutine = routines.find(r => r.id === selectedRoutineId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 transition-colors duration-200">
      
      {/* Header controls layout */}
      <Header
        isDarkMode={isDarkMode}
        activeTab={activeTab}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenManualTimer={() => setIsManualTimerModalOpen(true)}
        onToggleHistory={handleToggleHistoryTab}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Navigation Tabs Switcher */}
        <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-2xl shadow-sm mb-6 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("workout")}
            id="tab-btn-workout"
            className={`flex-1 py-2.5 px-2 sm:px-4 rounded-xl font-display font-bold text-xs sm:text-sm text-center transition-all cursor-pointer ${
              activeTab === "workout"
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/10"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Workout
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            id="tab-btn-progress"
            className={`flex-1 py-2.5 px-2 sm:px-4 rounded-xl font-display font-bold text-xs sm:text-sm text-center transition-all cursor-pointer ${
              activeTab === "progress"
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/10"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Weekly Progress
          </button>
          <button
            onClick={() => setActiveTab("history")}
            id="tab-btn-history"
            className={`flex-1 py-2.5 px-2 sm:px-4 rounded-xl font-display font-bold text-xs sm:text-sm text-center transition-all cursor-pointer ${
              activeTab === "history"
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/10"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            History Logs
          </button>
        </div>

        {/* WORKOUT INTERACTIVE PANEL */}
        {activeTab === "workout" && (
          <div className="space-y-6">
            
            {/* Core McGill Warmup collapsible guidelines card */}
            <PrepSection />

            {/* Workout dropdown panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <label className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  Active Split Session
                </label>
                <select
                  id="workout-routine-selector"
                  value={selectedRoutineId}
                  onChange={handleRoutineChange}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-display font-extrabold text-sm sm:text-base px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700 outline-none focus:ring-2 focus:ring-brand-500/50 w-full md:w-60 cursor-pointer"
                >
                  {routines.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.subtitle})
                    </option>
                  ))}
                </select>
              </div>

              {activeRoutine && (
                <div className="flex-1 text-left md:text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">
                    Day Blueprint Focus
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {activeRoutine.focus}
                  </p>
                </div>
              )}
            </div>

            {/* Custom Routines Export/Import Configuration Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-250/60 dark:border-slate-800/80">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Custom Routines Configuration Backup
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-450">
                  Export or import your fully customized exercises, setups, name edits and progressions.
                </p>
              </div>
              <div className="flex items-center gap-2 select-none self-start sm:self-auto">
                <button
                  onClick={handleExportRoutines}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Download dynamic routines configuration to a JSON backup"
                >
                  <Download className="w-3.5 h-3.5 text-brand-500" />
                  <span>Export JSON</span>
                </button>
                <label
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Upload previously saved JSON file to restore custom routine settings"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Import JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportRoutines}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Exercise log cards checklist */}
            <div className="space-y-4">
              {currentWorkoutState.length > 0 && activeRoutine ? (
                getWorkoutGroups().map((group, idx) => {
                  if (group.type === "superset" && group.pairingLetter) {
                    return (
                      <SupersetCard
                        key={`superset-${group.pairingLetter}`}
                        pairingLetter={group.pairingLetter}
                        exercises={group.exercises}
                        onRename={handleRenameExercise}
                        onAdjustReps={handleAdjustReps}
                        onManualReps={handleManualReps}
                        onToggleSupersetSet={handleToggleSupersetSet}
                      />
                    );
                  } else {
                    const singleEx = group.exercises[0];
                    if (!singleEx) return null;
                    return (
                      <ExerciseCard
                        key={singleEx.state.exerciseId}
                        exState={singleEx.state}
                        exTemplate={singleEx.template}
                        exoIndex={singleEx.originalIndex}
                        onRename={handleRenameExercise}
                        onAdjustReps={handleAdjustReps}
                        onManualReps={handleManualReps}
                        onToggleSet={handleToggleSet}
                      />
                    );
                  }
                })
              ) : (
                <div className="py-12 text-center text-slate-500">
                  Building active plan...
                </div>
              )}
            </div>

            {/* Save Entire Workout log */}
            <button
              id="btn-save-entire-workout"
              onClick={handleSaveSession}
              className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-99 text-white font-display font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-500/20 cursor-pointer transition-all duration-200 mt-8"
            >
              <Save className="w-5 h-5" /> Enregistrer la Séance (Save Workout)
            </button>
          </div>
        )}

        {/* WEEKLY PROGRESS & STATISTICS PANEL */}
        {activeTab === "progress" && (
          <WeeklyProgress
            history={history}
          />
        )}

        {/* HISTORY DETAILS PANEL */}
        {activeTab === "history" && (
          <HistorySection
            history={history}
            onDeleteRow={handleDeleteRow}
            onPruneHistory={handlePruneHistory}
            onClearAll={handleClearAllHistory}
            onImportHistory={handleImportHistory}
          />
        )}

      </main>

      {/* FLOATING ACTION REST COUNTER */}
      <FloatingTimer
        timeRemaining={timeRemaining}
        title={timerTitle}
        isActive={isTimerActive}
        onAdjust={handleAdjustTimer}
        onSkip={stopTimer}
      />

      {/* MANUAL REST TIMER LAUNCHER MODAL */}
      {isManualTimerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-2">
              <Clock className="text-brand-500 w-5 h-5" /> Manual Timer Setup
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Enter custom rest duration (in seconds) to run a background ticker.
            </p>

            <input
              type="number"
              value={manualTimerValue}
              onChange={(e) => setManualTimerValue(Math.max(5, parseInt(e.target.value) || 0))}
              className="w-full text-center text-4xl font-extrabold font-mono text-brand-600 dark:text-brand-400 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl py-5 outline-none mb-6 focus:ring-2 focus:ring-brand-500/50"
              placeholder="90"
              min="5"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsManualTimerModalOpen(false)}
                className="py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs sm:text-sm cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLaunchManualTimer}
                className="py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow-md shadow-brand-500/10 transition-colors"
              >
                Launch Ticker 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST SYSTEM POP-UP NOTIFICATIONS */}
      {toastMessage && (
        <div
          id="global-tracker-toast"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xl px-5 py-3 rounded-2xl font-mono text-xs font-semibold z-55 flex items-center gap-2 border border-slate-700 dark:border-slate-200 animate-slideUp"
        >
          <Sparkles className="w-4 h-4 text-amber-400 dark:text-amber-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
