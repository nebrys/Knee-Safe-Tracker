import React, { useState, useEffect } from "react";
import { HistoryItem } from "../types";
import { Award, Flame, Zap, ShieldAlert, Sparkles, PlusCircle, ArrowUpRight, TrendingUp, Info, Activity, AlertCircle } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface WeeklyProgressProps {
  history: HistoryItem[];
  onAddRecoverySession: () => void;
}

export function WeeklyProgress({ history, onAddRecoverySession }: WeeklyProgressProps) {
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // Constants
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const startTime = now - SEVEN_DAYS_MS;

  // Filter last 7 days of history
  const recentHistory = history.filter(item => item.timestamp >= startTime);

  // Sum completed sets
  const totalSetsSevenDays = recentHistory.reduce((acc, curr) => acc + curr.completedSets, 0);

  // Sum cumulative reps
  const totalRepsSevenDays = recentHistory.reduce((acc, curr) => {
    let repSum = 0;
    curr.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s !== null) {
          repSum += s;
        }
      });
    });
    return acc + repSum;
  }, 0);

  // Streak calculations
  const calculateStreak = (): number => {
    if (history.length === 0) return 0;
    
    // Convert timestamps to calendar day string index to avoid hour disparities
    const trainedDates = new Set<string>();
    history.forEach(item => {
      const d = new Date(item.timestamp);
      trainedDates.add(d.toDateString());
    });

    let streak = 0;
    const current = new Date();
    
    // Check if user worked out today or yesterday (to keep the streak active)
    const todayStr = current.toDateString();
    current.setDate(current.getDate() - 1);
    const yesterdayStr = current.toDateString();

    if (!trainedDates.has(todayStr) && !trainedDates.has(yesterdayStr)) {
      return 0; // Streak broken
    }

    // Roll backwards to count sequence
    const checkDate = new Date(); // reset to today
    while (true) {
      if (trainedDates.has(checkDate.toDateString())) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  // Construct Day-by-day metrics for the selected range
  const getRangeData = () => {
    const list = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const limit = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    
    for (let i = limit - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toDateString();
      const shortLabel = weekdays[d.getDay()];
      
      // label format based on range
      let label = "";
      if (limit === 7) {
        label = shortLabel;
      } else {
        label = `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;
      }

      const dayLabel = `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
      
      // Find workouts matching this day
      const workoutsThisDay = history.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate.toDateString() === dateString;
      });

      const setsDone = workoutsThisDay.reduce((acc, curr) => acc + curr.completedSets, 0);
      const repsDone = workoutsThisDay.reduce((accEx, currEx) => {
        let rs = 0;
        currEx.exercises.forEach(ex => {
          ex.sets.forEach(s => {
            if (s !== null) rs += s;
          });
        });
        return accEx + rs;
      }, 0);
      
      const routinesDone = workoutsThisDay.map(w => w.routineName);

      list.push({
        dateKey: dateString,
        name: label, // for XAxis in recharts
        sets: setsDone,
        reps: repsDone,
        fullDate: dayLabel,
        routines: routinesDone,
      });
    }
    return list;
  };

  const chartData = getRangeData();
  const rangeCompletedSets = chartData.reduce((acc, curr) => acc + curr.sets, 0);
  const maxSetsInDay = Math.max(...chartData.map(d => d.sets), 4);

  // Weekly Set Goal Target progress %
  const WEEKLY_SETS_TARGET = 24;
  const targetPercent = Math.min(100, Math.round((totalSetsSevenDays / WEEKLY_SETS_TARGET) * 100));

  // PROGRESS OVERLOAD ANALYSIS: Compare latest workout stats of a routine vs the one before it to show progress
  const getProgressOverloadAnalysis = () => {
    // Group history items by routineId
    const routinesTypeHistory: Record<string, HistoryItem[]> = {};
    history.forEach(item => {
      if (!routinesTypeHistory[item.routineId]) {
        routinesTypeHistory[item.routineId] = [];
      }
      routinesTypeHistory[item.routineId].push(item);
    });

    const analysisResults: {
      routineName: string;
      latestDate: string;
      status: "progress" | "stable" | "regression";
      title: string;
      description: string;
    }[] = [];

    Object.keys(routinesTypeHistory).forEach(rId => {
      // Sort in descending order of time
      const items = routinesTypeHistory[rId].sort((a, b) => b.timestamp - a.timestamp);
      if (items.length < 2) return; // Need at least two history entries to compare

      const latest = items[0];
      const previous = items[1];

      // Exclude simple recovery check-ins
      if (rId === "recovery") return;

      const latestCompletedSets = latest.completedSets;
      const prevCompletedSets = previous.completedSets;

      // Calculate total reps inside completed sets
      const sumReps = (item: HistoryItem) => {
        let total = 0;
        item.exercises.forEach(ex => {
          ex.sets.forEach(s => {
            if (s !== null) total += s;
          });
        });
        return total;
      };

      const latestReps = sumReps(latest);
      const prevReps = sumReps(previous);

      if (latestCompletedSets > prevCompletedSets || latestReps > prevReps) {
        analysisResults.push({
          routineName: latest.routineName,
          latestDate: latest.date,
          status: "progress",
          title: "📈 Progressive Overload Achieved!",
          description: `You logged ${latestCompletedSets} sets (${latestReps} reps) compared to ${prevCompletedSets} sets (${prevReps} reps) previously. Mechanical load increased!`,
        });
      } else if (latestCompletedSets === prevCompletedSets && latestReps === prevReps) {
        analysisResults.push({
          routineName: latest.routineName,
          latestDate: latest.date,
          status: "stable",
          title: "⚖️ Workload Consistently Maintained",
          description: `Matched previous stats of ${latestCompletedSets} sets exactly. Perfect consistency for consolidation!`,
        });
      } else {
        analysisResults.push({
          routineName: latest.routineName,
          latestDate: latest.date,
          status: "regression",
          title: "⚠️ Deload or Caution Applied",
          description: `Logged fewer reps or sets (${latestCompletedSets} sets vs ${prevCompletedSets} sets previously). This acts as a joint-preserving protective mechanism. Avoid tendon irritation!`,
        });
      }
    });

    return analysisResults;
  };

  const overloadReports = getProgressOverloadAnalysis();

  // Joint coaching engine
  const getBiomechanicalCoachFeedback = () => {
    if (history.length === 0) {
      return {
        title: "Knee Protection Baseline",
        desc: "Add your first logged session. Biomechanical tracking starts on registration of multiple stats.",
        status: "info",
      };
    }

    // Check last workout date
    const latestItem = history.sort((a,b) => b.timestamp - a.timestamp)[0];
    const daysSinceLast = (now - latestItem.timestamp) / (24 * 60 * 60 * 1000);

    if (daysSinceLast > 3.5) {
      return {
        title: "🌱 Extended Joint Rest Warning",
        desc: "No active movement logged for over 3 days. Connective cartilage thrives on light active synovia circulation. Perform an quick Joint Recovery Check-in (stationary ride or walk) to lubricate the knee capsule pain-free!",
        status: "alert",
      };
    }

    if (totalSetsSevenDays >= 30) {
      return {
        title: "⚡ High System Volume Notice",
        desc: "Over 30 sets completed in 7 days. Excellent compliance! Keep slow, highly controlled 3-second eccentric descents and shallow knee angles (max 45° on sits) to protect the patellofemoral tracking slot.",
        status: "warning",
      };
    }

    return {
      title: "🏆 Active Joint Adaptations Loaded",
      desc: "Perfect consistency streak! Core McGill stabilizer holds combined with VMO wall sit co-contractions are progressively training muscle tissue without overwhelming knee joint tolerances.",
      status: "success",
    };
  };

  const coachFeedback = getBiomechanicalCoachFeedback();

  return (
    <div id="weekly-volume-tab" className="space-y-6">
      
      {/* KPI Dashboard Stack (Stacked Vertically to Use Full Width) */}
      <div className="flex flex-col gap-4">
        
        {/* KPI: 7-Day Completed Sets */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">7-Day Volume</span>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 font-display">
                {totalSetsSevenDays}
              </span>
              <span className="text-xs text-slate-500 block mt-1">completed sets</span>
            </div>
            <div className="p-2.5 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
          </div>
          
          <div className="mt-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-450 dark:text-slate-500 mb-1">
              <span>Goal Progress</span>
              <span>{targetPercent}% ({totalSetsSevenDays}/{WEEKLY_SETS_TARGET} sets)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${targetPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI: Total Active Reps */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">7-Day Total Repetitions</span>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 font-display">
                {totalRepsSevenDays}
              </span>
              <span className="text-xs text-slate-500 block mt-1">total recorded reps</span>
            </div>
            <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-[10px] sm:text-xs text-slate-450 dark:text-slate-400 border-t border-slate-50 dark:border-slate-800/50 pt-2.5 font-medium leading-relaxed">
            Rep loading targets metabolic circulation inside surrounding tissues.
          </div>
        </div>

      </div>

      {/* Visual Volume Chart: Recharts Interactive Area Chart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div>
            <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-brand-500 animate-pulse" />
              Training Volume Distribution
            </h4>
            <p className="text-xs text-slate-550 dark:text-slate-450">
              {timeRange === "7d"
                ? "Daily sets over the last 7 calendar days"
                : timeRange === "30d"
                ? "Daily completed sets over the last 30 days"
                : "Daily completed sets over the last 90 days"}
            </p>
          </div>
          
          {/* Timeframe selector */}
          <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl shrink-0 self-start sm:self-auto border border-slate-200/50 dark:border-slate-700/40">
            {(["7d", "30d", "90d"] as const).map((r) => {
              const label = r === "7d" ? "7 Days" : r === "30d" ? "Monthly" : "3 Months";
              return (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    timeRange === r
                      ? "bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-700/55 text-brand-600 dark:text-brand-400 shadow-sm font-extrabold"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 bg-slate-50/50 dark:bg-slate-950/20 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-805/50">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Active Period: <span className="font-bold text-slate-700 dark:text-slate-300 uppercase shrink-0">{timeRange === '7d' ? 'Last week' : timeRange === '30d' ? 'Last Month' : 'Last 90 Days'}</span>
          </span>
          <span className="text-xs font-mono font-black bg-brand-500/10 text-brand-650 dark:text-brand-455 px-3 py-1 rounded-lg border border-brand-500/10">
            Completed: {rangeCompletedSets} sets
          </span>
        </div>

        {/* Recharts AreaChart */}
        <div className="w-full h-64 mt-2">
          {isReady ? (
            <ResponsiveContainer width="100%" height={256} minWidth={0} minHeight={0}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  className="dark:stroke-slate-800/60"
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  style={{ fontSize: 9, fontWeight: 700 }}
                  dy={8}
                  interval={timeRange === "7d" ? 0 : timeRange === "30d" ? 4 : 11}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  style={{ fontSize: 9, fontWeight: 700 }}
                  dx={-4}
                  allowDecimals={false}
                  domain={[0, maxSetsInDay]}
                />
                <Tooltip
                  content={({ active, payload, label }: any) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-800 text-white rounded-xl shadow-xl p-3 text-xs font-sans text-left min-w-[150px] animate-fadeIn">
                          <span className="font-bold text-slate-450 block mb-1">{data.fullDate || label}</span>
                          <div className="flex justify-between gap-4 font-mono">
                            <span className="text-brand-400 font-bold">Sets done:</span>
                            <span className="font-extrabold text-emerald-400">{payload[0].value}</span>
                          </div>
                          {data.reps > 0 && (
                            <div className="flex justify-between gap-4 font-mono mt-0.5">
                              <span className="text-slate-400 font-bold">Reps done:</span>
                              <span className="font-extrabold">{data.reps}</span>
                            </div>
                          )}
                          {data.routines && data.routines.length > 0 && (
                            <div className="mt-2 pt-1.5 border-t border-slate-800">
                              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Routines</span>
                              <span className="text-[10px] text-brand-300 font-medium block leading-snug truncate max-w-[160px]">
                                {data.routines.join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ stroke: '#6366f1', strokeWidth: 1.2, strokeDasharray: '4 4' }}
                />
                <Area
                  type="monotone"
                  dataKey="sets"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorSets)"
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#6366f1' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full bg-slate-100/50 dark:bg-slate-800/20 rounded-2xl animate-pulse flex items-center justify-center">
              <span className="text-xs text-slate-400 font-medium">Preparing stats visualizer...</span>
            </div>
          )}
        </div>
      </div>

      {/* Progressive Overload Showcase Card (Progress vs. the Opposite) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-850 dark:text-slate-100">
            Progressive Overload & Stable Knee Adaptation Logs
          </h4>
          <p className="text-xs text-slate-550 dark:text-slate-450">
            Evaluating mechanical load metrics from consecutive identical workout variants
          </p>
        </div>

        {overloadReports.length > 0 ? (
          <div className="space-y-3">
            {overloadReports.map((report, idx) => {
              const isProgress = report.status === "progress";
              const isStable = report.status === "stable";
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isProgress
                      ? "bg-emerald-500/[0.02] border-emerald-500/10 text-emerald-850 dark:bg-emerald-500/[0.01] dark:border-emerald-950"
                      : isStable
                      ? "bg-sky-500/[0.02] border-sky-500/10 text-sky-850 dark:bg-sky-500/[0.01] dark:border-sky-950"
                      : "bg-amber-500/[0.02] border-amber-500/10 text-amber-850 dark:bg-amber-500/[0.01] dark:border-amber-950"
                  }`}
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider bg-slate-150 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 text-slate-700 dark:text-slate-350 px-2 py-0.5 rounded">
                        {report.routineName}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-550 font-medium">{report.latestDate}</span>
                    </div>
                    <span className="font-bold text-xs sm:text-sm block">
                      {report.title}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      {report.description}
                    </p>
                  </div>
                  
                  {isProgress && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md shrink-0 border border-emerald-300/30">
                      Progress <TrendingUp className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {isStable && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-1 rounded-md shrink-0 border border-sky-300/30">
                      Stable Base
                    </span>
                  )}
                  {report.status === "regression" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md shrink-0 border border-amber-300/30">
                      Deload Protect
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-xl text-center text-xs text-slate-500 dark:text-slate-400">
            🌱 Progressive comparison requires logging completing at least two workouts of the same routine type (e.g., repeating Upper 1). Keep completing workouts to load feedback!
          </div>
        )}
      </div>

      {/* Knee-Safety Biomechanical Coach Insight Feedback Box */}
      <div className={`p-5 rounded-2xl border flex gap-3.5 items-start ${
        coachFeedback.status === "alert" 
          ? "bg-rose-50 border-rose-100 dark:bg-rose-950/10 dark:border-rose-950/40"
          : coachFeedback.status === "warning"
          ? "bg-amber-50 border-amber-100 dark:bg-amber-950/10 dark:border-amber-955/40"
          : "bg-emerald-50 border-emerald-150 dark:bg-emerald-950/10 dark:border-emerald-955/40"
      }`}>
        <div className={`p-2.5 rounded-xl shrink-0 ${
          coachFeedback.status === "alert"
            ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
            : coachFeedback.status === "warning"
            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
            : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
        }`}>
          {coachFeedback.status === "alert" ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <Activity className="w-5 h-5 animate-pulse" />
          )}
        </div>
        <div>
          <h4 className={`font-display font-black text-sm sm:text-base ${
            coachFeedback.status === "alert"
              ? "text-rose-750 dark:text-rose-400"
              : coachFeedback.status === "warning"
              ? "text-amber-700 dark:text-amber-400"
              : "text-emerald-700 dark:text-emerald-450"
          }`}>
            {coachFeedback.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-705 dark:text-slate-350 leading-relaxed font-semibold mt-1">
            {coachFeedback.desc}
          </p>
        </div>
      </div>

      {/* RECOVERY DAY QUICK LOG CHECK-IN */}
      <div className="bg-gradient-to-tr from-brand-600 to-sky-500 text-white rounded-3xl p-5 shadow-xl shadow-brand-500/10 flex flex-col md:flex-row items-center justify-between gap-5 text-left border border-brand-500/40">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-brand-100 uppercase tracking-widest bg-brand-500/50 px-2 py-0.5 rounded-md">
            Rest & Lubrication Phase (Rest Day)
          </span>
          <h4 className="font-display font-black text-base sm:text-lg">
            Quick Check-in: 20-min Knee Active Recovery Cycle
          </h4>
          <p className="text-xs text-brand-50/90 leading-relaxed font-medium max-w-xl">
            Gentle cycling or walking warms your joint fluid (synovial fluid), which supplies cartilage with oxygen and nutrients, flushing out inflammation entirely pain-free. Click to check-in and claim your streak boost!
          </p>
        </div>

        <button
          onClick={onAddRecoverySession}
          className="w-full md:w-auto shrink-0 bg-white hover:bg-slate-50 text-brand-600 font-display font-black text-xs sm:text-sm uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-97 hover:scale-102"
        >
          Check-in Clean <ArrowUpRight className="w-4 h-4 text-brand-500" />
        </button>
      </div>

    </div>
  );
}
