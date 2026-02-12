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

<div class="mx-auto flex w-full max-w-2xl flex-col gap-10 px-20 py-12">
	<h1 class="text-3xl font-bold" style="color: var(--text-primary);">Instellingen</h1>

	<section class="flex flex-col gap-4">
		<h2 class="text-lg font-semibold" style="color: var(--text-secondary);">Thema</h2>
		<div class="grid grid-cols-5 gap-3">
			{#each themes as theme}
				<button
					onclick={() => settings.setTheme(theme)}
					class="flex flex-col items-center gap-2 rounded-lg p-4 transition-all duration-200"
					style="
						background-color: {themeBgs[theme]};
						border: 2px solid {$settings.theme === theme ? themeAccents[theme] : 'transparent'};
						cursor: pointer;
					"
				>
					<div
						class="h-4 w-4 rounded-full"
						style="background-color: {themeAccents[theme]};"
					></div>
					<span
						class="text-xs font-medium"
						style="color: {theme === 'light' || theme === 'sepia' ? '#333' : '#ccc'};"
					>
						{themeLabels[theme]}
					</span>
				</button>
			{/each}
		</div>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-lg font-semibold" style="color: var(--text-secondary);">Taal</h2>
		<div class="flex gap-3">
			<button
				onclick={() => settings.setLanguage('nl')}
				class="rounded-full text-sm font-medium transition-all duration-200"
				style="
					background-color: {$settings.language === 'nl' ? 'var(--accent)' : 'var(--surface)'};
					color: {$settings.language === 'nl' ? 'var(--bg-primary)' : 'var(--text-secondary)'};
					border: 1px solid {$settings.language === 'nl' ? 'var(--accent)' : 'var(--border)'};
					padding: 7px 20px;
					cursor: pointer;
				"
			>
				Nederlands
			</button>
			<button
				onclick={() => settings.setLanguage('en')}
				class="rounded-full text-sm font-medium transition-all duration-200"
				style="
					background-color: {$settings.language === 'en' ? 'var(--accent)' : 'var(--surface)'};
					color: {$settings.language === 'en' ? 'var(--bg-primary)' : 'var(--text-secondary)'};
					border: 1px solid {$settings.language === 'en' ? 'var(--accent)' : 'var(--border)'};
					padding: 7px 20px;
					cursor: pointer;
				"
			>
				English
			</button>
			<button
				onclick={() => settings.setLanguage('en')}
				class="rounded-full text-sm font-medium transition-all duration-200"
				style="
					background-color: {$settings.language === 'en' ? 'var(--accent)' : 'var(--surface)'};
					color: {$settings.language === 'en' ? 'var(--bg-primary)' : 'var(--text-secondary)'};
					border: 1px solid {$settings.language === 'en' ? 'var(--accent)' : 'var(--border)'};
					padding: 7px 20px;
					cursor: pointer;
				"
			>
				English
			</button>
		</div>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-lg font-semibold" style="color: var(--text-secondary);">Weergave</h2>
		<div class="flex flex-col gap-3">
			<label
				class="flex cursor-pointer items-center justify-between rounded-lg p-4"
				style="background-color: var(--surface); border: 1px solid var(--border);"
			>
				<div class="flex items-center gap-3">
					<i class="fa-solid fa-keyboard" style="color: var(--accent);"></i>
					<span class="text-sm" style="color: var(--text-primary);">Toetsenbord tonen</span>
				</div>
				<input
					type="checkbox"
					checked={$settings.showKeyboard}
					onchange={() => settings.toggleKeyboard()}
					class="h-5 w-5 accent-[var(--accent)]"
				/>
			</label>
			<label
				class="flex cursor-pointer items-center justify-between rounded-lg p-4"
				style="background-color: var(--surface); border: 1px solid var(--border);"
			>
				<div class="flex items-center gap-3">
					<i class="fa-solid fa-hand" style="color: var(--accent);"></i>
					<span class="text-sm" style="color: var(--text-primary);">Handpositie tonen</span>
				</div>
				<input
					type="checkbox"
					checked={$settings.showHands}
					onchange={() => settings.toggleHands()}
					class="h-5 w-5 accent-[var(--accent)]"
				/>
			</label>
		</div>
	</section>
</div>
