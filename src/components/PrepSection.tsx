import React, { useState } from "react";
import { CheckSquare, Square, ChevronDown, ChevronUp, Sparkles, Flame, ShieldAlert } from "lucide-react";

export function PrepSection() {
  const [isOpen, setIsOpen] = useState(true);
  const [mcgillStatus, setMcgillStatus] = useState<Record<string, boolean>>({
    "curl_up": false,
    "side_plank": false,
    "bird_dog": false,
  });
  const [warmupStatus, setWarmupStatus] = useState<Record<string, boolean>>({
    "bike": false,
    "joints": false,
    "cat_cow": false,
    "pull_apart": false,
    "shoulder_rot": false,
  });

  const toggleMcgill = (key: string) => {
    setMcgillStatus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleWarmup = (key: string) => {
    setWarmupStatus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const mcgillItems = [
    { id: "curl_up", name: "Curl-Up", desc: "6, 4, 2 holds of 8-10 seconds" },
    { id: "side_plank", name: "Side Plank", desc: "6, 4, 2 holds of 8-10 seconds (per side)" },
    { id: "bird_dog", name: "Bird-Dog", desc: "6, 4, 2 holds of 8-10 seconds (per side)" },
  ];

  const warmupItems = [
    { id: "bike", name: "5 mins Stationary Bike", desc: "Low-intensity spin to warm joint fluid" },
    { id: "joints", name: "Joint Circles", desc: "Hips, knees, ankles, and shoulder rotations" },
    { id: "cat_cow", name: "Cat-Cow Stretch", desc: "8-10 slow reps to mobilize the spine pain-free" },
    { id: "pull_apart", name: "Band Pull-Apart x10", desc: "Squeeze shoulder blades, extend fully" },
    { id: "shoulder_rot", name: "External Shoulder Rotation x10", desc: "Keep elbows glued to ribs, pull band outward" },
  ];

  const allMcgillDone = Object.values(mcgillStatus).every(Boolean);
  const allWarmupDone = Object.values(warmupStatus).every(Boolean);

  return (
    <div id="prep-section" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-6 overflow-hidden transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
              Session Warmup & McGill Core Prep
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Essential knee-safe joint activation and spine stabilization
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {allMcgillDone && allWarmupDone && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-900/50">
              <Sparkles className="w-3 h-3" /> Fully Prepared
            </span>
          )}
          {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* McGill Core Section */}
          <div className="bg-amber-500/[0.02] dark:bg-amber-500/[0.01] border border-amber-500/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                Step 1: McGill Big 3
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">8-10 seconds holds</span>
            </div>

            <div className="space-y-3">
              {mcgillItems.map(item => {
                const checked = mcgillStatus[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleMcgill(item.id)}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/45 text-left transition-colors"
                  >
                    <div className="mt-0.5 text-slate-400 dark:text-slate-500">
                      {checked ? (
                        <CheckSquare className="w-5 h-5 text-amber-500" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <span className={`text-sm font-semibold block transition-all ${checked ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-700 dark:text-slate-200"}`}>
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 block">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-3.5 flex items-center gap-2 p-2 bg-amber-500/[0.05] dark:bg-amber-500/[0.02] text-amber-700 dark:text-amber-350 rounded-lg text-xs border border-amber-500/10">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Perfect holds are key to loading glute/hip structures pain-free.</span>
            </div>
          </div>

          {/* Warmup Checklist */}
          <div className="bg-sky-500/[0.02] dark:bg-sky-500/[0.01] border border-sky-500/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-450 bg-sky-500/10 px-2 py-0.5 rounded-md">
                Step 2: Joint Heat
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Circulation boost</span>
            </div>

            <div className="space-y-2 max-h-[210px] overflow-y-auto pr-1">
              {warmupItems.map(item => {
                const checked = warmupStatus[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleWarmup(item.id)}
                    className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/45 text-left transition-colors"
                  >
                    <div className="mt-0.5 text-slate-400 dark:text-slate-500">
                      {checked ? (
                        <CheckSquare className="w-5 h-5 text-sky-500" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <span className={`text-sm font-semibold block transition-all ${checked ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-700 dark:text-slate-200"}`}>
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 block">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
