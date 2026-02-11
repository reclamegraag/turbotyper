export interface Achievement {
	id: string;
	title: string;
	titleEn: string;
	description: string;
	descriptionEn: string;
	icon: string;
	trigger: AchievementTrigger;
}

export type AchievementTrigger =
	| { type: 'wpm'; threshold: number }
	| { type: 'accuracy'; threshold: number }
	| { type: 'streak'; threshold: number }
	| { type: 'lessons'; threshold: number }
	| { type: 'sessions'; threshold: number }
	| { type: 'combo'; threshold: number }
	| { type: 'level'; threshold: number }
	| { type: 'xp'; threshold: number };

export const achievements: Achievement[] = [
	{
		id: 'first-lesson',
		title: 'Eerste stappen',
		titleEn: 'First Steps',
		description: 'Voltooi je eerste les',
		descriptionEn: 'Complete your first lesson',
		icon: 'fa-solid fa-baby',
		trigger: { type: 'lessons', threshold: 1 }
	},
	{
		id: 'wpm-30',
		title: 'Beginner typist',
		titleEn: 'Beginner Typist',
		description: 'Bereik 30 WPM',
		descriptionEn: 'Reach 30 WPM',
		icon: 'fa-solid fa-feather',
		trigger: { type: 'wpm', threshold: 30 }
	},
	{
		id: 'wpm-50',
		title: 'Snelle vingers',
		titleEn: 'Quick Fingers',
		description: 'Bereik 50 WPM',
		descriptionEn: 'Reach 50 WPM',
		icon: 'fa-solid fa-gauge',
		trigger: { type: 'wpm', threshold: 50 }
	},
	{
		id: 'wpm-80',
		title: 'Razendsnel',
		titleEn: 'Lightning Fast',
		description: 'Bereik 80 WPM',
		descriptionEn: 'Reach 80 WPM',
		icon: 'fa-solid fa-bolt',
		trigger: { type: 'wpm', threshold: 80 }
	},
	{
		id: 'wpm-100',
		title: 'Turbo Typer',
		titleEn: 'Turbo Typer',
		description: 'Bereik 100 WPM',
		descriptionEn: 'Reach 100 WPM',
		icon: 'fa-solid fa-rocket',
		trigger: { type: 'wpm', threshold: 100 }
	},
	{
		id: 'accuracy-95',
		title: 'Precisie-machine',
		titleEn: 'Precision Machine',
		description: 'Behaal 95% nauwkeurigheid',
		descriptionEn: 'Achieve 95% accuracy',
		icon: 'fa-solid fa-bullseye',
		trigger: { type: 'accuracy', threshold: 95 }
	},
	{
		id: 'accuracy-100',
		title: 'Perfect!',
		titleEn: 'Perfect!',
		description: 'Behaal 100% nauwkeurigheid',
		descriptionEn: 'Achieve 100% accuracy',
		icon: 'fa-solid fa-star',
		trigger: { type: 'accuracy', threshold: 100 }
	},
	{
		id: 'streak-3',
		title: 'Op dreef',
		titleEn: 'On a Roll',
		description: '3 dagen op rij geoefend',
		descriptionEn: '3 day practice streak',
		icon: 'fa-solid fa-fire',
		trigger: { type: 'streak', threshold: 3 }
	},
	{
		id: 'streak-7',
		title: 'Weekkampioen',
		titleEn: 'Week Champion',
		description: '7 dagen op rij geoefend',
		descriptionEn: '7 day practice streak',
		icon: 'fa-solid fa-fire-flame-curved',
		trigger: { type: 'streak', threshold: 7 }
	},
	{
		id: 'streak-30',
		title: 'Onbreekbaar',
		titleEn: 'Unbreakable',
		description: '30 dagen op rij geoefend',
		descriptionEn: '30 day practice streak',
		icon: 'fa-solid fa-shield',
		trigger: { type: 'streak', threshold: 30 }
	},
	{
		id: 'combo-25',
		title: 'Combo starter',
		titleEn: 'Combo Starter',
		description: '25 foutloze aanslagen op rij',
		descriptionEn: '25 flawless keystrokes in a row',
		icon: 'fa-solid fa-link',
		trigger: { type: 'combo', threshold: 25 }
	},
	{
		id: 'combo-50',
		title: 'Combo koning',
		titleEn: 'Combo King',
		description: '50 foutloze aanslagen op rij',
		descriptionEn: '50 flawless keystrokes in a row',
		icon: 'fa-solid fa-crown',
		trigger: { type: 'combo', threshold: 50 }
	},
	{
		id: 'combo-100',
		title: 'Onstopbaar',
		titleEn: 'Unstoppable',
		description: '100 foutloze aanslagen op rij',
		descriptionEn: '100 flawless keystrokes in a row',
		icon: 'fa-solid fa-explosion',
		trigger: { type: 'combo', threshold: 100 }
	},
	{
		id: 'lessons-5',
		title: 'Toegewijde leerling',
		titleEn: 'Dedicated Student',
		description: 'Voltooi 5 lessen',
		descriptionEn: 'Complete 5 lessons',
		icon: 'fa-solid fa-graduation-cap',
		trigger: { type: 'lessons', threshold: 5 }
	},
	{
		id: 'lessons-12',
		title: 'Curriculum meester',
		titleEn: 'Curriculum Master',
		description: 'Voltooi alle 12 lessen',
		descriptionEn: 'Complete all 12 lessons',
		icon: 'fa-solid fa-trophy',
		trigger: { type: 'lessons', threshold: 12 }
	},
	{
		id: 'sessions-10',
		title: 'Vaste bezoeker',
		titleEn: 'Regular Visitor',
		description: '10 oefensessies voltooid',
		descriptionEn: '10 practice sessions completed',
		icon: 'fa-solid fa-repeat',
		trigger: { type: 'sessions', threshold: 10 }
	},
	{
		id: 'sessions-50',
		title: 'Veteraan',
		titleEn: 'Veteran',
		description: '50 oefensessies voltooid',
		descriptionEn: '50 practice sessions completed',
		icon: 'fa-solid fa-medal',
		trigger: { type: 'sessions', threshold: 50 }
	},
	{
		id: 'level-5',
		title: 'Level 5',
		titleEn: 'Level 5',
		description: 'Bereik level 5',
		descriptionEn: 'Reach level 5',
		icon: 'fa-solid fa-arrow-up',
		trigger: { type: 'level', threshold: 5 }
	},
	{
		id: 'level-10',
		title: 'Dubbelcijferig',
		titleEn: 'Double Digits',
		description: 'Bereik level 10',
		descriptionEn: 'Reach level 10',
		icon: 'fa-solid fa-angles-up',
		trigger: { type: 'level', threshold: 10 }
	}
];

export function getAchievementById(id: string): Achievement | undefined {
	return achievements.find((a) => a.id === id);
}

export interface AchievementContext {
	wpm: number;
	accuracy: number;
	streak: number;
	completedLessons: number;
	totalSessions: number;
	bestCombo: number;
	level: number;
	totalXp: number;
}

export function checkNewAchievements(
	context: AchievementContext,
	alreadyUnlocked: string[]
): Achievement[] {
	const triggerValueMap: Record<AchievementTrigger['type'], number> = {
		wpm: context.wpm,
		accuracy: context.accuracy,
		streak: context.streak,
		lessons: context.completedLessons,
		sessions: context.totalSessions,
		combo: context.bestCombo,
		level: context.level,
		xp: context.totalXp
	};

	return achievements.filter((a) => {
		if (alreadyUnlocked.includes(a.id)) return false;
		return triggerValueMap[a.trigger.type] >= a.trigger.threshold;
	});
}
