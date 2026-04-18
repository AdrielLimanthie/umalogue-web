export function starString(n: number) {
	if (n > 3) {
		return `${n}★`;
	}
	return "★".repeat(n);
}
