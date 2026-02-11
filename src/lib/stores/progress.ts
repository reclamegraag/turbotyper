import { writable } from 'svelte/store';
import { storage } from '$lib/utils/storage';

export interface UserProgress {
	currentLesson: number;
	completedLessons: number[];
	unlockedLevels: number;
	weakKeys: Record<string, number>;
	strongKeys: Record<string, number>;
}

const STORAGE_KEY = 'turbotyper-progress';

const defaults: UserProgress = {
	currentLesson: 1,
	completedLessons: [],
	unlockedLevels: 1,
	weakKeys: {},
	strongKeys: {}
};

function createProgressStore() {
	const initial = storage.get<UserProgress>(STORAGE_KEY, defaults);
	const { subscribe, set, update } = writable<UserProgress>(initial);

	return {
		subscribe,
		set(value: UserProgress) {
			storage.set(STORAGE_KEY, value);
			set(value);
		},
		update(fn: (p: UserProgress) => UserProgress) {
			update((current) => {
				const next = fn(current);
				storage.set(STORAGE_KEY, next);
				return next;
			});
		},
		reset() {
			set(defaults);
			storage.set(STORAGE_KEY, defaults);
		}
	};
}

export const progress = createProgressStore();
