<script lang="ts">
	import { settings } from '$lib/stores/settings';

	let {
		wpm = 0,
		accuracy = 0,
		elapsed = 0,
		onRestart
	}: {
		wpm: number;
		accuracy: number;
		elapsed: number;
		onRestart: () => void;
	} = $props();

	let nl = $derived($settings.language === 'nl');

	function formatTime(seconds: number): string {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	}
</script>

<div class="flex flex-col items-center gap-8 w-full">
	<div class="flex flex-wrap justify-center gap-10 md:gap-16">
		<div class="flex items-baseline gap-3">
			<span class="text-[10px] font-black uppercase tracking-widest opacity-40">WPM</span>
			<span class="font-mono text-4xl font-black" style="color: var(--accent);">{wpm}</span>
		</div>
		<div class="flex items-baseline gap-3">
			<span class="text-[10px] font-black uppercase tracking-widest opacity-40">ACC</span>
			<span class="font-mono text-4xl font-black" style="color: var(--text-primary);">{accuracy}%</span>
		</div>
		<div class="flex items-baseline gap-3">
			<span class="text-[10px] font-black uppercase tracking-widest opacity-40">{nl ? 'TIJD' : 'TIME'}</span>
			<span class="font-mono text-4xl font-black" style="color: var(--text-primary);">{formatTime(elapsed)}</span>
		</div>
	</div>
	<button
		onclick={onRestart}
		class="group flex items-center gap-3 rounded-2xl px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-lg"
		style="
			background-color: var(--surface);
			color: var(--text-secondary);
			border: 1px solid var(--border);
			cursor: pointer;
		"
	>
		<i class="fa-solid fa-rotate-right transition-transform duration-700 group-hover:rotate-180"></i>
		{nl ? 'Opnieuw proberen' : 'Restart drill'}
	</button>
</div>
