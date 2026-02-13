<script lang="ts">
	import { settings } from '$lib/stores/settings';

	interface Props {
		weakKeys: Record<string, number>;
		averageWpm: number;
		averageAccuracy: number;
	}

	let { weakKeys = {}, averageWpm = 0, averageAccuracy = 0 }: Props = $props();

	interface Tip { icon: string; text: string }

	let tips = $derived((() => {
		const result: Tip[] = [];
		const nl = $settings.language === 'nl';
		const weakEntries = Object.entries(weakKeys).sort((a, b) => b[1] - a[1]).slice(0, 3);

		if (weakEntries.length > 0) {
			const keys = weakEntries.map(([k]) => k.toUpperCase()).join(', ');
			result.push({
				icon: 'fa-solid fa-keyboard',
				text: nl ? `Focus op de toetsen: ${keys}. Deze hebben de meeste fouten.` : `Focus on keys: ${keys}. These have the most errors.`
			});
		}
		if (averageAccuracy > 0 && averageAccuracy < 90) {
			result.push({
				icon: 'fa-solid fa-bullseye',
				text: nl ? 'Je accuracy is onder 90%. Typ langzamer en focus op precisie.' : 'Your accuracy is below 90%. Type slower and focus on precision.'
			});
		}
		if (averageWpm > 0 && averageWpm < 30) {
			result.push({
				icon: 'fa-solid fa-snail',
				text: nl ? 'Oefen dagelijks om je snelheid te verbeteren. Begin met de home row.' : 'Practice daily to improve your speed. Start with the home row.'
			});
		}
		if (averageAccuracy >= 95 && averageWpm >= 40) {
			result.push({
				icon: 'fa-solid fa-star',
				text: nl ? 'Uitstekend! Probeer moeilijkere lessen of verhoog je snelheid.' : 'Excellent! Try harder lessons or push your speed further.'
			});
		}
		if (result.length === 0) {
			result.push({
				icon: 'fa-solid fa-lightbulb',
				text: nl ? 'Begin met oefenen om gepersonaliseerde tips te ontvangen.' : 'Start practicing to receive personalized tips.'
			});
		}
		return result;
	})());
</script>

<div class="flex w-full flex-col gap-6">
	<h3 class="text-center text-xs font-black uppercase tracking-[0.2em] opacity-40">
		{$settings.language === 'nl' ? 'Verbeterpunten' : 'Suggestions'}
	</h3>

	<div class="flex flex-col gap-2">
		{#each tips as tip}
			<div
				class="flex items-start gap-3 rounded-lg px-4 py-3"
				style="background-color: var(--surface); border: 1px solid var(--border);"
			>
				<i class="{tip.icon} mt-0.5" style="color: var(--accent);"></i>
				<span class="text-sm" style="color: var(--text-secondary);">{tip.text}</span>
			</div>
		{/each}
	</div>
</div>
