<script lang="ts">
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

	function formatTime(seconds: number): string {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	}
</script>

<div class="flex items-center justify-between">
	<div class="flex gap-10">
		<div class="flex flex-col items-center gap-2">
			<span class="text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">WPM</span>
			<span class="font-mono text-2xl font-bold" style="color: var(--accent);">{wpm}</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<span class="text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">Accuracy</span>
			<span class="font-mono text-2xl font-bold" style="color: var(--text-primary);">{accuracy}%</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<span class="text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">Tijd</span>
			<span class="font-mono text-2xl font-bold" style="color: var(--text-primary);">{formatTime(elapsed)}</span>
		</div>
	</div>
	<button
		onclick={onRestart}
		class="flex items-center gap-3 rounded-full text-sm font-medium transition-colors duration-200"
		style="
			background-color: var(--surface);
			color: var(--text-secondary);
			border: 1px solid var(--border);
			padding: 7px 20px;
			cursor: pointer;
		"
	>
		<i class="fa-solid fa-rotate-right"></i>
		Opnieuw
	</button>
</div>
