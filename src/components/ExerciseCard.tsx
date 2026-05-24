import React, { useState } from "react";
import { Info, Edit2, ChevronDown, ChevronUp, Sparkles, AlertCircle, Dumbbell, ShieldCheck } from "lucide-react";
import { ActiveExerciseState, Exercise } from "../types";

interface ExerciseCardProps {
  key?: React.Key;
  exState: ActiveExerciseState;
  exTemplate: Exercise;
  exoIndex: number;
  onRename: (exoIndex: number) => void;
  onAdjustReps: (exoIndex: number, amount: number) => void;
  onManualReps: (exoIndex: number, value: string) => void;
  onToggleSet: (exoIndex: number, setIndex: number) => void;
}

export function ExerciseCard({
  exState,
  exTemplate,
  exoIndex,
  onRename,
  onAdjustReps,
  onManualReps,
  onToggleSet,
}: ExerciseCardProps) {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Derive coloring and tags for supersets
  const getPairingStyles = (pairing?: string) => {
    if (!pairing) return null;
    const isA = pairing.startsWith("A");
    const isB = pairing.startsWith("B");
    const isC = pairing.startsWith("C");
    const isD = pairing.startsWith("D");

    if (isA) {
      return {
        bg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/50",
        label: `Superset ${pairing}`,
      };
    }
    if (isB) {
      return {
        bg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-200/50 dark:border-purple-800/50",
        label: `Superset ${pairing}`,
      };
    }
    if (isC) {
      return {
        bg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50",
        label: `Superset ${pairing}`,
      };
    }
    return {
      bg: "bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 border-pink-200/50 dark:border-pink-800/50",
      label: pairing.includes("Drop") ? `Drop-Set ${pairing}` : `Pairing ${pairing}`,
    };
  };

  const pairingStyle = getPairingStyles(exTemplate.pairing);

  return (
    <div
      id={`exercise-card-${exTemplate.id}`}
      className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 mb-4 p-5"
    >
      {/* Exercise Core Header */}
      <div className="flex justify-between items-start gap-3 mb-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-display font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100 hover:text-brand-500 dark:hover:text-brand-100 transition-colors">
              {exState.name}
            </h4>
            <button
              id={`btn-rename-${exoIndex}`}
              onClick={() => onRename(exoIndex)}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md transition-colors"
              title="Rename Exercise"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {exTemplate.targetMuscle && (
              <span className="inline-flex text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md">
                {exTemplate.targetMuscle}
              </span>
            )}
            {pairingStyle && (
              <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${pairingStyle.bg}`}>
                {pairingStyle.label}
              </span>
            )}
          </div>
        </div>

        {/* Info Toggle Button */}
        <button
          id={`btn-info-${exoIndex}`}
          onClick={() => setIsOpenInfo(prev => !prev)}
          className={`p-2 rounded-xl border transition-all ${
            isOpenInfo
              ? "bg-brand-50 border-brand-200 text-brand-500 dark:bg-brand-950/20 dark:border-brand-900 dark:text-brand-400 animate-pulse"
              : "bg-slate-50 border-slate-100 text-slate-400 dark:bg-slate-800 dark:border-slate-700/80 dark:text-slate-500"
          }`}
          title="Technique & Form Tips"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Target & Rest Row */}
      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-3.5 pb-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.05em]">Goal Reps</span>
          <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">{exState.targetReps}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.05em]">Rest Interval</span>
          <span className="font-mono text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{exTemplate.rest}</span>
        </div>
      </div>

      {/* Rep-Picker Counter System */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950/40 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800/50 mb-4 transition-all hover:bg-slate-100/50 dark:hover:bg-slate-950/60">
        <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
          {exTemplate.isHold ? "Rep Hold (seconds)" : "Reps to Log"}
        </span>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-full px-1.5 py-1">
          <button
            id={`btn-dec-reps-${exoIndex}`}
            onClick={() => onAdjustReps(exoIndex, -1)}
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border border-slate-100 dark:border-slate-800 transition-colors cursor-pointer"
          >
            -
          </button>
          
          <input
            id={`input-reps-${exoIndex}`}
            type="number"
            value={exState.selectedReps}
            onChange={(e) => onManualReps(exoIndex, e.target.value)}
            className="w-12 text-center text-sm font-bold text-slate-850 dark:text-slate-100 bg-transparent border-0 outline-none focus:ring-0 focus:outline-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          />

          <button
            id={`btn-inc-reps-${exoIndex}`}
            onClick={() => onAdjustReps(exoIndex, 1)}
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border border-slate-100 dark:border-slate-800 transition-colors cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* Set Buttons Container */}
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
        {exState.loggedSets.map((loggedReps, sIdx) => {
          const isDone = loggedReps !== null;
          return (
            <button
              key={sIdx}
              id={`btn-set-${exoIndex}-${sIdx}`}
              onClick={() => onToggleSet(exoIndex, sIdx)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                isDone
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold scale-98 shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200/70 border-slate-200/40 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700/80 dark:border-slate-700/50 dark:text-slate-400 font-medium"
              }`}
            >
              <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Set {sIdx + 1}</span>
              <span className="font-mono text-sm leading-tight mt-0.5">
                {isDone ? `${loggedReps} r` : "—"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Biomechanical Active Info Overlay Guide (Displayed OVER the card) */}
      {isOpenInfo && (
        <div className="absolute inset-0 bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-900/55 rounded-2xl shadow-xl z-30 flex flex-col justify-between p-5 animate-fadeIn">
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-2 mb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                <Dumbbell className="w-4 h-4" /> FORM & SAFETY CUES
              </span>
              <button
                id={`btn-close-info-${exoIndex}`}
                onClick={() => setIsOpenInfo(false)}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-350 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                title="Dismiss details"
              >
                <span className="font-extrabold text-sm">✕</span>
              </button>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block tracking-wider mb-0.5">Setup Position</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  {exTemplate.setup}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block tracking-wider mb-0.5">Form Action</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  {exTemplate.form}
                </p>
              </div>

              <div className="bg-emerald-500/[0.03] dark:bg-emerald-500/[0.01] border border-emerald-500/10 rounded-xl p-3">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block tracking-wider flex items-center gap-1 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> High-Safety Cues
                </span>
                <ul className="space-y-1.5">
                  {exTemplate.cues.map((cue, cIdx) => (
                    <li key={cIdx} className="text-xs text-slate-500 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span className="font-semibold">{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpenInfo(false)}
            className="w-full mt-3 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all border border-slate-200/40 dark:border-slate-700/50 cursor-pointer text-center"
          >
            Back to Exercise Tracker
          </button>
        </div>
      )}
    </div>
  );
}
