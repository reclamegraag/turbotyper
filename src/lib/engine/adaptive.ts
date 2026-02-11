export interface AdaptiveProfile {
	keyAccuracy: Record<string, { correct: number; total: number }>;
}

export function createAdaptiveProfile(): AdaptiveProfile {
	return { keyAccuracy: {} };
}

export function updateProfile(
	profile: AdaptiveProfile,
	keyErrors: Record<string, number>,
	typedText: string
): AdaptiveProfile {
	const next: AdaptiveProfile = {
		keyAccuracy: { ...profile.keyAccuracy }
	};

	const charCounts: Record<string, number> = {};
	for (const char of typedText) {
		charCounts[char] = (charCounts[char] ?? 0) + 1;
	}

	for (const [char, count] of Object.entries(charCounts)) {
		const existing = next.keyAccuracy[char] ?? { correct: 0, total: 0 };
		const errors = keyErrors[char] ?? 0;
		next.keyAccuracy[char] = {
			correct: existing.correct + (count - errors),
			total: existing.total + count
		};
	}

	return next;
}

export function getWeakKeys(profile: AdaptiveProfile): Record<string, number> {
	const weak: Record<string, number> = {};
	for (const [key, stats] of Object.entries(profile.keyAccuracy)) {
		if (stats.total < 3) continue;
		const errorRatio = 1 - stats.correct / stats.total;
		if (errorRatio > 0.15) {
			weak[key] = errorRatio;
		}
	}
	return weak;
}

export function getStrongKeys(profile: AdaptiveProfile): Record<string, number> {
	const strong: Record<string, number> = {};
	for (const [key, stats] of Object.entries(profile.keyAccuracy)) {
		if (stats.total < 5) continue;
		const accuracy = stats.correct / stats.total;
		if (accuracy >= 0.9) {
			strong[key] = accuracy;
		}
	}
	return strong;
}
