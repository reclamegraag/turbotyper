import { getLessonById, isLessonUnlocked, type Lesson } from '$lib/data/lessons';
import type { TypingEngineState } from '$lib/engine/typing-engine';

export interface LessonResult {
	lessonId: number;
	passed: boolean;
	wpm: number;
	accuracy: number;
}

const PASS_ACCURACY = 90;

export function evaluateLesson(lessonId: number, state: TypingEngineState): LessonResult {
	return {
		lessonId,
		passed: state.accuracy >= PASS_ACCURACY,
		wpm: state.wpm,
		accuracy: state.accuracy
	};
}

export function getNextLesson(completedLessons: number[]): Lesson | undefined {
	const maxCompleted = completedLessons.length > 0 ? Math.max(...completedLessons) : 0;
	const nextId = maxCompleted + 1;
	const lesson = getLessonById(nextId);
	if (lesson && isLessonUnlocked(nextId, completedLessons)) {
		return lesson;
	}
	return undefined;
}

export function getLessonProgress(completedLessons: number[], totalLessons: number): number {
	return Math.round((completedLessons.length / totalLessons) * 100);
}
