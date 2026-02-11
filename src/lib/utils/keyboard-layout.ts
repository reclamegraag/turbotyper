export type Finger =
	| 'left-pinky'
	| 'left-ring'
	| 'left-middle'
	| 'left-index'
	| 'right-index'
	| 'right-middle'
	| 'right-ring'
	| 'right-pinky'
	| 'thumb';

export type Hand = 'left' | 'right';

export interface KeyInfo {
	key: string;
	row: number;
	col: number;
	finger: Finger;
	hand: Hand;
	isHomeRow: boolean;
	width?: number;
}

const row0: KeyInfo[] = [
	{ key: '`', row: 0, col: 0, finger: 'left-pinky', hand: 'left', isHomeRow: false },
	{ key: '1', row: 0, col: 1, finger: 'left-pinky', hand: 'left', isHomeRow: false },
	{ key: '2', row: 0, col: 2, finger: 'left-ring', hand: 'left', isHomeRow: false },
	{ key: '3', row: 0, col: 3, finger: 'left-middle', hand: 'left', isHomeRow: false },
	{ key: '4', row: 0, col: 4, finger: 'left-index', hand: 'left', isHomeRow: false },
	{ key: '5', row: 0, col: 5, finger: 'left-index', hand: 'left', isHomeRow: false },
	{ key: '6', row: 0, col: 6, finger: 'right-index', hand: 'right', isHomeRow: false },
	{ key: '7', row: 0, col: 7, finger: 'right-index', hand: 'right', isHomeRow: false },
	{ key: '8', row: 0, col: 8, finger: 'right-middle', hand: 'right', isHomeRow: false },
	{ key: '9', row: 0, col: 9, finger: 'right-ring', hand: 'right', isHomeRow: false },
	{ key: '0', row: 0, col: 10, finger: 'right-pinky', hand: 'right', isHomeRow: false },
	{ key: '-', row: 0, col: 11, finger: 'right-pinky', hand: 'right', isHomeRow: false },
	{ key: '=', row: 0, col: 12, finger: 'right-pinky', hand: 'right', isHomeRow: false }
];

const row1: KeyInfo[] = [
	{ key: 'q', row: 1, col: 0, finger: 'left-pinky', hand: 'left', isHomeRow: false },
	{ key: 'w', row: 1, col: 1, finger: 'left-ring', hand: 'left', isHomeRow: false },
	{ key: 'e', row: 1, col: 2, finger: 'left-middle', hand: 'left', isHomeRow: false },
	{ key: 'r', row: 1, col: 3, finger: 'left-index', hand: 'left', isHomeRow: false },
	{ key: 't', row: 1, col: 4, finger: 'left-index', hand: 'left', isHomeRow: false },
	{ key: 'y', row: 1, col: 5, finger: 'right-index', hand: 'right', isHomeRow: false },
	{ key: 'u', row: 1, col: 6, finger: 'right-index', hand: 'right', isHomeRow: false },
	{ key: 'i', row: 1, col: 7, finger: 'right-middle', hand: 'right', isHomeRow: false },
	{ key: 'o', row: 1, col: 8, finger: 'right-ring', hand: 'right', isHomeRow: false },
	{ key: 'p', row: 1, col: 9, finger: 'right-pinky', hand: 'right', isHomeRow: false },
	{ key: '[', row: 1, col: 10, finger: 'right-pinky', hand: 'right', isHomeRow: false },
	{ key: ']', row: 1, col: 11, finger: 'right-pinky', hand: 'right', isHomeRow: false },
	{ key: '\\', row: 1, col: 12, finger: 'right-pinky', hand: 'right', isHomeRow: false }
];

const row2: KeyInfo[] = [
	{ key: 'a', row: 2, col: 0, finger: 'left-pinky', hand: 'left', isHomeRow: true },
	{ key: 's', row: 2, col: 1, finger: 'left-ring', hand: 'left', isHomeRow: true },
	{ key: 'd', row: 2, col: 2, finger: 'left-middle', hand: 'left', isHomeRow: true },
	{ key: 'f', row: 2, col: 3, finger: 'left-index', hand: 'left', isHomeRow: true },
	{ key: 'g', row: 2, col: 4, finger: 'left-index', hand: 'left', isHomeRow: true },
	{ key: 'h', row: 2, col: 5, finger: 'right-index', hand: 'right', isHomeRow: true },
	{ key: 'j', row: 2, col: 6, finger: 'right-index', hand: 'right', isHomeRow: true },
	{ key: 'k', row: 2, col: 7, finger: 'right-middle', hand: 'right', isHomeRow: true },
	{ key: 'l', row: 2, col: 8, finger: 'right-ring', hand: 'right', isHomeRow: true },
	{ key: ';', row: 2, col: 9, finger: 'right-pinky', hand: 'right', isHomeRow: true },
	{ key: "'", row: 2, col: 10, finger: 'right-pinky', hand: 'right', isHomeRow: true }
];

const row3: KeyInfo[] = [
	{ key: 'z', row: 3, col: 0, finger: 'left-pinky', hand: 'left', isHomeRow: false },
	{ key: 'x', row: 3, col: 1, finger: 'left-ring', hand: 'left', isHomeRow: false },
	{ key: 'c', row: 3, col: 2, finger: 'left-middle', hand: 'left', isHomeRow: false },
	{ key: 'v', row: 3, col: 3, finger: 'left-index', hand: 'left', isHomeRow: false },
	{ key: 'b', row: 3, col: 4, finger: 'left-index', hand: 'left', isHomeRow: false },
	{ key: 'n', row: 3, col: 5, finger: 'right-index', hand: 'right', isHomeRow: false },
	{ key: 'm', row: 3, col: 6, finger: 'right-index', hand: 'right', isHomeRow: false },
	{ key: ',', row: 3, col: 7, finger: 'right-middle', hand: 'right', isHomeRow: false },
	{ key: '.', row: 3, col: 8, finger: 'right-ring', hand: 'right', isHomeRow: false },
	{ key: '/', row: 3, col: 9, finger: 'right-pinky', hand: 'right', isHomeRow: false }
];

const spaceBar: KeyInfo = {
	key: ' ',
	row: 4,
	col: 0,
	finger: 'thumb',
	hand: 'right',
	isHomeRow: false,
	width: 6
};

export const keyboardRows: KeyInfo[][] = [row0, row1, row2, row3, [spaceBar]];

export const allKeys: KeyInfo[] = [...row0, ...row1, ...row2, ...row3, spaceBar];

const keyMap = new Map<string, KeyInfo>();
for (const keyInfo of allKeys) {
	keyMap.set(keyInfo.key, keyInfo);
}

export function getKeyInfo(key: string): KeyInfo | undefined {
	return keyMap.get(key.toLowerCase());
}

export function getFingerForKey(key: string): Finger | undefined {
	return keyMap.get(key.toLowerCase())?.finger;
}

export function getHomeRowKeys(): KeyInfo[] {
	return allKeys.filter((k) => k.isHomeRow);
}
