<script lang="ts">
	import { keyboardRows } from '$lib/utils/keyboard-layout';

	interface Props {
		weakKeys: Record<string, number>;
		strongKeys: Record<string, number>;
	}

	let { weakKeys = {}, strongKeys = {} }: Props = $props();

	const rowOffsets = [0, 16, 24, 36, 108];

	function getKeyStyle(key: string) {
		const k = key.toLowerCase();
		const weak = weakKeys[k];
		const strong = strongKeys[k];

		if (weak) {
			const maxWeak = Math.max(...Object.values(weakKeys), 1);
			const intensity = 0.2 + (weak / maxWeak) * 0.6;
			return `background: color-mix(in srgb, var(--error) ${intensity * 100}%, var(--key-bg)); color: var(--text-primary); border-color: var(--error);`;
		}
		if (strong) {
			const maxStrong = Math.max(...Object.values(strongKeys), 1);
			const intensity = 0.2 + (strong / maxStrong) * 0.6;
			return `background: color-mix(in srgb, var(--success) ${intensity * 100}%, var(--key-bg)); color: var(--text-primary); border-color: var(--success);`;
		}
		return `background: var(--key-bg); color: var(--text-muted); border-color: var(--border);`;
	}

	function getTooltip(key: string) {
		const k = key.toLowerCase();
		if (weakKeys[k]) return `${key.toUpperCase()}: ${weakKeys[k]} errors`;
		if (strongKeys[k]) return `${key.toUpperCase()}: Strong`;
		return key.toUpperCase();
	}
</script>

<div class="keyboard">
	{#if Object.keys(weakKeys).length === 0 && Object.keys(strongKeys).length === 0}
		<div class="no-data">Nog geen data</div>
	{/if}

	{#each keyboardRows as row, i}
		<div class="row" style="margin-left: {rowOffsets[i] || 0}px">
			{#each row as key}
				<div
					class="key"
					style="{getKeyStyle(key.key)}; width: {key.width ? key.width * 36 + (key.width - 1) * 4 : 36}px;"
					title={getTooltip(key.key)}
				>
					{key.key === ' ' ? 'SPACE' : key.key.toUpperCase()}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.keyboard {
		display: flex;
		flex-direction: column;
		gap: 4px;
		align-items: flex-start;
		position: relative;
		padding: 16px;
		background: var(--surface);
		border-radius: 12px;
		border: 1px solid var(--border);
		width: fit-content;
		margin: 0 auto;
	}
	.row {
		display: flex;
		gap: 4px;
	}
	.key {
		height: 36px;
		border-radius: 4px;
		display: flex;
		align-items: center;
        justify-content: center;
		font-family: var(--font-mono);
		font-size: 12px;
		border: 1px solid transparent;
		transition: all 0.2s;
		cursor: default;
		user-select: none;
	}
	.no-data {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: var(--surface);
		padding: 8px 16px;
		border-radius: 8px;
		border: 1px solid var(--border);
		z-index: 10;
		color: var(--text-muted);
		font-family: var(--font-mono);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	}
</style>
