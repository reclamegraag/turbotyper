import { writable } from 'svelte/store';

export interface TypingState {
	text: string;
	input: string;
	cursorPosition: number;
	isActive: boolean;
	startTime: number | null;
	wpm: number;
	accuracy: number;
	errors: number;
	totalKeystrokes: number;
}

const defaults: TypingState = {
	text: '',
	input: '',
	cursorPosition: 0,
	isActive: false,
	startTime: null,
	wpm: 0,
	accuracy: 100,
	errors: 0,
	totalKeystrokes: 0
};

export const typing = writable<TypingState>(defaults);
