<script lang="ts">
	import { settings } from '$lib/stores/settings';
	import { themes, type ThemeName } from '$lib/utils/theme';

	const themeLabels: Record<ThemeName, string> = {
		dark: 'Dark',
		light: 'Light',
		midnight: 'Midnight',
		sepia: 'Sepia',
		matrix: 'Matrix'
	};

	const themeAccents: Record<ThemeName, string> = {
		dark: '#e94560',
		light: '#2563eb',
		midnight: '#ff8906',
		sepia: '#8b4513',
		matrix: '#00ff41'
	};

	const themeBgs: Record<ThemeName, string> = {
		dark: '#1a1a2e',
		light: '#fafafa',
		midnight: '#0f0e17',
		sepia: '#f4ecd8',
		matrix: '#0a0a0a'
	};
</script>

<div class="mx-auto flex w-full max-w-4xl flex-col gap-16 py-8">
	<div class="flex flex-col items-center gap-4 text-center">
		<h1 class="text-5xl font-extrabold tracking-tight">{$settings.language === 'nl' ? 'Instellingen' : 'Settings'}</h1>
		<p class="text-xs font-black uppercase tracking-[0.3em] opacity-30">Configureer jouw ervaring</p>
	</div>

	<section class="flex flex-col items-center gap-8">
		<h2 class="text-center text-xs font-black uppercase tracking-[0.2em] opacity-40">{$settings.language === 'nl' ? 'Thema' : 'Theme'}</h2>
		<div class="grid w-full grid-cols-2 gap-4 md:grid-cols-5">
			{#each themes as theme}
				<button
					onclick={() => settings.setTheme(theme)}
					class="group flex flex-col items-center gap-4 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02]"
					style="
						background-color: {themeBgs[theme]};
						border: 3px solid {$settings.theme === theme ? themeAccents[theme] : 'transparent'};
						cursor: pointer;
						box-shadow: {$settings.theme === theme ? `0 0 20px -5px ${themeAccents[theme]}` : '0 4px 10px -5px rgba(0,0,0,0.3)'};
					"
				>
					<div
						class="h-8 w-8 rounded-full shadow-inner transition-transform duration-500 group-hover:rotate-45"
						style="background-color: {themeAccents[theme]};"
					></div>
					<span
						class="text-xs font-black uppercase tracking-widest"
						style="color: {theme === 'light' || theme === 'sepia' ? '#333' : '#ccc'};"
					>
						{themeLabels[theme]}
					</span>
				</button>
			{/each}
		</div>
	</section>

	<div class="grid w-full grid-cols-1 gap-12 md:grid-cols-2">
		<section class="flex flex-col items-center gap-6">
			<h2 class="text-center text-xs font-black uppercase tracking-[0.2em] opacity-40">{$settings.language === 'nl' ? 'Taal' : 'Language'}</h2>
			<div class="flex w-full gap-4 max-w-sm">
				<button
					onclick={() => settings.setLanguage('nl')}
					class="flex-1 rounded-2xl px-6 py-4 text-sm font-bold transition-all duration-300 active:scale-95"
					style="
						background-color: {$settings.language === 'nl' ? 'var(--accent)' : 'var(--surface)'};
						color: {$settings.language === 'nl' ? 'var(--bg-primary)' : 'var(--text-secondary)'};
						border: 2px solid {$settings.language === 'nl' ? 'var(--accent)' : 'var(--border)'};
						cursor: pointer;
					"
				>
					Nederlands
				</button>
				<button
					onclick={() => settings.setLanguage('en')}
					class="flex-1 rounded-2xl px-6 py-4 text-sm font-bold transition-all duration-300 active:scale-95"
					style="
						background-color: {$settings.language === 'en' ? 'var(--accent)' : 'var(--surface)'};
						color: {$settings.language === 'en' ? 'var(--bg-primary)' : 'var(--text-secondary)'};
						border: 2px solid {$settings.language === 'en' ? 'var(--accent)' : 'var(--border)'};
						cursor: pointer;
					"
				>
					English
				</button>
			</div>
		</section>

		<section class="flex flex-col items-center gap-6">
			<h2 class="text-center text-xs font-black uppercase tracking-[0.2em] opacity-40">{$settings.language === 'nl' ? 'Voorkeuren' : 'Preferences'}</h2>
			<div class="flex w-full flex-col gap-4 max-w-sm">
				<label
					class="group flex cursor-pointer items-center justify-between rounded-2xl p-5 transition-all duration-300 hover:border-[var(--accent)]"
					style="background-color: var(--surface); border: 1px solid var(--border);"
				>
					<div class="flex items-center gap-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl opacity-80" style="background-color: color-mix(in srgb, var(--accent) 15%, transparent);">
							<i class="fa-solid fa-keyboard" style="color: var(--accent);"></i>
						</div>
						<span class="text-sm font-bold" style="color: var(--text-primary);">{$settings.language === 'nl' ? 'Toetsenbord tonen' : 'Show keyboard'}</span>
					</div>
					<input
						type="checkbox"
						checked={$settings.showKeyboard}
						onchange={() => settings.toggleKeyboard()}
						class="h-6 w-6 cursor-pointer rounded-lg accent-[var(--accent)]"
					/>
				</label>
				<label
					class="group flex cursor-pointer items-center justify-between rounded-2xl p-5 transition-all duration-300 hover:border-[var(--accent)]"
					style="background-color: var(--surface); border: 1px solid var(--border);"
				>
					<div class="flex items-center gap-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl opacity-80" style="background-color: color-mix(in srgb, var(--accent) 15%, transparent);">
							<i class="fa-solid fa-hand" style="color: var(--accent);"></i>
						</div>
						<span class="text-sm font-bold" style="color: var(--text-primary);">{$settings.language === 'nl' ? 'Handpositie tonen' : 'Show hand position'}</span>
					</div>
					<input
						type="checkbox"
						checked={$settings.showHands}
						onchange={() => settings.toggleHands()}
						class="h-6 w-6 cursor-pointer rounded-lg accent-[var(--accent)]"
					/>
				</label>
			</div>
		</section>
	</div>
</div>
