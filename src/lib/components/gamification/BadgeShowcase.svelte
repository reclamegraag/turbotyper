<script lang="ts">
	import { achievements, getAchievementById } from '$lib/data/achievements';
	import { gamification } from '$lib/stores/gamification';
	import { settings } from '$lib/stores/settings';

	let unlockedSet = $derived(new Set($gamification.unlockedBadges));
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col items-center gap-2">
		<h2 class="text-xs font-black uppercase tracking-[0.2em] opacity-40">
			{$settings.language === 'nl' ? 'Badges' : 'Badges'}
		</h2>
		<div class="text-[10px] font-black tracking-widest opacity-20">
			{$gamification.unlockedBadges.length} / {achievements.length} UNLOCKED
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
		{#each achievements as achievement}
			{@const unlocked = unlockedSet.has(achievement.id)}
			<div
				class="flex flex-col items-center gap-2 rounded-xl transition-all duration-200"
				style="
					background-color: var(--surface);
					border: 1px solid {unlocked ? 'var(--accent)' : 'var(--border)'};
					opacity: {unlocked ? 1 : 0.4};
					padding: 20px 16px;
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
