<script lang="ts">
	import { lessons } from '$lib/data/lessons';
	import { progress } from '$lib/stores/progress';
	import { stats } from '$lib/stores/stats';
	import { gamification } from '$lib/stores/gamification';
	import { settings } from '$lib/stores/settings';
	import { generateLetterDrill, generateAdaptiveDrill } from '$lib/engine/word-generator';
	import { evaluateLesson } from '$lib/engine/curriculum';
	import { calculateXp, type ComboState, type XpBreakdown } from '$lib/engine/gamification';
	import TypingArea from '$lib/components/typing/TypingArea.svelte';
	import SessionSummary from '$lib/components/typing/SessionSummary.svelte';
	import LessonList from '$lib/components/typing/LessonList.svelte';
	import type { TypingEngineState } from '$lib/engine/typing-engine';

	let activeLesson = $state<number | null>(null);
	let drillText = $state('');
	let sessionResult = $state<{
		state: TypingEngineState;
		xpBreakdown: XpBreakdown;
		newBadges: string[];
		leveledUp: boolean;
		newLevel: number;
	} | null>(null);

	function startLesson(lessonId: number) {
		const lesson = lessons.find((l) => l.id === lessonId);
		if (!lesson) return;

		if (lesson.keys.includes(' ')) {
			drillText = generateAdaptiveDrill($settings.language, lesson.keys, $progress.weakKeys, 60);
		} else {
			drillText = generateLetterDrill(lesson.keys, 40);
		}
		activeLesson = lessonId;
		sessionResult = null;
	}

	function handleComplete(state: TypingEngineState, combo: ComboState) {
		if (activeLesson === null) return;

		const result = evaluateLesson(activeLesson, state);
		if (result.passed && !$progress.completedLessons.includes(activeLesson)) {
			progress.update((p) => ({
				...p,
				completedLessons: [...p.completedLessons, activeLesson!],
				currentLesson: activeLesson! + 1
			}));
		}

		const durationSeconds = state.endTime && state.startTime ? (state.endTime - state.startTime) / 1000 : 0;

		stats.recordSession({
			date: new Date().toISOString(),
			mode: 'lesson',
			wpm: state.wpm,
			accuracy: state.accuracy,
			duration: durationSeconds,
			keyErrors: state.keyErrors
		});

		const gamResult = gamification.recordSession(
			state.wpm, state.accuracy, durationSeconds, combo.best,
			'lesson', $progress.completedLessons.length, $stats.totalSessions
		);

		sessionResult = {
			state,
			xpBreakdown: calculateXp(state.wpm, state.accuracy, durationSeconds, combo.best, 'lesson'),
			newBadges: gamResult.newBadges,
			leveledUp: gamResult.leveledUp,
			newLevel: $gamification.level
		};
	}

	function backToList() {
		activeLesson = null;
		sessionResult = null;
	}
</script>

{#if activeLesson !== null}
	<div class="mx-auto flex w-full max-w-4xl flex-col gap-10 py-8">
		<button
			onclick={backToList}
			class="group flex items-center gap-3 self-start text-sm font-bold tracking-tight opacity-50 transition-all hover:opacity-100"
			style="color: var(--text-primary); cursor: pointer; background: none; border: none;"
		>
			<i class="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
			{$settings.language === 'nl' ? 'Terug naar lessen' : 'Back to lessons'}
		</button>
		<TypingArea text={drillText} onComplete={handleComplete} />
		{#if sessionResult}
			<SessionSummary
				wpm={sessionResult.state.wpm}
				accuracy={sessionResult.state.accuracy}
				errors={sessionResult.state.errors}
				xpBreakdown={sessionResult.xpBreakdown}
				newBadges={sessionResult.newBadges}
				leveledUp={sessionResult.leveledUp}
				newLevel={sessionResult.newLevel}
			/>
		{/if}
	</div>
{:else}
	<LessonList onSelectLesson={startLesson} />
{/if}
