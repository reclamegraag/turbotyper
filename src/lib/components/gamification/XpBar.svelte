<script lang="ts">
	import { gamification } from '$lib/stores/gamification';
	import { getLevelProgress } from '$lib/engine/gamification';

	let levelInfo = $derived(getLevelProgress($gamification.xp));
</script>

<div class="flex items-center gap-4 rounded-xl px-3 py-1.5 shadow-sm" style="background-color: var(--surface); border: 1px solid var(--border);">
	{#if $gamification.streak > 0}
		<div class="flex items-center gap-1.5">
			<i class="fa-solid fa-fire text-xs" style="color: var(--accent);"></i>
			<span class="font-mono text-xs font-black" style="color: var(--accent);">{$gamification.streak}</span>
		</div>
		<div class="h-3 w-px" style="background-color: var(--border);"></div>
	{/if}

	<div class="flex items-center gap-3">
		<span class="font-mono text-[10px] font-black uppercase tracking-tighter" style="color: var(--text-secondary);">
			Lv.{levelInfo.level}
		</span>
		<div class="h-2 w-20 overflow-hidden rounded-full" style="background-color: var(--key-bg);">
			<div
				class="h-full rounded-full transition-all duration-700 ease-out"
				style="background-color: var(--accent); width: {levelInfo.progressPercent}%;"
			></div>
		</div>
	</div>
</div>
