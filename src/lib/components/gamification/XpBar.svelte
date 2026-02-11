<script lang="ts">
	import { gamification } from '$lib/stores/gamification';
	import { getLevelProgress } from '$lib/engine/gamification';

	let levelInfo = $derived(getLevelProgress($gamification.xp));
</script>

<div class="flex items-center gap-3">
	{#if $gamification.streak > 0}
		<div class="flex items-center gap-1">
			<i class="fa-solid fa-fire text-xs" style="color: var(--accent);"></i>
			<span class="font-mono text-xs font-bold" style="color: var(--accent);">{$gamification.streak}</span>
		</div>
	{/if}

	<div class="flex items-center gap-2">
		<span class="font-mono text-xs font-bold" style="color: var(--text-secondary);">
			Lv.{levelInfo.level}
		</span>
		<div class="h-1.5 w-16 overflow-hidden rounded-full" style="background-color: var(--key-bg);">
			<div
				class="h-full rounded-full transition-all duration-500"
				style="background-color: var(--accent); width: {levelInfo.progressPercent}%;"
			></div>
		</div>
	</div>
</div>
