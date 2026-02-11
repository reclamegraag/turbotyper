export interface Lesson {
	id: number;
	title: string;
	titleEn: string;
	description: string;
	descriptionEn: string;
	keys: string[];
	unlockRequirement: number | null;
}

export const lessons: Lesson[] = [
	{
		id: 1,
		title: 'Home Row — Linkerhand',
		titleEn: 'Home Row — Left Hand',
		description: 'Begin met a, s, d, f',
		descriptionEn: 'Start with a, s, d, f',
		keys: ['a', 's', 'd', 'f'],
		unlockRequirement: null
	},
	{
		id: 2,
		title: 'Home Row — Rechterhand',
		titleEn: 'Home Row — Right Hand',
		description: 'Leer j, k, l en ;',
		descriptionEn: 'Learn j, k, l and ;',
		keys: ['j', 'k', 'l', ';'],
		unlockRequirement: 1
	},
	{
		id: 3,
		title: 'Home Row — Compleet',
		titleEn: 'Home Row — Complete',
		description: 'Combineer g en h met de rest',
		descriptionEn: 'Combine g and h with the rest',
		keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
		unlockRequirement: 2
	},
	{
		id: 4,
		title: 'Bovenste rij — Links',
		titleEn: 'Top Row — Left',
		description: 'Leer q, w, e, r, t',
		descriptionEn: 'Learn q, w, e, r, t',
		keys: ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f'],
		unlockRequirement: 3
	},
	{
		id: 5,
		title: 'Bovenste rij — Rechts',
		titleEn: 'Top Row — Right',
		description: 'Leer y, u, i, o, p',
		descriptionEn: 'Learn y, u, i, o, p',
		keys: ['y', 'u', 'i', 'o', 'p', 'j', 'k', 'l'],
		unlockRequirement: 4
	},
	{
		id: 6,
		title: 'Bovenste rij — Compleet',
		titleEn: 'Top Row — Complete',
		description: 'Beide rijen combineren',
		descriptionEn: 'Combine both rows',
		keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		unlockRequirement: 5
	},
	{
		id: 7,
		title: 'Onderste rij — Links',
		titleEn: 'Bottom Row — Left',
		description: 'Leer z, x, c, v, b',
		descriptionEn: 'Learn z, x, c, v, b',
		keys: ['z', 'x', 'c', 'v', 'b', 'a', 's', 'd', 'f'],
		unlockRequirement: 6
	},
	{
		id: 8,
		title: 'Onderste rij — Rechts',
		titleEn: 'Bottom Row — Right',
		description: 'Leer n, m en leestekens',
		descriptionEn: 'Learn n, m and punctuation',
		keys: ['n', 'm', ',', '.', 'j', 'k', 'l'],
		unlockRequirement: 7
	},
	{
		id: 9,
		title: 'Alle letters',
		titleEn: 'All Letters',
		description: 'Het volledige alfabet',
		descriptionEn: 'The full alphabet',
		keys: 'abcdefghijklmnopqrstuvwxyz'.split(''),
		unlockRequirement: 8
	},
	{
		id: 10,
		title: 'Woorden — Basis',
		titleEn: 'Words — Basic',
		description: 'Veelgebruikte korte woorden',
		descriptionEn: 'Common short words',
		keys: 'abcdefghijklmnopqrstuvwxyz '.split(''),
		unlockRequirement: 9
	},
	{
		id: 11,
		title: 'Cijfers',
		titleEn: 'Numbers',
		description: 'Leer de cijferrij',
		descriptionEn: 'Learn the number row',
		keys: [...'1234567890'.split(''), ...'abcdefghijklmnopqrstuvwxyz'.split('')],
		unlockRequirement: 10
	},
	{
		id: 12,
		title: 'Speciale tekens',
		titleEn: 'Special Characters',
		description: 'Leestekens en symbolen',
		descriptionEn: 'Punctuation and symbols',
		keys: [...'abcdefghijklmnopqrstuvwxyz'.split(''), ...'.,-;:!?'.split('')],
		unlockRequirement: 11
	}
];

export function getLessonById(id: number): Lesson | undefined {
	return lessons.find((l) => l.id === id);
}

export function isLessonUnlocked(lessonId: number, completedLessons: number[]): boolean {
	const lesson = getLessonById(lessonId);
	if (!lesson) return false;
	if (lesson.unlockRequirement === null) return true;
	return completedLessons.includes(lesson.unlockRequirement);
}
