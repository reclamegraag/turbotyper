import { generateFromSeed } from '$lib/engine/word-generator';

export function getDailySeed(): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

export function getDailyChallengeText(language: 'nl' | 'en'): string {
	return generateFromSeed(getDailySeed(), language);
}
