import React from "react";
import { Sun, Moon, Clock, CalendarRange, HeartHandshake, Smile } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  activeTab: "workout" | "progress" | "history";
  onToggleTheme: () => void;
  onOpenManualTimer: () => void;
  onToggleHistory: () => void;
}

export function Header({
  isDarkMode,
  activeTab,
  onToggleTheme,
  onOpenManualTimer,
  onToggleHistory,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md px-4 sm:px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left: Branding & Core Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/10">
            🏋️‍♂️
          </div>
          <div>
            <h1 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-50 tracking-tight leading-none flex items-center gap-1.5">
              Knee-Safe Tracker
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-450 font-medium mt-1">
              Active Joints Routine
            </p>
          </div>
        </div>

        {/* Right Actions: Theme, Manual Timer, History */}
        <div className="flex items-center gap-1.5">
          {/* Theme switcher */}
          <button
            id="header-toggle-theme"
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-xl text-slate-650 bg-slate-50 border border-slate-100 dark:text-slate-300 dark:bg-slate-850 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-500 dark:hover:text-brand-400 transition-all active:scale-95"
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 h-5" /> : <Moon className="w-4 h-4 sm:w-5 h-5" />}
          </button>

          {/* Manual Timer launcher */}
          <button
            id="header-manual-timer"
            onClick={onOpenManualTimer}
            className="p-2 sm:p-2.5 rounded-xl text-slate-650 bg-slate-50 border border-slate-100 dark:text-slate-300 dark:bg-slate-850 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-500 dark:hover:text-brand-400 transition-all active:scale-95 flex items-center gap-1 text-slate-600"
            title="Manual Rest Timer"
          >
            <Clock className="w-4 h-4 sm:w-5 h-5" />
          </button>

          {/* History accordion toggler */}
          <button
            id="header-toggle-history"
            onClick={onToggleHistory}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all active:scale-95 flex items-center gap-1.5 ${
              activeTab === "history"
                ? "bg-brand-500 border-brand-600 text-white shadow-md shadow-brand-500/15 font-semibold"
                : "bg-slate-50 border-slate-100 text-slate-650 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-500 dark:hover:text-brand-400"
            }`}
            title="View History Panels"
          >
            <CalendarRange className="w-4 h-4 sm:w-5 h-5" />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
              Logs
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
