<script lang="ts">
	import type { SessionResult } from '$lib/stores/stats';
	import { settings } from '$lib/stores/settings';

	let { sessions } = $props<{ sessions: SessionResult[] }>();

	let sorted = $derived([...sessions].reverse().slice(0, 20));

	const modeLabels: Record<string, Record<string, string>> = {
		nl: { lesson: 'Les', timed: 'Tijdrace', zen: 'Zen', daily: 'Dagelijks' },
		en: { lesson: 'Lesson', timed: 'Timed', zen: 'Zen', daily: 'Daily' }
	};

	function formatDate(dateStr: string): string {
		const d = new Date(dateStr);
		return d.toLocaleDateString($settings.language === 'nl' ? 'nl-NL' : 'en-US', {
			day: 'numeric', month: 'short'
		});
	}

	function formatDuration(seconds: number): string {
		const m = Math.floor(seconds / 60);
		const s = Math.round(seconds % 60);
		return m > 0 ? `${m}m ${s}s` : `${s}s`;
	}
</script>

<div class="flex w-full flex-col gap-6">
	<h3 class="text-center text-xs font-black uppercase tracking-[0.2em] opacity-40">
		{$settings.language === 'nl' ? 'Sessie-historie' : 'Session History'}
	</h3>

	{#if sorted.length === 0}
		<p class="text-sm" style="color: var(--text-muted);">
			{$settings.language === 'nl' ? 'Nog geen sessies.' : 'No sessions yet.'}
		</p>
	{:else}
		<div class="flex flex-col gap-2" style="max-height: 400px; overflow-y: auto;">
			{#each sorted as session}
				<div
					class="flex items-center justify-between rounded-lg px-4 py-3"
					style="background-color: var(--surface); border: 1px solid var(--border);"
				>
					<div class="flex items-center gap-4">
						<span class="text-xs font-mono" style="color: var(--text-muted);">
							{formatDate(session.date)}
						</span>
						<span
							class="rounded-md text-xs font-medium"
							style="background-color: var(--bg-tertiary); color: var(--text-secondary); padding: 6px 14px;"
						>
							{modeLabels[$settings.language]?.[session.mode] ?? session.mode}
						</span>
					</div>
					<div class="flex items-center gap-6">
						<div class="flex items-center gap-1">
							<i class="fa-solid fa-gauge-high text-xs" style="color: var(--accent);"></i>
							<span class="font-mono text-sm font-bold" style="color: var(--text-primary);">{session.wpm}</span>
							<span class="text-xs" style="color: var(--text-muted);">WPM</span>
						</div>
						<div class="flex items-center gap-1">
							<i class="fa-solid fa-bullseye text-xs" style="color: var(--success);"></i>
							<span class="font-mono text-sm" style="color: var(--text-primary);">{session.accuracy}%</span>
						</div>
						<span class="text-xs font-mono" style="color: var(--text-muted);">
							{formatDuration(session.duration)}
						</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
