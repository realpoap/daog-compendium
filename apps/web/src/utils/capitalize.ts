export function capitalizeFirstLetter(string: string) {
	if (string === '' || string === null || string === undefined) return '';
	return [...string][0].toUpperCase() + [...string].slice(1).join('');
}
