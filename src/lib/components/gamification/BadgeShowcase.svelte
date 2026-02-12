<script lang="ts">
	import { achievements, getAchievementById } from '$lib/data/achievements';
	import { gamification } from '$lib/stores/gamification';
	import { settings } from '$lib/stores/settings';

	let unlockedSet = $derived(new Set($gamification.unlockedBadges));
</script>

<div class="flex flex-col gap-6">
	<h2 class="text-xl font-bold" style="color: var(--text-primary);">
		{$settings.language === 'nl' ? 'Badges' : 'Badges'}
		<span class="text-sm font-normal" style="color: var(--text-muted);">
			{$gamification.unlockedBadges.length}/{achievements.length}
		</span>
	</h2>

	<div class="grid grid-cols-4 gap-4">
		{#each achievements as achievement}
			{@const unlocked = unlockedSet.has(achievement.id)}
			<div
				class="flex flex-col items-center gap-2 rounded-xl transition-all duration-200"
				style="
					background-color: var(--surface);
					border: 1px solid {unlocked ? 'var(--accent)' : 'var(--border)'};
					opacity: {unlocked ? 1 : 0.4};
					padding: 7px 20px;
				"
			>
				<div
					class="flex h-12 w-12 items-center justify-center rounded-full text-xl"
					style="
						background-color: {unlocked ? 'var(--accent)' : 'var(--key-bg)'};
						color: {unlocked ? 'var(--bg-primary)' : 'var(--text-muted)'};
					"
				>
					<i class={unlocked ? achievement.icon : 'fa-solid fa-question'}></i>
				</div>
				<span class="text-center text-xs font-medium" style="color: var(--text-primary);">
					{$settings.language === 'nl' ? achievement.title : achievement.titleEn}
				</span>
				<span class="text-center text-xs" style="color: var(--text-muted);">
					{$settings.language === 'nl' ? achievement.description : achievement.descriptionEn}
				</span>
			</div>
		{/each}
	</div>
</div>
