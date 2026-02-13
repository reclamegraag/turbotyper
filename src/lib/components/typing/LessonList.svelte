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

<div class="mx-auto flex w-full max-w-4xl flex-col gap-12 py-8">
	<div class="flex flex-col items-center gap-4 text-center">
		<h1 class="text-5xl font-extrabold tracking-tight">
			{$settings.language === 'nl' ? 'Lessen' : 'Lessons'}
		</h1>
		<div class="text-xs font-black uppercase tracking-[0.3em] opacity-40">
			{$progress.completedLessons.length} / {lessons.length} {$settings.language === 'nl' ? 'Voltooid' : 'Completed'}
		</div>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each lessons as lesson}
			{@const unlocked = isLessonUnlocked(lesson.id, $progress.completedLessons)}
			{@const completed = $progress.completedLessons.includes(lesson.id)}
			<button
				onclick={() => unlocked && onSelectLesson(lesson.id)}
				disabled={!unlocked}
				class="group flex items-center gap-5 rounded-2xl p-5 text-left transition-all duration-300 active:scale-95"
				style="
					background-color: var(--surface);
					border: 2px solid {completed ? 'var(--success)' : unlocked ? 'var(--border)' : 'transparent'};
					opacity: {unlocked ? 1 : 0.4};
					cursor: {unlocked ? 'pointer' : 'not-allowed'};
					box-shadow: {unlocked ? '0 4px 20px -5px rgba(0,0,0,0.2)' : 'none'};
				"
			>
				<div
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-black transition-transform duration-500 group-hover:rotate-12"
					style="
						background-color: {completed ? 'var(--success)' : unlocked ? 'var(--accent)' : 'var(--key-bg)'};
						color: var(--bg-primary);
					"
				>
					{#if completed}
						<i class="fa-solid fa-check"></i>
					{:else if !unlocked}
						<i class="fa-solid fa-lock text-sm opacity-50"></i>
					{:else}
						{lesson.id}
					{/if}
				</div>
				<div class="flex flex-col gap-0.5">
					<span class="text-lg font-bold tracking-tight" style="color: var(--text-primary);">
						{getLessonTitle(lesson)}
					</span>
					<span class="text-xs font-medium uppercase tracking-wider" style="color: var(--text-muted);">
						{getLessonDesc(lesson)}
					</span>
				</div>
				{#if unlocked && !completed}
					<i
						class="fa-solid fa-chevron-right ml-auto transition-transform duration-300 group-hover:translate-x-1"
						style="color: var(--text-muted);"
					></i>
				{/if}
			</button>
		{/each}
	</div>
</div>
