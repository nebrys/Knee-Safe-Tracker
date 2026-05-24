import React from "react";
import { Timer, ArrowRight, PlusCircle, MinusCircle, CheckCircle } from "lucide-react";

interface FloatingTimerProps {
  timeRemaining: number;
  title: string;
  isActive: boolean;
  onAdjust: (seconds: number) => void;
  onSkip: () => void;
}

export function FloatingTimer({
  timeRemaining,
  title,
  isActive,
  onAdjust,
  onSkip,
}: FloatingTimerProps) {
  if (!isActive) return null;

  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  const timeStr = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  return (
    <div
      id="floating-rest-timer"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-lg bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-slate-100 border border-slate-800 rounded-2xl shadow-2xl z-50 p-4 transition-all duration-300 animate-fadeIn"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Active exercise and clock */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-500/20 text-brand-400 rounded-xl relative">
            <Timer className="w-5 h-5 animate-spin-slow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Active Rest Interval for:
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200 block truncate max-w-[150px] sm:max-w-[200px]">
              {title}
            </span>
          </div>
        </div>

        {/* Big Countdown Timer */}
        <div className="text-2xl sm:text-3xl font-bold font-mono text-brand-400 tracking-wider">
          {timeStr}
        </div>

        {/* Action button triggers */}
        <div className="flex items-center gap-1.5">
          <button
            id="btn-timer-plus30"
            onClick={() => onAdjust(30)}
            className="p-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white rounded-xl transition-all font-semibold text-xs flex items-center gap-1"
            title="Add 30 seconds"
          >
            +30s
          </button>
          
          <button
            id="btn-timer-skip"
            onClick={onSkip}
            className="px-3 py-2 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-md shadow-brand-500/10 transition-all"
            title="Skip rest"
          >
            Skip <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
