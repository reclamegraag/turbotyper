import type { ExerciseMode } from '$lib/stores/stats';

// XP thresholds: cumulative XP required per level. Index = level number.
const LEVEL_THRESHOLDS: readonly number[] = [
	0, 0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
	7600, 9200, 11000, 13000, 15500, 18500, 22000
];

const MAX_LEVEL = LEVEL_THRESHOLDS.length - 1;

const MODE_MULTIPLIER: Record<ExerciseMode, number> = {
	lesson: 1.2,
	timed: 1.0,
	zen: 0.8,
	daily: 1.5
};

export interface XpBreakdown {
	base: number;
	accuracyBonus: number;
	comboBonus: number;
	modeMultiplier: number;
	total: number;
}

// XP = (WPM × minutes + accuracyBonus + comboBonus) × modeMultiplier
// accuracyBonus: +50% at 100%, linear to 0% at 90%, -20% below 90%
export function calculateXp(
	wpm: number,
	accuracy: number,
	durationSeconds: number,
	bestCombo: number,
	mode: ExerciseMode
): XpBreakdown {
	const durationMinutes = Math.max(durationSeconds / 60, 0.1);
	const base = Math.round(wpm * durationMinutes);

	let accuracyMultiplier: number;
	if (accuracy >= 100) {
		accuracyMultiplier = 0.5;
	} else if (accuracy >= 90) {
		accuracyMultiplier = ((accuracy - 90) / 10) * 0.5;
	} else {
		accuracyMultiplier = -0.2;
	}
	const accuracyBonus = Math.round(base * accuracyMultiplier);

	const comboBonus = Math.round(bestCombo * 0.5);
	const modeMultiplier = MODE_MULTIPLIER[mode];
	const total = Math.max(1, Math.round((base + accuracyBonus + comboBonus) * modeMultiplier));

	return { base, accuracyBonus, comboBonus, modeMultiplier, total };
}

export function getLevelForXp(totalXp: number): number {
	for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
		if (totalXp >= LEVEL_THRESHOLDS[i]) return i;
	}
	return 1;
}

export function getLevelProgress(totalXp: number): {
	level: number;
	currentLevelXp: number;
	nextLevelXp: number;
	progressPercent: number;
} {
	const level = getLevelForXp(totalXp);
	if (level >= MAX_LEVEL) {
		return { level, currentLevelXp: 0, nextLevelXp: 0, progressPercent: 100 };
	}
	const currentThreshold = LEVEL_THRESHOLDS[level];
	const nextThreshold = LEVEL_THRESHOLDS[level + 1];
	const xpInLevel = totalXp - currentThreshold;
	const xpNeeded = nextThreshold - currentThreshold;
	const progressPercent = Math.round((xpInLevel / xpNeeded) * 100);
	return { level, currentLevelXp: xpInLevel, nextLevelXp: xpNeeded, progressPercent };
}

export function getTodayString(): string {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function isConsecutiveDay(dateA: string, dateB: string): boolean {
	const a = new Date(dateA);
	const b = new Date(dateB);
	const diffMs = b.getTime() - a.getTime();
	const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
	return diffDays === 1;
}

export function updateStreak(
	currentStreak: number,
	lastActiveDate: string,
	today: string
): { streak: number; isNewDay: boolean } {
	if (lastActiveDate === today) {
		return { streak: currentStreak, isNewDay: false };
	}

	if (lastActiveDate === '') {
		return { streak: 1, isNewDay: true };
	}

	if (isConsecutiveDay(lastActiveDate, today)) {
		return { streak: currentStreak + 1, isNewDay: true };
	}

	return { streak: 1, isNewDay: true };
}

export interface ComboState {
	current: number;
	best: number;
	multiplier: number;
}

// Combo multiplier tiers: 10→1.1x, 25→1.25x, 50→1.5x, 100→2x
export function getComboMultiplier(combo: number): number {
	if (combo >= 100) return 2.0;
	if (combo >= 50) return 1.5;
	if (combo >= 25) return 1.25;
	if (combo >= 10) return 1.1;
	return 1.0;
}

export function comboHit(state: ComboState): ComboState {
	const current = state.current + 1;
	const best = Math.max(current, state.best);
	const multiplier = getComboMultiplier(current);
	return { current, best, multiplier };
}

export function comboMiss(state: ComboState): ComboState {
	return { current: 0, best: state.best, multiplier: 1.0 };
}

export function createComboState(): ComboState {
	return { current: 0, best: 0, multiplier: 1.0 };
}
