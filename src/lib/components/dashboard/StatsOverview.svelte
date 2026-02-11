<script lang="ts">
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

	function formatTime(minutes: number) {
		const m = Math.round(minutes);
		if (m < 60) return `${m}m`;
		const h = Math.floor(m / 60);
		return `${h}h ${m % 60}m`;
	}
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-keyboard"></i></div>
		<div class="content">
			<div class="label">Sessies</div>
			<div class="value">{totalSessions}</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-clock"></i></div>
		<div class="content">
			<div class="label">Oefentijd</div>
			<div class="value">{formatTime(totalTimeMinutes)}</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-trophy"></i></div>
		<div class="content">
			<div class="label">Beste WPM</div>
			<div class="value">{bestWpm}</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-gauge-high"></i></div>
		<div class="content">
			<div class="label">Gem. WPM</div>
			<div class="value">{averageWpm}</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-bullseye"></i></div>
		<div class="content">
			<div class="label">Gem. Accuracy</div>
			<div class="value">{averageAccuracy}%</div>
		</div>
	</div>
	<div class="stat-card">
		<div class="icon"><i class="fa-solid fa-fire"></i></div>
		<div class="content">
			<div class="label">Streak</div>
			<div class="value">{streak} dagen</div>
		</div>
	</div>
</div>

<style>
	.stat-card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		align-items: center;
		gap: 16px;
		transition: transform 0.2s, border-color 0.2s;
	}
	.stat-card:hover {
		transform: translateY(-2px);
		border-color: var(--accent);
	}
	.icon {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		background: color-mix(in srgb, var(--accent) 10%, transparent);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		color: var(--accent);
	}
	.content {
		display: flex;
		flex-direction: column;
	}
	.label {
		font-family: var(--font-sans);
		font-size: 12px;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	.value {
		font-family: var(--font-mono);
		font-size: 24px;
		font-weight: bold;
		color: var(--text-primary);
	}
</style>
