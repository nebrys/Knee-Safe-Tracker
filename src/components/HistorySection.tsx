import React, { useState } from "react";
import { HistoryItem } from "../types";
import { Trash2, Calendar, Award, ChevronDown, ChevronUp, History, ListFilter, AlertCircle, Sparkles, X, Hammer, Download, Upload } from "lucide-react";

interface HistorySectionProps {
  history: HistoryItem[];
  onDeleteRow: (id: string) => void;
  onPruneHistory: (count: number) => void;
  onClearAll: () => void;
  onImportHistory: (imported: HistoryItem[]) => void;
}

export function HistorySection({
  history,
  onDeleteRow,
  onPruneHistory,
  onClearAll,
  onImportHistory,
}: HistorySectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Custom modal/inline verification states
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isNukeConfirmOpen, setIsNukeConfirmOpen] = useState(false);
  
  // Custom prune state dialog
  const [isPruneConfirmOpen, setIsPruneConfirmOpen] = useState(false);
  const [pruneInputValue, setPruneInputValue] = useState("20");

  // Import error/success notification
  const [importStatus, setImportStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(history, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `knee_safe_workout_history_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const isValid = parsed.every(item => item && (item.id || item.timestamp));
          if (isValid) {
            onImportHistory(parsed);
            setImportStatus({ type: "success", msg: "Success! Backup restored successfully." });
            // Clean status notification automatically after 4 seconds
            setTimeout(() => setImportStatus(null), 4000);
          } else {
            setImportStatus({ type: "error", msg: "Invalid format: JSON does not contain correct structure." });
          }
        } else {
          setImportStatus({ type: "error", msg: "Invalid format: JSON file is not an Array of logs." });
        }
      } catch (err) {
        setImportStatus({ type: "error", msg: "Failed to parse: File is not a valid JSON document." });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  if (history.length === 0) {
    return (
      <div id="history-empty-state" className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 border border-slate-100 dark:border-slate-800 animate-pulse">
          <History className="w-8 h-8" />
        </div>
        <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">
          No workout history found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          Complete a routine and click "Save Session" on the workout tab to log your first results here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* List Header stats */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <ListFilter className="w-4 h-4 text-brand-500" /> History Entries ({history.length})
        </span>
      </div>

      {/* History Cards */}
      <div className="space-y-3">
        {history.map((item) => {
          const isExpanded = expandedId === item.id;
          const ratio = item.totalSets > 0 ? (item.completedSets / item.totalSets) * 100 : 0;
          
          return (
            <div
              key={item.id}
              id={`history-item-${item.id}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 rounded-2xl shadow-sm overflow-hidden transition-all duration-200 cursor-pointer"
              onClick={() => toggleAccordion(item.id)}
            >
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                {/* Information summary */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-display font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" /> {item.date}
                    </span>
                    <span className="inline-flex text-[10px] font-bold uppercase tracking-wider bg-brand-500 text-white dark:bg-brand-600 px-2 py-0.5 rounded-md shadow-sm">
                      {item.routineName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${ratio}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {item.completedSets}/{item.totalSets} Sets
                    </span>
                  </div>
                </div>

                {/* Arrow indicator and delete */}
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    id={`btn-delete-history-${item.id}`}
                    onClick={() => setDeleteTargetId(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800/65 rounded-xl transition-all cursor-pointer"
                    title="Delete workout entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {item.exercises.length > 0 && (
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="p-2 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/65 rounded-xl transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Accordion Expansion Detail Table */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/[0.3] dark:bg-slate-900/40 space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800/50">
                  {item.exercises.map((exo, eIdx) => {
                    return (
                      <div
                        key={eIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-2 first:pt-1 last:pb-1"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 max-w-[280px]">
                          {exo.name}
                        </span>
                        
                        {/* Reps list */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {exo.sets.map((s, sIdx) => {
                            const isCheck = s !== null;
                            const unit = exo.isHold ? "s" : "r";
                            return (
                              <span
                                key={sIdx}
                                className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-md border ${
                                  isCheck
                                    ? "bg-emerald-50 dark:bg-emerald-900/25 border-emerald-200/50 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold"
                                    : "bg-slate-100 dark:bg-slate-800 border-slate-200/40 dark:border-slate-700/80 text-slate-400"
                                }`}
                              >
                                {isCheck ? `${s}${unit}` : "—"}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Backup & Restore Data sync */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-inner">
        <div>
          <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-500 animate-pulse" />
            Backup & Data Portability
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            Export a backup of your logs or restore previous workout history from a saved JSON file. Perfect for maintaining weekly volume graphs even after pruning.
          </p>
        </div>

        {importStatus && (
          <div className={`p-2.5 rounded-xl border text-[11px] sm:text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
            importStatus.type === "success" 
              ? "bg-emerald-500/10 border-emerald-200/20 text-emerald-600 dark:text-emerald-400" 
              : "bg-rose-500/10 border-rose-200/20 text-rose-600 dark:text-rose-400"
          }`}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{importStatus.msg}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Export click */}
          <button
            onClick={handleExportData}
            className="flex-1 py-2.5 px-3 bg-white dark:bg-slate-800 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-50 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export History (.json)
          </button>

          {/* Import label triggering hiddden file input */}
          <label
            htmlFor="restore-workout-logs-file-input"
            className="flex-1 py-2.5 px-3 bg-white dark:bg-slate-800 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-50 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all text-center"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            Import/Restore (.json)
          </label>
          <input
            id="restore-workout-logs-file-input"
            type="file"
            accept=".json"
            onChange={handleImportData}
            className="hidden"
          />
        </div>
      </div>

      {/* History Footer Operations */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-4">
        <button
          id="btn-prune-history"
          onClick={() => {
            setPruneInputValue("20");
            setIsPruneConfirmOpen(true);
          }}
          className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all text-center cursor-pointer"
        >
          Prune Archive (Keep Recent N)
        </button>
        <button
          id="btn-clear-history"
          onClick={() => setIsNukeConfirmOpen(true)}
          className="flex-1 py-3 px-4 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/25 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all text-center cursor-pointer"
        >
          Nuke History Records
        </button>
      </div>

      {/* 1. SINGLE LOG ITEM TRASH OVERLAY CONFIRMATION */}
      {deleteTargetId && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center">
            <button 
              onClick={() => setDeleteTargetId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6 animate-pulse" />
            </div>
            
            <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-slate-100 mb-2">
              Delete Workout Log?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
              Are you sure you want to permanently erase this specific workout session archive entry? Your statistics and charts will adjust accordingly.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                id="modal-confirm-delete-button"
                onClick={() => {
                  onDeleteRow(deleteTargetId);
                  setDeleteTargetId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/10 cursor-pointer transition-all"
              >
                Delete Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRUNE HISTORICAL ARCHIVES CONFIGURATION MODAL */}
      {isPruneConfirmOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsPruneConfirmOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            
            <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-slate-100 mb-1">
              Prune Routine Logs
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Trims your workout logbook, maintaining only the most recent <span className="font-extrabold text-brand-600">N</span> entries so you keep a tidy history.
            </p>

            <div className="space-y-4 mb-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                  How many recent logs to retain?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={pruneInputValue}
                    onChange={(e) => setPruneInputValue(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3 text-sm font-bold font-mono focus:outline-none focus:border-brand-500 text-slate-800 dark:text-slate-100"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">logs</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsPruneConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                id="modal-confirm-prune-button"
                onClick={() => {
                  const count = parseInt(pruneInputValue, 10);
                  if (!isNaN(count) && count > 0) {
                    onPruneHistory(count);
                  }
                  setIsPruneConfirmOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/10 cursor-pointer transition-all"
              >
                Prune History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. NUKE RECORDS ENTIRE HISTORY PERMANENT WIPE DANGER DIALOGUE */}
      {isNukeConfirmOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center">
            <button 
              onClick={() => setIsNukeConfirmOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer animate-none"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-8 h-8 animate-bounce text-rose-600" />
            </div>
            
            <h3 className="font-display font-black text-lg text-slate-800 dark:text-slate-100 mb-2">
              DANGER: Wipe History?
            </h3>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-bold bg-rose-500/10 rounded-xl p-2.5 mb-4 leading-relaxed">
              ⚠️ Warning: This will permanently purge your entire local workout history log files. This is completely irreversible!
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-5 leading-normal">
              If you haven't exported your data, you will lose your weekly, monthly, and progressive overload graphs.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsNukeConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-all"
              >
                No, Keep My Data
              </button>
              <button
                id="modal-confirm-nuke-button"
                onClick={() => {
                  onClearAll();
                  setIsNukeConfirmOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md shadow-rose-600/10 cursor-pointer transition-all"
              >
                YES, RESET ALL!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
