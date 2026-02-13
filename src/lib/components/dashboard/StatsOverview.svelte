<script lang="ts">
	import { settings } from '$lib/stores/settings';

	let {
		totalSessions,
		totalTimeMinutes,
		bestWpm,
		averageWpm,
		averageAccuracy,
		streak,
		level
	} = $props<{
		totalSessions: number;
		totalTimeMinutes: number;
		bestWpm: number;
		averageWpm: number;
		averageAccuracy: number;
		streak: number;
		level: number;
	}>();

	let nl = $derived($settings.language === 'nl');

	function formatTime(minutes: number) {
		const m = Math.round(minutes);
		if (m < 60) return `${m}m`;
		const h = Math.floor(m / 60);
		return `${h}h ${m % 60}m`;
	}
</script>

<div class="mx-auto grid w-full max-w-6xl grid-cols-2 justify-center gap-6 md:grid-cols-3 lg:grid-cols-6">
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-keyboard"></i></div>
		<div class="content">
			<div class="label">{nl ? 'Sessies' : 'Sessions'}</div>
			<div class="value">{totalSessions}</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-clock"></i></div>
		<div class="content">
			<div class="label">{nl ? 'Oefentijd' : 'Time'}</div>
			<div class="value">{formatTime(totalTimeMinutes)}</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-trophy"></i></div>
		<div class="content">
			<div class="label">{nl ? 'Beste' : 'Best'} WPM</div>
			<div class="value">{bestWpm}</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-gauge-high"></i></div>
		<div class="content">
			<div class="label">{nl ? 'Gem.' : 'Avg.'} WPM</div>
			<div class="value">{averageWpm}</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-bullseye"></i></div>
		<div class="content">
			<div class="label">ACC</div>
			<div class="value">{averageAccuracy}%</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-fire"></i></div>
		<div class="content">
			<div class="label">Streak</div>
			<div class="value">{streak}</div>
		</div>
	</div>
</div>

<style>
	.stat-card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 20px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 12px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
	.stat-card:hover {
		transform: translateY(-4px);
		border-color: var(--accent);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
	.icon {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: color-mix(in srgb, var(--accent) 8%, transparent);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		color: var(--accent);
	}
	.content {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.label {
		font-family: var(--font-sans);
		font-size: 10px;
		font-weight: 800;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.15em;
	}
	.value {
		font-family: var(--font-mono);
		font-size: 20px;
		font-weight: 900;
		color: var(--text-primary);
	}
</style>
