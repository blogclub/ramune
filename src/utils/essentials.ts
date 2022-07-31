// Types
import type { Range } from "@typings/main";

export function formatTimestamp (timestamp: number): string {

	if (isNaN(timestamp) || timestamp === 0) return "0:00";

	let _timestamp = timestamp;

	const hours = Math.floor(_timestamp / 3600);

	_timestamp -= hours * 3600;

	const minutes = Math.floor(_timestamp / 60);

	_timestamp -= minutes * 60;

	const seconds = Math.floor(_timestamp);

	return `${hours > 0 ? `${hours}:` : ""}${(hours > 0 && minutes < 10) ? "0" : ""}${minutes}:${seconds > 9 ? "" : 0}${seconds}`;
}

export function convertTimestampToSeconds (timestamp: string): number {

	let time = 0;

	timestamp.split(":").reverse().forEach((num, index) => {

		const _num = Number(num);

		if (!isNaN(_num)) {
			time += _num * Math.pow(60, index);
		}
	});

	return time;
}

export function getRandomNumberFromRange (range: Range): number {
	return (Math.random() * (range[1] - range[0])) + range[0];
}

// https://stackoverflow.com/a/44134328
export function hslToHex (hsl: string): string {

	const match = hsl.match(/hsl\((\d+?), (\d+?)%, (\d+?)%\)/i);

	if (!match) {
		throw Error("Invalid HSL value");
	}

	const
		h = Number(match[1]),
		s = Number(match[2]),
		l = Number(match[3]) / 100;

	if (isNaN(h) || isNaN(s) || isNaN(l)) {
		throw Error("Invalid HSL value");
	}

	const a = s * Math.min(l, 1 - l) / 100;

	const f = (n: number): string => {

		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

		return Math.round(255 * color).toString(16).padStart(2, "0");
	};

	return `#${f(0)}${f(8)}${f(4)}`;
}