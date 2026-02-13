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

<div class="mx-auto flex w-full max-w-5xl flex-col gap-16 py-8">
	<div class="flex flex-col items-center gap-6 text-center">
		<h1 class="text-6xl font-black tracking-tighter">Dashboard</h1>
		<div class="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
			<span>Level {$gamification.level}</span>
			<span class="h-4 w-px bg-[var(--border)]"></span>
			<span>{$gamification.streak} {nl ? 'Dagen' : 'Day'} Streak</span>
		</div>
	</div>

	<StatsOverview
		totalSessions={$stats.totalSessions}
		totalTimeMinutes={$stats.totalTimeMinutes}
		bestWpm={$stats.bestWpm}
		averageWpm={$stats.averageWpm}
		averageAccuracy={$stats.averageAccuracy}
		streak={$gamification.streak}
		level={$gamification.level}
	/>

	<div class="grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
		<section class="flex flex-col items-center gap-6">
			<h2 class="text-center text-xs font-black uppercase tracking-[0.2em] opacity-40">
				{nl ? 'WPM over tijd' : 'WPM over time'}
			</h2>
			<div class="w-full rounded-3xl p-6 shadow-xl" style="background-color: var(--surface); border: 1px solid var(--border);">
				<LineChart data={wpmData} color="var(--accent)" unit=" WPM" emptyMessage={nl ? 'Nog geen data' : 'No data yet'} />
			</div>
		</section>

		<section class="flex flex-col items-center gap-6">
			<h2 class="text-center text-xs font-black uppercase tracking-[0.2em] opacity-40">
				{nl ? 'Accuracy over tijd' : 'Accuracy over time'}
			</h2>
			<div class="w-full rounded-3xl p-6 shadow-xl" style="background-color: var(--surface); border: 1px solid var(--border);">
				<LineChart data={accData} color="var(--success)" maxValue={100} unit="%" emptyMessage={nl ? 'Nog geen data' : 'No data yet'} />
			</div>
		</section>
	</div>

	<section class="flex w-full flex-col items-center gap-6">
		<h2 class="text-center text-xs font-black uppercase tracking-[0.2em] opacity-40">
			{nl ? 'Toetsen heatmap' : 'Key Heatmap'}
		</h2>
		<div class="w-full rounded-3xl p-8 shadow-xl" style="background-color: var(--surface); border: 1px solid var(--border);">
			<KeyHeatmap weakKeys={$progress.weakKeys} strongKeys={$progress.strongKeys} />
		</div>
	</section>

	<div class="grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
		<section class="flex flex-col items-center">
			<SessionHistory sessions={$stats.sessionsHistory} />
		</section>
		<section class="flex flex-col items-center">
			<Suggestions
				weakKeys={$progress.weakKeys}
				averageWpm={$stats.averageWpm}
				averageAccuracy={$stats.averageAccuracy}
			/>
		</section>
	</div>

	<BadgeShowcase />
</div>
