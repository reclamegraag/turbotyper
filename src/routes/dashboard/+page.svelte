<script lang="ts">
	import { stats } from '$lib/stores/stats';
	import { progress } from '$lib/stores/progress';
	import { gamification } from '$lib/stores/gamification';
	import { settings } from '$lib/stores/settings';
	import StatsOverview from '$lib/components/dashboard/StatsOverview.svelte';
	import LineChart from '$lib/components/dashboard/LineChart.svelte';
	import KeyHeatmap from '$lib/components/dashboard/KeyHeatmap.svelte';
	import SessionHistory from '$lib/components/dashboard/SessionHistory.svelte';
	import Suggestions from '$lib/components/dashboard/Suggestions.svelte';
	import BadgeShowcase from '$lib/components/gamification/BadgeShowcase.svelte';

	const nl = $derived($settings.language === 'nl');

	let wpmData = $derived(
		$stats.sessionsHistory.map((s) => ({
			label: new Date(s.date).toLocaleDateString(nl ? 'nl-NL' : 'en-US', { day: 'numeric', month: 'short' }),
			value: s.wpm
		}))
	);

	let accData = $derived(
		$stats.sessionsHistory.map((s) => ({
			label: new Date(s.date).toLocaleDateString(nl ? 'nl-NL' : 'en-US', { day: 'numeric', month: 'short' }),
			value: s.accuracy
		}))
	);
</script>

<div class="mx-auto flex w-full max-w-5xl flex-col gap-8 px-8 py-8">
	<h1 class="text-3xl font-bold" style="color: var(--text-primary);">Dashboard</h1>

	<StatsOverview
		totalSessions={$stats.totalSessions}
		totalTimeMinutes={$stats.totalTimeMinutes}
		bestWpm={$stats.bestWpm}
		averageWpm={$stats.averageWpm}
		averageAccuracy={$stats.averageAccuracy}
		streak={$gamification.streak}
		level={$gamification.level}
	/>

	<div class="grid grid-cols-2 gap-6">
		<section class="flex flex-col gap-3">
			<h2 class="text-lg font-semibold" style="color: var(--text-primary);">
				{nl ? 'WPM over tijd' : 'WPM over time'}
			</h2>
			<div class="rounded-xl p-4" style="background-color: var(--surface); border: 1px solid var(--border);">
				<LineChart data={wpmData} color="var(--accent)" unit=" WPM" emptyMessage={nl ? 'Nog geen data' : 'No data yet'} />
			</div>
		</section>

		<section class="flex flex-col gap-3">
			<h2 class="text-lg font-semibold" style="color: var(--text-primary);">
				{nl ? 'Accuracy over tijd' : 'Accuracy over time'}
			</h2>
			<div class="rounded-xl p-4" style="background-color: var(--surface); border: 1px solid var(--border);">
				<LineChart data={accData} color="var(--success)" maxValue={100} unit="%" emptyMessage={nl ? 'Nog geen data' : 'No data yet'} />
			</div>
		</section>
	</div>

	<section class="flex flex-col gap-3">
		<h2 class="text-lg font-semibold" style="color: var(--text-primary);">
			{nl ? 'Toetsen heatmap' : 'Key Heatmap'}
		</h2>
		<KeyHeatmap weakKeys={$progress.weakKeys} strongKeys={$progress.strongKeys} />
	</section>

	<div class="grid grid-cols-2 gap-6">
		<SessionHistory sessions={$stats.sessionsHistory} />
		<Suggestions
			weakKeys={$progress.weakKeys}
			averageWpm={$stats.averageWpm}
			averageAccuracy={$stats.averageAccuracy}
		/>
	</div>

	<BadgeShowcase />
</div>
