import { writable } from 'svelte/store';
import { storage } from '$lib/utils/storage';

export type ExerciseMode = 'lesson' | 'timed' | 'zen' | 'daily';

export interface SessionResult {
	date: string;
	mode: ExerciseMode;
	wpm: number;
	accuracy: number;
	duration: number;
	keyErrors: Record<string, number>;
}

export interface UserStats {
	totalSessions: number;
	totalTimeMinutes: number;
	sessionsHistory: SessionResult[];
	bestWpm: number;
	averageWpm: number;
	averageAccuracy: number;
}

const STORAGE_KEY = 'turbotyper-stats';

const defaults: UserStats = {
	totalSessions: 0,
	totalTimeMinutes: 0,
	sessionsHistory: [],
	bestWpm: 0,
	averageWpm: 0,
	averageAccuracy: 0
};

function createStatsStore() {
	const initial = storage.get<UserStats>(STORAGE_KEY, defaults);
	const { subscribe, set, update } = writable<UserStats>(initial);

	function persist(state: UserStats) {
		storage.set(STORAGE_KEY, state);
	}

	return {
		subscribe,
		recordSession(result: SessionResult) {
			update((state) => {
				const history = [...state.sessionsHistory, result];
				const totalSessions = state.totalSessions + 1;
				const totalTimeMinutes = state.totalTimeMinutes + result.duration / 60;
				const bestWpm = Math.max(state.bestWpm, result.wpm);

				const totalWpm = history.reduce((sum, s) => sum + s.wpm, 0);
				const totalAccuracy = history.reduce((sum, s) => sum + s.accuracy, 0);

				const next: UserStats = {
					totalSessions,
					totalTimeMinutes: Math.round(totalTimeMinutes * 10) / 10,
					sessionsHistory: history,
					bestWpm,
					averageWpm: Math.round(totalWpm / history.length),
					averageAccuracy: Math.round(totalAccuracy / history.length)
				};

				persist(next);
				return next;
			});
		},

		reset() {
			set(defaults);
			persist(defaults);
		}
	};
}

export const stats = createStatsStore();
