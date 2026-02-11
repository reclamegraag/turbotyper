<script lang="ts">
	import type { Finger } from '$lib/utils/keyboard-layout';

	let { activeFinger = '' }: { activeFinger?: string } = $props();

	const leftFingers: { id: Finger; x: number }[] = [
		{ id: 'left-pinky', x: 15 },
		{ id: 'left-ring', x: 30 },
		{ id: 'left-middle', x: 45 },
		{ id: 'left-index', x: 60 }
	];

	const rightFingers: { id: Finger; x: number }[] = [
		{ id: 'right-index', x: 140 },
		{ id: 'right-middle', x: 155 },
		{ id: 'right-ring', x: 170 },
		{ id: 'right-pinky', x: 185 }
	];

	const thumbs: { id: Finger; x: number }[] = [
		{ id: 'thumb', x: 100 }
	];

	function isActive(finger: Finger): boolean {
		return activeFinger === finger;
	}
</script>

<div class="flex justify-center">
	<svg viewBox="0 0 200 80" width="400" height="160" class="select-none">
		{#each leftFingers as finger}
			<circle
				cx={finger.x}
				cy={20}
				r={isActive(finger.id) ? 10 : 8}
				fill={isActive(finger.id) ? 'var(--accent)' : 'var(--key-bg)'}
				stroke={isActive(finger.id) ? 'var(--accent)' : 'var(--border)'}
				stroke-width="1.5"
				opacity={isActive(finger.id) ? 1 : 0.6}
			>
				{#if isActive(finger.id)}
					<animate attributeName="r" values="8;10;8" dur="0.6s" repeatCount="1" />
				{/if}
			</circle>
			<line
				x1={finger.x} y1={30} x2={finger.x} y2={55}
				stroke={isActive(finger.id) ? 'var(--accent)' : 'var(--border)'}
				stroke-width="2"
				opacity={isActive(finger.id) ? 0.8 : 0.3}
			/>
		{/each}

		{#each rightFingers as finger}
			<circle
				cx={finger.x}
				cy={20}
				r={isActive(finger.id) ? 10 : 8}
				fill={isActive(finger.id) ? 'var(--accent)' : 'var(--key-bg)'}
				stroke={isActive(finger.id) ? 'var(--accent)' : 'var(--border)'}
				stroke-width="1.5"
				opacity={isActive(finger.id) ? 1 : 0.6}
			>
				{#if isActive(finger.id)}
					<animate attributeName="r" values="8;10;8" dur="0.6s" repeatCount="1" />
				{/if}
			</circle>
			<line
				x1={finger.x} y1={30} x2={finger.x} y2={55}
				stroke={isActive(finger.id) ? 'var(--accent)' : 'var(--border)'}
				stroke-width="2"
				opacity={isActive(finger.id) ? 0.8 : 0.3}
			/>
		{/each}

		{#each thumbs as finger}
			<ellipse
				cx={finger.x}
				cy={65}
				rx={isActive(finger.id) ? 14 : 12}
				ry={isActive(finger.id) ? 8 : 6}
				fill={isActive(finger.id) ? 'var(--accent)' : 'var(--key-bg)'}
				stroke={isActive(finger.id) ? 'var(--accent)' : 'var(--border)'}
				stroke-width="1.5"
				opacity={isActive(finger.id) ? 1 : 0.6}
			/>
		{/each}

		<rect x="5" y="55" width="70" height="20" rx="8" fill="none" stroke="var(--border)" stroke-width="1" opacity="0.3" />
		<rect x="125" y="55" width="70" height="20" rx="8" fill="none" stroke="var(--border)" stroke-width="1" opacity="0.3" />
	</svg>
</div>
