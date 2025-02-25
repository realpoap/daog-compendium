export function capitalizeFirstLetter(string: string) {
	if (string === '') return '';
	return [...string][0].toUpperCase() + [...string].slice(1).join('');
}
