export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  defaultReps: number;
  isHold?: boolean;
  setup: string;
  form: string;
  cues: string[];
  pairing?: string; // e.g. "A1", "A2" for supersets
  isSuperset?: boolean; // true if part of an actual active antagonist paired superset card
  targetMuscle?: string;
}

export interface Routine {
  id: string;
  name: string;
  subtitle: string;
  focus: string;
  exercises: Exercise[];
}

export interface SetLog {
  reps: number;
  completed: boolean;
}

export interface ActiveExerciseState {
  exerciseId: string;
  name: string;
  targetReps: string;
  selectedReps: number;
  loggedSets: (number | null)[]; // reps completed for each set, or null if not done
  isAmrap?: boolean;
}

export interface ActiveSession {
  routineId: string;
  startTime: number;
  exercises: ActiveExerciseState[];
}

export interface HistoryItem {
  id: string;
  date: string;
  timestamp: number;
  routineId: string;
  routineName: string;
  completedSets: number;
  totalSets: number;
  exercises: {
    name: string;
    isHold?: boolean;
    sets: (number | null)[];
    isAmrap?: boolean;
  }[];
}
