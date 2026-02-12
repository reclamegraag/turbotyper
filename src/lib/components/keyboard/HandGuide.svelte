<script lang="ts">
	import type { Finger } from '$lib/utils/keyboard-layout';

	let { activeFinger = '' }: { activeFinger?: string } = $props();

	const leftFingers: { id: Finger; x: number; y: number; h: number }[] = [
		{ id: 'left-pinky', x: 14, y: 18, h: 28 },
		{ id: 'left-ring', x: 28, y: 10, h: 36 },
		{ id: 'left-middle', x: 42, y: 4, h: 42 },
		{ id: 'left-index', x: 56, y: 12, h: 34 }
	];

	const rightFingers: { id: Finger; x: number; y: number; h: number }[] = [
		{ id: 'right-index', x: 124, y: 12, h: 34 },
		{ id: 'right-middle', x: 138, y: 4, h: 42 },
		{ id: 'right-ring', x: 152, y: 10, h: 36 },
		{ id: 'right-pinky', x: 166, y: 18, h: 28 }
	];

	const FINGER_W = 10;
	const FINGER_R = 5;

	function isActive(id: string): boolean {
		if (activeFinger === 'thumb' && id === 'thumb') return true;
		return activeFinger === id;
	}
</script>

<div class="hand-guide-wrapper">
	<svg viewBox="0 0 190 80" aria-hidden="true">
		<defs>
			<filter id="glow">
				<feGaussianBlur stdDeviation="2" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<!-- Left hand -->
		<g>
			<!-- Palm -->
			<rect x="10" y="42" width="60" height="28" rx="8" class="palm" />

			<!-- Fingers -->
			{#each leftFingers as f}
				<rect
					x={f.x}
					y={f.y}
					width={FINGER_W}
					height={f.h}
					rx={FINGER_R}
					class="finger"
					class:active={isActive(f.id)}
				/>
			{/each}

			<!-- Left thumb -->
			<rect
				x="62" y="56" width={FINGER_W} height="20" rx={FINGER_R}
				transform="rotate(25, 67, 66)"
				class="finger"
				class:active={isActive('thumb')}
			/>
		</g>

		<!-- Right hand -->
		<g>
			<!-- Palm -->
			<rect x="120" y="42" width="60" height="28" rx="8" class="palm" />

			<!-- Fingers -->
			{#each rightFingers as f}
				<rect
					x={f.x}
					y={f.y}
					width={FINGER_W}
					height={f.h}
					rx={FINGER_R}
					class="finger"
					class:active={isActive(f.id)}
				/>
			{/each}

			<!-- Right thumb -->
			<rect
				x="118" y="56" width={FINGER_W} height="20" rx={FINGER_R}
				transform="rotate(-25, 123, 66)"
				class="finger"
				class:active={isActive('thumb')}
			/>
		</g>
	</svg>
</div>

<style>
	.hand-guide-wrapper {
		display: flex;
		justify-content: center;
	}

	svg {
		width: 100%;
		max-width: 420px;
		height: auto;
	}

	.palm {
		fill: var(--surface);
		stroke: var(--border);
		stroke-width: 0.75;
		opacity: 0.25;
	}

	.finger {
		fill: var(--key-bg);
		stroke: var(--border);
		stroke-width: 0.75;
		opacity: 0.45;
		transition: fill 0.15s ease, opacity 0.15s ease, filter 0.15s ease;
	}

	.finger.active {
		fill: var(--accent);
		stroke: var(--accent);
		opacity: 1;
		filter: url(#glow);
	}
</style>
