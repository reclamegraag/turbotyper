<script lang="ts">
	import { keyboardRows, getKeyInfo, type Finger } from '$lib/utils/keyboard-layout';

	let { activeKey = '', correctFinger = '' }: { activeKey?: string; correctFinger?: string } = $props();

	const fingerColors: Record<Finger, string> = {
		'left-pinky': '#e74c3c',
		'left-ring': '#e67e22',
		'left-middle': '#2ecc71',
		'left-index': '#3498db',
		'right-index': '#9b59b6',
		'right-middle': '#2ecc71',
		'right-ring': '#e67e22',
		'right-pinky': '#e74c3c',
		'thumb': '#95a5a6'
	};

	const rowOffsets = [0, 1.5, 1.75, 2.25, 0];

	function getDisplayLabel(key: string): string {
		if (key === ' ') return '';
		if (key === '\\') return '\\';
		return key.toUpperCase();
	}

	function isActive(key: string): boolean {
		return activeKey.toLowerCase() === key.toLowerCase();
	}
</script>

<div class="flex w-full justify-center">
	<div class="inline-flex flex-col gap-1.5">
	{#each keyboardRows as row, rowIndex}
		<div class="flex gap-1" style="padding-left: {rowOffsets[rowIndex]}rem;">
			{#each row as keyInfo}
				{@const active = isActive(keyInfo.key)}
				{@const keyWidth = keyInfo.width ? `${keyInfo.width * 2.5}rem` : '2.5rem'}
				<div
					class="flex items-center justify-center rounded-md text-xs font-mono font-medium transition-all duration-100 select-none"
					style="
						width: {keyWidth};
						height: 2.5rem;
						background-color: {active ? 'var(--key-active)' : 'var(--key-bg)'};
						color: {active ? 'var(--bg-primary)' : 'var(--text-secondary)'};
						border: 1px solid {active ? 'var(--key-active)' : 'var(--border)'};
						border-bottom: {active ? '1px' : '3px'} solid {active ? 'var(--key-active)' : 'var(--border)'};
						transform: {active ? 'translateY(1px)' : 'none'};
						box-shadow: {active ? 'none' : '0 1px 2px rgba(0,0,0,0.2)'};
					"
				>
					{#if keyInfo.isHomeRow && !active}
						<span class="relative">
							{getDisplayLabel(keyInfo.key)}
							<span class="absolute -bottom-1 left-1/2 h-0.5 w-1.5 -translate-x-1/2 rounded-full" style="background-color: var(--accent); opacity: 0.6;"></span>
						</span>
					{:else}
						{getDisplayLabel(keyInfo.key)}
					{/if}
				</div>
			{/each}
		</div>
	{/each}
	</div>
</div>
