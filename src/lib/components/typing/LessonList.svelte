<script lang="ts">
	import { lessons, isLessonUnlocked } from '$lib/data/lessons';
	import { progress } from '$lib/stores/progress';
	import { settings } from '$lib/stores/settings';

	let { onSelectLesson }: { onSelectLesson: (lessonId: number) => void } = $props();

	function getLessonTitle(lesson: typeof lessons[0]): string {
		return $settings.language === 'nl' ? lesson.title : lesson.titleEn;
	}

	function getLessonDesc(lesson: typeof lessons[0]): string {
		return $settings.language === 'nl' ? lesson.description : lesson.descriptionEn;
	}
</script>

<div class="mx-auto flex w-full max-w-2xl flex-col gap-8 px-8 py-12">
	<h1 class="text-3xl font-bold" style="color: var(--text-primary);">
		{$settings.language === 'nl' ? 'Lessen' : 'Lessons'}
	</h1>
	<div class="flex flex-col gap-3">
		{#each lessons as lesson}
			{@const unlocked = isLessonUnlocked(lesson.id, $progress.completedLessons)}
			{@const completed = $progress.completedLessons.includes(lesson.id)}
			<button
				onclick={() => unlocked && onSelectLesson(lesson.id)}
				disabled={!unlocked}
				class="flex items-center gap-4 rounded-xl text-left transition-all duration-200"
				style="
					background-color: var(--surface);
					border: 1px solid {completed ? 'var(--success)' : 'var(--border)'};
					opacity: {unlocked ? 1 : 0.5};
					cursor: {unlocked ? 'pointer' : 'not-allowed'};
					padding: 16px 20px;
				"
			>
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
					style="
						background-color: {completed ? 'var(--success)' : unlocked ? 'var(--accent)' : 'var(--key-bg)'};
						color: var(--bg-primary);
					"
				>
					{#if completed}
						<i class="fa-solid fa-check"></i>
					{:else if !unlocked}
						<i class="fa-solid fa-lock"></i>
					{:else}
						{lesson.id}
					{/if}
				</div>
				<div class="flex flex-col gap-1">
					<span class="font-semibold" style="color: var(--text-primary);">
						{getLessonTitle(lesson)}
					</span>
					<span class="text-sm" style="color: var(--text-muted);">
						{getLessonDesc(lesson)}
					</span>
				</div>
				{#if unlocked && !completed}
					<i class="fa-solid fa-chevron-right ml-auto" style="color: var(--text-muted);"></i>
				{/if}
			</button>
		{/each}
	</div>
</div>
