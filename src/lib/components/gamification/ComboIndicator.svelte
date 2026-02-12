<script lang="ts">
	let { combo = 0, multiplier = 1.0 }: { combo: number; multiplier: number } = $props();

	let comboTier = $derived(
		combo >= 100 ? 'legendary' : combo >= 50 ? 'epic' : combo >= 25 ? 'great' : combo >= 10 ? 'good' : 'none'
	);

	let showCombo = $derived(combo >= 10);
</script>

{#if showCombo}
	<div
		class="combo-indicator flex items-center gap-3 rounded-lg transition-all duration-200"
		class:combo-good={comboTier === 'good'}
		class:combo-great={comboTier === 'great'}
		class:combo-epic={comboTier === 'epic'}
		class:combo-legendary={comboTier === 'legendary'}
		style="background-color: var(--surface); border: 1px solid var(--border); padding: 10px 20px;"
	>
		<div class="flex items-center gap-2">
			<i class="fa-solid fa-fire" style="color: var(--accent);"></i>
			<span class="font-mono text-lg font-bold" style="color: var(--accent);">{combo}</span>
		</div>
		{#if multiplier > 1}
			<span class="rounded font-mono text-xs font-bold" style="background-color: var(--accent); color: var(--bg-primary); padding: 6px 12px;">
				×{multiplier}
			</span>
		{/if}
	</div>
{/if}

<style>
	.combo-indicator {
		animation: comboAppear 0.2s ease-out;
	}

	.combo-good {
		box-shadow: 0 0 8px rgba(233, 69, 96, 0.2);
	}

	.combo-great {
		box-shadow: 0 0 12px rgba(233, 69, 96, 0.3);
		animation: comboPulse 1.5s ease-in-out infinite;
	}

	.combo-epic {
		box-shadow: 0 0 16px rgba(233, 69, 96, 0.4);
		animation: comboPulse 1s ease-in-out infinite;
	}

	.combo-legendary {
		box-shadow: 0 0 24px rgba(233, 69, 96, 0.6);
		animation: comboPulse 0.7s ease-in-out infinite;
	}

	@keyframes comboAppear {
		from { transform: scale(0.8); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}

	@keyframes comboPulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.05); }
	}
</style>
