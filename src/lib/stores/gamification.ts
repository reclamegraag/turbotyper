import { writable } from 'svelte/store';
import { storage } from '$lib/utils/storage';
import { getLevelForXp, updateStreak, getTodayString, calculateXp } from '$lib/engine/gamification';
import { checkNewAchievements, type AchievementContext } from '$lib/data/achievements';
import type { ExerciseMode } from '$lib/stores/stats';

export interface GamificationState {
	xp: number;
	level: number;
	streak: number;
	lastActiveDate: string;
	longestStreak: number;
	unlockedBadges: string[];
	combo: {
		current: number;
		best: number;
	};
}

const STORAGE_KEY = 'turbotyper-gamification';

const defaults: GamificationState = {
	xp: 0,
	level: 1,
	streak: 0,
	lastActiveDate: '',
	longestStreak: 0,
	unlockedBadges: [],
	combo: {
		current: 0,
		best: 0
	}
};

function createGamificationStore() {
	const initial = storage.get<GamificationState>(STORAGE_KEY, defaults);
	const { subscribe, set, update } = writable<GamificationState>(initial);

	function persist(state: GamificationState) {
		storage.set(STORAGE_KEY, state);
	}

	return {
		subscribe,
		recordSession(
			wpm: number,
			accuracy: number,
			durationSeconds: number,
			bestCombo: number,
			mode: ExerciseMode,
			completedLessons: number,
			totalSessions: number
		): { xpGained: number; newBadges: string[]; leveledUp: boolean } {
			let xpGained = 0;
			let newBadges: string[] = [];
			let leveledUp = false;

			update((state) => {
				const xpBreakdown = calculateXp(wpm, accuracy, durationSeconds, bestCombo, mode);
				xpGained = xpBreakdown.total;

				const newXp = state.xp + xpGained;
				const newLevel = getLevelForXp(newXp);
				leveledUp = newLevel > state.level;

				const today = getTodayString();
				const streakResult = updateStreak(state.streak, state.lastActiveDate, today);
				const newStreak = streakResult.streak;
				const newLongestStreak = Math.max(state.longestStreak, newStreak);

				const context: AchievementContext = {
					wpm,
					accuracy,
					streak: newStreak,
					completedLessons,
					totalSessions,
					bestCombo,
					level: newLevel,
					totalXp: newXp
				};

				const unlocked = checkNewAchievements(context, state.unlockedBadges);
				newBadges = unlocked.map((a) => a.id);

				const next: GamificationState = {
					xp: newXp,
					level: newLevel,
					streak: newStreak,
					lastActiveDate: today,
					longestStreak: newLongestStreak,
					unlockedBadges: [...state.unlockedBadges, ...newBadges],
					combo: { current: 0, best: Math.max(state.combo.best, bestCombo) }
				};

				persist(next);
				return next;
			});

			return { xpGained, newBadges, leveledUp };
		},

		reset() {
			set(defaults);
			persist(defaults);
		}
	};
}

export const gamification = createGamificationStore();
