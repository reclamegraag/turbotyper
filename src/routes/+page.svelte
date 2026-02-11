<script lang="ts">
	import TypingArea from '$lib/components/typing/TypingArea.svelte';
	import SessionSummary from '$lib/components/typing/SessionSummary.svelte';
	import { settings } from '$lib/stores/settings';
	import { stats } from '$lib/stores/stats';
	import { gamification } from '$lib/stores/gamification';
	import { generateWordDrill } from '$lib/engine/word-generator';
	import { getDailyChallengeText } from '$lib/engine/daily-challenge';
	import type { TypingEngineState } from '$lib/engine/typing-engine';
	import { calculateXp, type ComboState, type XpBreakdown } from '$lib/engine/gamification';
	import type { ExerciseMode } from '$lib/stores/stats';

	type Mode = 'zen' | 'timed-15' | 'timed-30' | 'timed-60' | 'daily';

	const allKeys = 'abcdefghijklmnopqrstuvwxyz '.split('');

	let selectedMode = $state<Mode>('zen');
	let drillText = $state(generateWordDrill($settings.language, allKeys, 80));
	let sessionResult = $state<{
		state: TypingEngineState;
		xpBreakdown: XpBreakdown;
		newBadges: string[];
		leveledUp: boolean;
		newLevel: number;
	} | null>(null);

	const modes: { id: Mode; label: string; icon: string }[] = [
		{ id: 'zen', label: 'Zen', icon: 'fa-solid fa-spa' },
		{ id: 'timed-15', label: '15s', icon: 'fa-solid fa-bolt' },
		{ id: 'timed-30', label: '30s', icon: 'fa-solid fa-clock' },
		{ id: 'timed-60', label: '60s', icon: 'fa-solid fa-hourglass' },
		{ id: 'daily', label: 'Daily', icon: 'fa-solid fa-calendar-day' }
	];

	function modeToExerciseMode(mode: Mode): ExerciseMode {
		if (mode === 'daily') return 'daily';
		if (mode === 'zen') return 'zen';
		return 'timed';
	}

	function selectMode(mode: Mode) {
		selectedMode = mode;
		sessionResult = null;

		if (mode === 'daily') {
			drillText = getDailyChallengeText($settings.language);
		} else {
			const length = mode.startsWith('timed') ? 200 : 80;
			drillText = generateWordDrill($settings.language, allKeys, length);
		}
	}

	function handleComplete(state: TypingEngineState, combo: ComboState) {
		const exerciseMode = modeToExerciseMode(selectedMode);
		const durationSeconds = state.endTime && state.startTime ? (state.endTime - state.startTime) / 1000 : 0;

		stats.recordSession({
			date: new Date().toISOString(),
			mode: exerciseMode,
			wpm: state.wpm,
			accuracy: state.accuracy,
			duration: durationSeconds,
			keyErrors: state.keyErrors
		});

		const result = gamification.recordSession(
			state.wpm, state.accuracy, durationSeconds, combo.best,
			exerciseMode, 0, $stats.totalSessions
		);

		const xpBreakdown = calculateXp(state.wpm, state.accuracy, durationSeconds, combo.best, exerciseMode);

		sessionResult = {
			state,
			xpBreakdown,
			newBadges: result.newBadges,
			leveledUp: result.leveledUp,
			newLevel: $gamification.level
		};
	}
</script>

<div class="flex flex-1 flex-col items-center gap-8 px-8 py-8">
	<div class="flex flex-col items-center gap-2 text-center">
		<h1 class="font-sans text-4xl font-bold tracking-tight" style="color: var(--text-primary);">
			Turbo<span style="color: var(--accent);">Typer</span>
		</h1>
	</div>

	<div class="flex gap-2">
		{#each modes as mode}
			<button
				onclick={() => selectMode(mode.id)}
				class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200"
				style="
					background-color: {selectedMode === mode.id ? 'var(--accent)' : 'var(--surface)'};
					color: {selectedMode === mode.id ? 'var(--bg-primary)' : 'var(--text-secondary)'};
					border: 1px solid {selectedMode === mode.id ? 'var(--accent)' : 'var(--border)'};
					cursor: pointer;
				"
			>
				<i class={mode.icon}></i>
				{mode.label}
			</button>
		{/each}
	</div>

	<div class="w-full max-w-3xl flex flex-col gap-6">
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
</div>
