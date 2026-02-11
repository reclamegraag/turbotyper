<script lang="ts">
	interface ChartPoint { label: string; value: number }
	interface Props {
		data: ChartPoint[]; height?: number; color?: string;
		maxValue?: number; unit?: string; emptyMessage?: string;
	}
	let { data, height = 200, color = 'var(--accent)', maxValue, unit = '', emptyMessage = 'No data available' }: Props = $props();

	let width = $state(0);
	let hoveredIndex = $state<number | null>(null);
	const pad = { top: 8, right: 8, bottom: 24, left: 40 };
	const gradientId = `grad-${Math.random().toString(36).slice(2, 8)}`;

	let cw = $derived(Math.max(0, width - pad.left - pad.right));
	let ch = $derived(Math.max(0, height - pad.top - pad.bottom));
	let safe = $derived((() => { const m = maxValue ?? (data.length > 0 ? Math.max(...data.map((d: ChartPoint) => d.value)) : 100); return m === 0 ? 10 : m; })());

	function px(i: number) { return pad.left + (i / (data.length - 1 || 1)) * cw; }
	function py(v: number) { return pad.top + ch - (v / safe) * ch; }

	let points = $derived(data.map((d: ChartPoint, i: number) => `${px(i)},${py(d.value)}`).join(' '));
	let area = $derived(points ? `${pad.left},${height - pad.bottom} ${points} ${pad.left + cw},${height - pad.bottom}` : '');
	let yGrid = $derived([0, 0.25, 0.5, 0.75, 1].map((t) => ({ val: Math.round(safe * t), y: py(Math.round(safe * t)) })));

	let xLabels = $derived((() => {
		const step = data.length <= 8 ? 1 : Math.ceil(data.length / 8);
		const result: { label: string; x: number }[] = [];
		for (let i = 0; i < data.length; i++) {
			if (i % step === 0) result.push({ label: data[i].label, x: px(i) });
		}
		return result;
	})());
</script>

<div class="w-full relative" style="height: {height}px; font-family: var(--font-mono);" bind:clientWidth={width}>
	{#if width > 0}
		<svg {width} {height} viewBox="0 0 {width} {height}">
			<defs>
				<linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stop-color={color} stop-opacity="0.3" />
					<stop offset="100%" stop-color={color} stop-opacity="0.05" />
				</linearGradient>
			</defs>
			{#if data.length === 0}
				<text x="50%" y="50%" text-anchor="middle" fill="var(--text-muted)" font-family="var(--font-mono)">{emptyMessage}</text>
			{:else}
				{#each yGrid as g}
					<line x1={pad.left} y1={g.y} x2={width - pad.right} y2={g.y} stroke="var(--border)" stroke-dasharray="4" stroke-width="1" />
					<text x={pad.left - 8} y={g.y + 4} text-anchor="end" font-size="10" fill="var(--text-muted)" font-family="var(--font-mono)">{g.val}</text>
				{/each}
				<polygon points={area} fill="url(#{gradientId})" />
				<polyline {points} fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				{#each xLabels as label}
					<text x={label.x} y={height - 6} text-anchor="middle" font-size="10" fill="var(--text-muted)" font-family="var(--font-mono)">{label.label}</text>
				{/each}
				{#each data as d, i}
					{@const x = px(i)}
					{@const y = py(d.value)}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<circle cx={x} cy={y} r="8" fill="transparent" style="cursor: pointer;" onmouseenter={() => hoveredIndex = i} onmouseleave={() => hoveredIndex = null} />
					<circle cx={x} cy={y} r={hoveredIndex === i ? 5 : 3} fill={color} stroke="var(--surface)" stroke-width="2" style="pointer-events: none; transition: r 0.2s ease;" />
					{#if hoveredIndex === i}
						<g transform="translate({x}, {y - 15})">
							<rect x="-30" y="-25" width="60" height="20" rx="4" fill="var(--surface)" stroke="var(--border)" stroke-width="1" />
							<text x="0" y="-11" text-anchor="middle" font-size="10" fill="var(--text-primary)" font-family="var(--font-mono)" font-weight="bold">{d.value}{unit}</text>
						</g>
					{/if}
				{/each}
			{/if}
		</svg>
	{/if}
</div>
