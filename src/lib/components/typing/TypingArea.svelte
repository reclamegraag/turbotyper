<script lang="ts">
	import {
		createInitialState,
		processKeystroke,
		getCharStatus,
		getElapsedSeconds,
		calculateWpm,
		type TypingEngineState
	} from '$lib/engine/typing-engine';
	import { createComboState, comboHit, comboMiss, type ComboState } from '$lib/engine/gamification';
	import { getKeyInfo } from '$lib/utils/keyboard-layout';
	import Keyboard from '$lib/components/keyboard/Keyboard.svelte';
	import HandGuide from '$lib/components/keyboard/HandGuide.svelte';
	import StatsBar from '$lib/components/typing/StatsBar.svelte';
	import ComboIndicator from '$lib/components/gamification/ComboIndicator.svelte';
	import { settings } from '$lib/stores/settings';

	let {
		text = '',
		onComplete
	}: {
		text: string;
		onComplete?: (result: TypingEngineState, combo: ComboState) => void;
	} = $props();
	let typing: TypingEngineState = $state(createInitialState(text));
	let combo: ComboState = $state(createComboState());
	let elapsed = $state(0);
	let intervalId: ReturnType<typeof setInterval> | null = null;

	let nextChar = $derived(typing.text[typing.cursorPosition] ?? '');
	let nextKeyInfo = $derived(getKeyInfo(nextChar));

	$effect(() => {
		typing = createInitialState(text);
		combo = createComboState();
		elapsed = 0;
		stopTimer();
		inputField?.focus();
	});

	// Auto-focus on mount (inputField is undefined during first $effect run)
	$effect(() => {
		if (inputField) {
			inputField.focus();
		}
	});

	function startTimer() {
		if (intervalId) return;
		intervalId = setInterval(() => {
			elapsed = getElapsedSeconds(typing.startTime);
			if (typing.startTime) {
				typing.wpm = calculateWpm(typing.correctChars, typing.startTime, Date.now());
			}
		}, 200);
	}

	function stopTimer() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (typing.isComplete) return;
		if (e.ctrlKey || e.altKey || e.metaKey) return;

		const allowedKeys = e.key === 'Backspace' || e.key.length === 1;
		if (!allowedKeys) return;

		e.preventDefault();

		if (!typing.isActive && e.key !== 'Backspace') {
			startTimer();
		}

		const prevCorrect = typing.correctChars;
		typing = processKeystroke(typing, e.key);

		if (e.key !== 'Backspace' && e.key.length === 1) {
			combo = typing.correctChars > prevCorrect ? comboHit(combo) : comboMiss(combo);
		}

		if (typing.isComplete) {
			stopTimer();
			onComplete?.(typing, combo);
		}
	}

	function restart() {
		typing = createInitialState(text);
		combo = createComboState();
		elapsed = 0;
		stopTimer();
		inputField?.focus();
	}

	let inputEl: HTMLDivElement | undefined = $state();
	let inputField: HTMLInputElement | undefined = $state();
</script>

<div class="flex flex-col items-center gap-10 w-full">
	<div class="flex flex-col items-center gap-6 w-full max-w-2xl">
		<StatsBar wpm={typing.wpm} accuracy={typing.accuracy} {elapsed} />
		<div class="flex items-center gap-4">
			<button
				onclick={restart}
				class="group flex items-center gap-3 rounded-2xl px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-lg"
				style="
					background-color: var(--surface);
					color: var(--text-secondary);
					border: 1px solid var(--border);
					cursor: pointer;
				"
			>
				<i class="fa-solid fa-rotate-right transition-transform duration-700 group-hover:rotate-180"></i>
				{$settings.language === 'nl' ? 'Opnieuw proberen' : 'Restart drill'}
			</button>
			<ComboIndicator combo={combo.current} multiplier={combo.multiplier} />
		</div>
	</div>

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={inputEl}
		class="relative cursor-text rounded-3xl font-mono text-2xl leading-relaxed outline-none transition-all duration-500 focus-within:ring-4"
		style="background-color: var(--surface); border: 1px solid var(--border); --tw-ring-color: var(--accent); padding: 3rem 4rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
	>
		<!-- Hidden input for keyboard capture - positioned over the div -->
		<input
			bind:this={inputField}
			type="text"
			value=""
			autofocus
			onkeydown={handleKeydown}
			style="position: absolute; inset: 0; opacity: 0; cursor: inherit; font-size: inherit;"
		/>
		<div class="flex flex-wrap justify-center text-center">
			{#each text.split('') as char, i}
				{@const status = getCharStatus(typing.text, typing.input, i)}
				<span
					class="relative inline-block"
					class:correct={status === 'correct'}
					class:incorrect={status === 'incorrect'}
					class:cursor-char={status === 'cursor'}
					style="
						color: {status === 'correct' ? 'var(--success)' : status === 'incorrect' ? 'var(--error)' : status === 'cursor' ? 'var(--text-primary)' : 'var(--text-muted)'};
						{status === 'incorrect' ? 'background-color: rgba(231, 76, 60, 0.15); border-radius: 4px;' : ''}
					"
				>{#if status === 'cursor'}<span class="animate-blink absolute -left-0.5 bottom-1 top-1 w-1 rounded-full shadow-[0_0_10px_var(--accent)]" style="background-color: var(--accent);"></span>{/if}{char === ' ' ? '\u00A0' : char}</span>
			{/each}
		</div>
	</div>

	{#if $settings.showKeyboard}
		<Keyboard activeKey={nextChar} />
	{/if}
	{#if $settings.showHands}
		<HandGuide activeFinger={nextKeyInfo?.finger ?? ''} />
	{/if}
</div>

<style>
	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
	.animate-blink {
		animation: blink 1s ease-in-out infinite;
	}
</style>
