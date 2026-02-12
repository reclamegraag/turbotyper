<script lang="ts">
	import '../app.css';
	import { settings } from '$lib/stores/settings';
	import { applyTheme } from '$lib/utils/theme';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import XpBar from '$lib/components/gamification/XpBar.svelte';

	let { children } = $props();

	onMount(() => {
		const unsubscribe = settings.subscribe((s) => {
			applyTheme(s.theme);
		});
		return unsubscribe;
	});

	const navItems = [
		{ href: '/', label: 'Home', icon: 'fa-solid fa-house' },
		{ href: '/lessons', label: 'Lessen', icon: 'fa-solid fa-graduation-cap' },
		{ href: '/dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-line' },
		{ href: '/settings', label: 'Instellingen', icon: 'fa-solid fa-gear' }
	];
</script>

<div class="flex min-h-screen flex-col" style="background-color: var(--bg-primary); color: var(--text-primary);">
	<nav class="flex items-center justify-between px-6 py-6" style="background-color: var(--bg-secondary); border-bottom: 1px solid var(--border);">
		<a href="/" class="font-mono text-xl font-bold tracking-tight" style="color: var(--accent); text-decoration: none;">
			TurboTyper
		</a>
		<div class="flex items-center gap-10">
			{#each navItems as item}
				<a
					href={item.href}
					class="flex items-center gap-3 text-sm font-medium transition-colors duration-200"
					style="color: {$page.url.pathname === item.href ? 'var(--accent)' : 'var(--text-secondary)'}; text-decoration: none;"
				>
					<i class={item.icon}></i>
					{item.label}
				</a>
			{/each}
			<div class="h-4 w-px" style="background-color: var(--border);"></div>
			<XpBar />
		</div>
	</nav>

	<main class="flex flex-1 flex-col px-6">
		{@render children()}
	</main>
</div>
