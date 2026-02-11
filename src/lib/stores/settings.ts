import { writable } from 'svelte/store';
import { storage } from '$lib/utils/storage';
import { applyTheme, type ThemeName } from '$lib/utils/theme';

export interface Settings {
	theme: ThemeName;
	language: 'nl' | 'en';
	showKeyboard: boolean;
	showHands: boolean;
}

const STORAGE_KEY = 'turbotyper-settings';

const defaults: Settings = {
	theme: 'dark',
	language: 'nl',
	showKeyboard: true,
	showHands: true
};

function createSettingsStore() {
	const initial = storage.get<Settings>(STORAGE_KEY, defaults);
	const { subscribe, set, update } = writable<Settings>(initial);

	return {
		subscribe,
		set(value: Settings) {
			storage.set(STORAGE_KEY, value);
			applyTheme(value.theme);
			set(value);
		},
		update(fn: (s: Settings) => Settings) {
			update((current) => {
				const next = fn(current);
				storage.set(STORAGE_KEY, next);
				applyTheme(next.theme);
				return next;
			});
		},
		setTheme(theme: ThemeName) {
			this.update((s) => ({ ...s, theme }));
		},
		setLanguage(language: 'nl' | 'en') {
			this.update((s) => ({ ...s, language }));
		},
		toggleKeyboard() {
			this.update((s) => ({ ...s, showKeyboard: !s.showKeyboard }));
		},
		toggleHands() {
			this.update((s) => ({ ...s, showHands: !s.showHands }));
		}
	};
}

export const settings = createSettingsStore();
