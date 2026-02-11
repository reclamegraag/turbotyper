export interface TypingEngineState {
	text: string;
	input: string;
	cursorPosition: number;
	isActive: boolean;
	isComplete: boolean;
	startTime: number | null;
	endTime: number | null;
	wpm: number;
	accuracy: number;
	errors: number;
	correctChars: number;
	totalKeystrokes: number;
	keyErrors: Record<string, number>;
}

export function createInitialState(text: string): TypingEngineState {
	return {
		text,
		input: '',
		cursorPosition: 0,
		isActive: false,
		isComplete: false,
		startTime: null,
		endTime: null,
		wpm: 0,
		accuracy: 100,
		errors: 0,
		correctChars: 0,
		totalKeystrokes: 0,
		keyErrors: {}
	};
}

export function processKeystroke(
	state: TypingEngineState,
	key: string
): TypingEngineState {
	if (state.isComplete) return state;

	const now = Date.now();
	const next = { ...state };

	if (!next.isActive) {
		next.isActive = true;
		next.startTime = now;
	}

	if (key === 'Backspace') {
		if (next.input.length > 0) {
			next.input = next.input.slice(0, -1);
			next.cursorPosition = Math.max(0, next.cursorPosition - 1);
		}
		return next;
	}

	if (key.length !== 1) return state;

	next.totalKeystrokes++;
	next.input += key;
	next.cursorPosition = next.input.length;

	const expectedChar = next.text[next.cursorPosition - 1];
	if (key === expectedChar) {
		next.correctChars++;
	} else {
		next.errors++;
		const errorKey = expectedChar ?? key;
		next.keyErrors = { ...next.keyErrors };
		next.keyErrors[errorKey] = (next.keyErrors[errorKey] ?? 0) + 1;
	}

	next.accuracy = calculateAccuracy(next.correctChars, next.totalKeystrokes);
	next.wpm = calculateWpm(next.correctChars, next.startTime, now);

	if (next.cursorPosition >= next.text.length) {
		next.isComplete = true;
		next.isActive = false;
		next.endTime = now;
	}

	return next;
}

export function calculateWpm(
	correctChars: number,
	startTime: number | null,
	currentTime: number
): number {
	if (!startTime) return 0;
	const elapsedMinutes = (currentTime - startTime) / 60000;
	if (elapsedMinutes <= 0) return 0;
	const words = correctChars / 5;
	return Math.round(words / elapsedMinutes);
}

export function calculateAccuracy(correct: number, total: number): number {
	if (total === 0) return 100;
	return Math.round((correct / total) * 100);
}

export function getCharStatus(
	text: string,
	input: string,
	index: number
): 'correct' | 'incorrect' | 'pending' | 'cursor' {
	if (index >= input.length) return index === input.length ? 'cursor' : 'pending';
	return input[index] === text[index] ? 'correct' : 'incorrect';
}

export function getElapsedSeconds(startTime: number | null): number {
	if (!startTime) return 0;
	return Math.floor((Date.now() - startTime) / 1000);
}
