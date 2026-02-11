<script lang="ts">
	import type { XpBreakdown } from '$lib/engine/gamification';

	let {
		wpm = 0,
		accuracy = 0,
		errors = 0,
		xpBreakdown,
		newBadges = [],
		leveledUp = false,
		newLevel = 1
	}: {
		wpm: number;
		accuracy: number;
		errors: number;
		xpBreakdown: XpBreakdown | null;
		newBadges: string[];
		leveledUp: boolean;
		newLevel: number;
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-center gap-8 rounded-xl p-6" style="background-color: var(--surface); border: 1px solid var(--border);">
		<div class="flex flex-col items-center gap-1">
			<span class="text-sm" style="color: var(--text-muted);">Snelheid</span>
			<span class="font-mono text-3xl font-bold" style="color: var(--accent);">{wpm} WPM</span>
		</div>
		<div class="h-12 w-px" style="background-color: var(--border);"></div>
		<div class="flex flex-col items-center gap-1">
			<span class="text-sm" style="color: var(--text-muted);">Nauwkeurigheid</span>
			<span class="font-mono text-3xl font-bold" style="color: var(--text-primary);">{accuracy}%</span>
		</div>
		<div class="h-12 w-px" style="background-color: var(--border);"></div>
		<div class="flex flex-col items-center gap-1">
			<span class="text-sm" style="color: var(--text-muted);">Fouten</span>
			<span class="font-mono text-3xl font-bold" style="color: var(--error);">{errors}</span>
		</div>
		{#if xpBreakdown}
			<div class="h-12 w-px" style="background-color: var(--border);"></div>
			<div class="flex flex-col items-center gap-1">
				<span class="text-sm" style="color: var(--text-muted);">XP</span>
				<span class="font-mono text-3xl font-bold" style="color: var(--success);">+{xpBreakdown.total}</span>
			</div>
		{/if}
	</div>

	{#if leveledUp}
		<div class="flex items-center justify-center gap-3 rounded-xl p-4 level-up" style="background-color: var(--surface); border: 2px solid var(--accent);">
			<i class="fa-solid fa-arrow-up text-xl" style="color: var(--accent);"></i>
			<span class="text-lg font-bold" style="color: var(--accent);">Level {newLevel}!</span>
		</div>
	{/if}

	{#if newBadges.length > 0}
		<div class="flex items-center justify-center gap-3 rounded-xl p-4" style="background-color: var(--surface); border: 2px solid var(--success);">
			<i class="fa-solid fa-trophy text-xl" style="color: var(--success);"></i>
			<span class="text-lg font-bold" style="color: var(--success);">
				{newBadges.length === 1 ? 'Nieuwe badge!' : `${newBadges.length} nieuwe badges!`}
			</span>
		</div>
	{/if}
</div>

<style>
	.level-up {
		animation: levelUpBounce 0.5s ease-out;
	}

	@keyframes levelUpBounce {
		0% { transform: scale(0.8); opacity: 0; }
		60% { transform: scale(1.1); }
		100% { transform: scale(1); opacity: 1; }
	}
</style>
