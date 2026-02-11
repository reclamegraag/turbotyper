import { wordsNl } from '$lib/data/words-nl';
import { wordsEn } from '$lib/data/words-en';

function shuffle<T>(arr: T[]): T[] {
	const result = [...arr];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

function filterWordsByKeys(words: string[], keys: string[]): string[] {
	const keySet = new Set(keys);
	return words.filter((word) =>
		word.split('').every((char) => keySet.has(char) || char === ' ')
	);
}

export function generateLetterDrill(keys: string[], length: number = 40): string {
	const chars: string[] = [];
	for (let i = 0; i < length; i++) {
		if (i > 0 && i % 5 === 0) chars.push(' ');
		chars.push(keys[Math.floor(Math.random() * keys.length)]);
	}
	return chars.join('');
}

export function generateWordDrill(
	language: 'nl' | 'en',
	keys: string[],
	targetLength: number = 60
): string {
	const allWords = language === 'nl' ? wordsNl : wordsEn;
	const filtered = filterWordsByKeys(allWords, keys);
	const pool = filtered.length > 0 ? filtered : allWords;

	const words: string[] = [];
	let currentLength = 0;

	const shuffled = shuffle(pool);
	let idx = 0;

	while (currentLength < targetLength) {
		const word = shuffled[idx % shuffled.length];
		words.push(word);
		currentLength += word.length + 1;
		idx++;
	}

	return words.join(' ');
}

export function generateAdaptiveDrill(
	language: 'nl' | 'en',
	lessonKeys: string[],
	weakKeys: Record<string, number>,
	targetLength: number = 60
): string {
	const weakKeyList = Object.entries(weakKeys)
		.filter(([, ratio]) => ratio > 0.15)
		.map(([key]) => key);

	const allWords = language === 'nl' ? wordsNl : wordsEn;
	const lessonWords = filterWordsByKeys(allWords, lessonKeys);
	const weakWords = weakKeyList.length > 0
		? allWords.filter((w) => weakKeyList.some((k) => w.includes(k)))
		: [];

	const words: string[] = [];
	let currentLength = 0;

	while (currentLength < targetLength) {
		const roll = Math.random();

		let pool: string[];
		if (roll < 0.6) {
			pool = lessonWords.length > 0 ? lessonWords : allWords;
		} else if (roll < 0.9 && weakWords.length > 0) {
			pool = weakWords;
		} else {
			pool = allWords;
		}

		const word = pool[Math.floor(Math.random() * pool.length)];
		words.push(word);
		currentLength += word.length + 1;
	}

	return words.join(' ');
}

export function generateFromSeed(seed: string, language: 'nl' | 'en'): string {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
	}

	const allWords = language === 'nl' ? wordsNl : wordsEn;
	const words: string[] = [];

	for (let i = 0; i < 25; i++) {
		hash = ((hash * 1103515245 + 12345) & 0x7fffffff);
		const idx = hash % allWords.length;
		words.push(allWords[idx]);
	}

	return words.join(' ');
}
