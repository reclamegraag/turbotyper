export const themes = ['dark', 'light', 'midnight', 'sepia', 'matrix'] as const;
export type ThemeName = (typeof themes)[number];

const STORAGE_KEY = 'turbotyper-theme';

export function applyTheme(theme: ThemeName): void {
	document.documentElement.setAttribute('data-theme', theme);
}

export function getStoredTheme(): ThemeName {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored && (themes as readonly string[]).includes(stored)) {
			return stored as ThemeName;
		}
	} catch {
		/* noop */
	}
	return 'dark';
}

export function storeTheme(theme: ThemeName): void {
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		/* noop */
	}
}
