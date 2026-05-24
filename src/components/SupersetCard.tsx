import React, { useState } from "react";
import { Info, Edit2, ShieldCheck, Dumbbell, Link, Sparkles, HelpCircle, Activity } from "lucide-react";
import { ActiveExerciseState, Exercise } from "../types";

interface SupersetCardProps {
  key?: React.Key;
  pairingLetter: string;
  exercises: {
    state: ActiveExerciseState;
    template: Exercise;
    originalIndex: number;
  }[];
  onRename: (exoIndex: number) => void;
  onAdjustReps: (exoIndex: number, amount: number) => void;
  onManualReps: (exoIndex: number, value: string) => void;
  onToggleSupersetSet: (originalIndices: number[], setIndex: number) => void;
}

export function SupersetCard({
  pairingLetter,
  exercises,
  onRename,
  onAdjustReps,
  onManualReps,
  onToggleSupersetSet,
}: SupersetCardProps) {
  // Local state to keep track of which exercise has its info sheet open
  const [openInfoIndex, setOpenInfoIndex] = useState<number | null>(null);

  // Styling based on Superset letter
  const getThemeColor = (letter: string) => {
    switch (letter.toUpperCase()) {
      case "A":
        return {
          border: "border-l-4 border-l-blue-500",
          badge: "bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-300 border-blue-200/50 dark:border-blue-900/60",
          glow: "shadow-blue-500/5",
        };
      case "B":
        return {
          border: "border-l-4 border-l-purple-500",
          badge: "bg-purple-50 dark:bg-purple-950/45 text-purple-600 dark:text-purple-300 border-purple-200/50 dark:border-purple-900/60",
          glow: "shadow-purple-500/5",
        };
      case "C":
        return {
          border: "border-l-4 border-l-amber-500",
          badge: "bg-amber-50 dark:bg-amber-950/45 text-amber-600 dark:text-amber-300 border-amber-200/50 dark:border-amber-900/60",
          glow: "shadow-amber-500/5",
        };
      default:
        return {
          border: "border-l-4 border-l-rose-500",
          badge: "bg-rose-50 dark:bg-rose-950/45 text-rose-600 dark:text-rose-300 border-rose-200/50 dark:border-rose-900/60",
          glow: "shadow-rose-500/5",
        };
    }
  };

  const theme = getThemeColor(pairingLetter);

  // Find the max sets among grouped exercises
  const maxSets = Math.max(...exercises.map(ex => ex.state.loggedSets.length), 3);

  // Group indices of the exercises so we can batch update them
  const originalIndices = exercises.map(ex => ex.originalIndex);

  return (
    <div
      id={`superset-card-${pairingLetter}`}
      className={`relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-5 sm:p-6 mb-5 ${theme.border} ${theme.glow}`}
    >
      {/* Group Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700/60">
            <Link className="w-4 h-4 text-brand-500" />
          </div>
          <div>
            <span className={`inline-flex text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${theme.badge} mr-2`}>
              SUPERSET {pairingLetter}
            </span>
            <h3 className="font-display font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 inline-block align-middle">
              Antagonist Paired System
            </h3>
          </div>
        </div>
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          Alternate back-to-back, rest after last card
        </p>
      </div>

      {/* Exercises Stack */}
      <div className="space-y-5">
        {exercises.map((groupEx, idx) => {
          const { state, template, originalIndex } = groupEx;
          const isInfoOpen = openInfoIndex === idx;

          return (
            <div
              key={template.id}
              className={`relative border border-slate-100 dark:border-slate-800/70 rounded-2xl p-4 transition-all duration-200 ${
                isInfoOpen 
                  ? "bg-slate-50/55 dark:bg-slate-950/30" 
                  : "bg-transparent"
              }`}
            >
              {/* Individual Header */}
              <div className="flex justify-between items-start gap-3 mb-2.5">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black text-brand-650 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/5 px-2 py-0.5 rounded-md border border-brand-500/5">
                      {template.pairing || `${pairingLetter}${idx + 1}`}
                    </span>
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-snug">
                      {state.name}
                    </h4>
                    <button
                      id={`btn-superset-rename-${originalIndex}`}
                      onClick={() => onRename(originalIndex)}
                      className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md transition-colors"
                      title="Rename Exercise"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    {template.targetMuscle && (
                      <span className="inline-flex text-[9px] font-extrabold uppercase tracking-wider bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md border border-slate-200/10">
                        {template.targetMuscle}
                      </span>
                    )}
                    <span className="inline-flex text-[9px] font-medium text-slate-400 dark:text-slate-500">
                      {template.isHold ? "Target Time:" : "Target Reps:"} <b className="font-bold text-slate-600 dark:text-slate-300 ml-0.5">{state.targetReps}</b>
                    </span>
                  </div>
                </div>

                {/* Info and Help Sheet button */}
                <button
                  id={`btn-superset-info-${originalIndex}`}
                  onClick={() => setOpenInfoIndex(isInfoOpen ? null : idx)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    isInfoOpen
                      ? "bg-brand-50 border-brand-200 text-brand-500 dark:bg-brand-950/20 dark:border-brand-900 dark:text-brand-400"
                      : "bg-slate-50 border-slate-100 text-slate-400 dark:bg-slate-800 dark:border-slate-700/60 dark:text-slate-500"
                  }`}
                  title="Form cues and guide details"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Rep Adjuster Box inside the card */}
              <div className="flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20 px-3.5 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800/40 mb-1">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  {template.isHold ? "Time to lock:" : "Actual reps to lock:"}
                </span>
                
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-full px-1.5 py-0.5">
                  <button
                    id={`btn-superset-dec-${originalIndex}`}
                    onClick={() => onAdjustReps(originalIndex, -1)}
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-black text-xs cursor-pointer transition-colors border border-slate-50 dark:border-slate-800"
                  >
                    -
                  </button>
                  
                  <input
                    id={`input-superset-reps-${originalIndex}`}
                    type="number"
                    value={state.selectedReps}
                    onChange={(e) => onManualReps(originalIndex, e.target.value)}
                    className="w-9 text-center text-xs font-black text-slate-800 dark:text-slate-100 bg-transparent border-0 outline-none focus:ring-0 focus:outline-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  />

                  <button
                    id={`btn-superset-inc-${originalIndex}`}
                    onClick={() => onAdjustReps(originalIndex, 1)}
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-black text-xs cursor-pointer transition-colors border border-slate-50 dark:border-slate-800"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dynamic Overlay Info Panel Inside */}
              {isInfoOpen && (
                <div className="mt-3.5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5 text-left animate-fadeIn">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase block tracking-wider mb-0.5">Biomechanical Setup Location</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                      {template.setup}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase block tracking-wider mb-0.5">Correct Execution Rules</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                      {template.form}
                    </p>
                  </div>

                  <div className="bg-emerald-500/[0.03] dark:bg-emerald-500/[0.01]/10 border border-emerald-500/10 rounded-xl p-3">
                    <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase block tracking-wider flex items-center gap-1 mb-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> High-Safety Coaching Cues
                    </span>
                    <ul className="space-y-1">
                      {template.cues.map((cue, cIdx) => (
                        <li key={cIdx} className="text-xs text-slate-500 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed font-semibold">
                          <span className="text-emerald-500 shrink-0">✓</span>
                          <span>{cue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Unified Set Tracker Row */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/85">
        <div className="mb-3 text-left">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
            SUPERSets Complete Tracker ({exercises[exercises.length - 1]?.template.rest})
          </span>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Log both exercises consecutively as a single set to kick off recovery rest intervals:
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
          {Array.from({ length: maxSets }).map((_, sIdx) => {
            // Check if BOTH exercises have values logged for this set
            const logSummary = exercises.map(ex => {
              const val = ex.state.loggedSets[sIdx];
              return val !== null ? `${val}r` : null;
            });

            const isDone = logSummary.every(item => item !== null);
            const isPartiallyDone = logSummary.some(item => item !== null) && !isDone;

            const repLabels = logSummary.map((val, idx) => {
              return val ? val : "—";
            }).join(" + ");

            return (
              <button
                key={sIdx}
                id={`btn-superset-set-${pairingLetter}-${sIdx}`}
                onClick={() => onToggleSupersetSet(originalIndices, sIdx)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border text-center transition-all cursor-pointer ${
                  isDone
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-350 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-black scale-98 shadow-sm"
                    : isPartiallyDone
                    ? "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/80 text-amber-600 dark:text-amber-400 font-bold"
                    : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border-slate-200/50 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold"
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-black">Set {sIdx + 1}</span>
                <span className="font-mono text-[10px] sm:text-xs leading-tight mt-1 opacity-90 truncate max-w-full px-1">
                  {isDone || isPartiallyDone ? repLabels : "—"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
