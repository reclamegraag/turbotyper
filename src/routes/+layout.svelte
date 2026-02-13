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

	const navItems = $derived([
		{ href: '/', label: 'Home', icon: 'fa-solid fa-house' },
		{ href: '/lessons', label: $settings.language === 'nl' ? 'Lessen' : 'Lessons', icon: 'fa-solid fa-graduation-cap' },
		{ href: '/dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-line' },
		{ href: '/settings', label: $settings.language === 'nl' ? 'Instellingen' : 'Settings', icon: 'fa-solid fa-gear' }
	]);
</script>

<div class="flex min-h-screen flex-col" style="background-color: var(--bg-primary); color: var(--text-primary);">
	<nav
		class="sticky top-0 z-50 w-full border-b backdrop-blur-md"
		style="background-color: var(--bg-secondary); border-color: var(--border);"
	>
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
			<a
				href="/"
				class="font-mono text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
				style="color: var(--accent); text-decoration: none;"
			>
				TurboTyper
			</a>
			<div class="flex items-center gap-8">
				<div class="hidden items-center gap-8 md:flex">
					{#each navItems as item}
						<a
							href={item.href}
							class="flex items-center gap-2.5 text-sm font-semibold transition-colors duration-200 hover:text-[var(--accent)]"
							style="color: {$page.url.pathname === item.href ? 'var(--accent)' : 'var(--text-secondary)'}; text-decoration: none;"
						>
							<i class="{item.icon} opacity-80"></i>
							{item.label}
						</a>
					{/each}
				</div>
				<div class="hidden h-5 w-px md:block" style="background-color: var(--border);"></div>
				<XpBar />
			</div>
		</div>
	</nav>

	<main class="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 py-8 md:py-16 lg:px-8">
		<div class="w-full flex flex-col items-center">
			{@render children()}
		</div>
	</main>
</div>
