import { useCharacterForm } from '@/store/characterContext';
import { cn } from '@/utils/classNames';

import { allSpecies } from 'src/data/speciesProfile';

const CharFormStep4 = () => {
	const { methods, formData } = useCharacterForm();
	const selectedSub = methods.getValues('bio.subspecies');
	const selectedSpeaks = formData.specifics?.speaks || [];

	const handleLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		methods.setValue('specifics.speaks', []);
		const value = e.target.value;
		const object = { language: value, mastery: 1 };
		console.log(object);
		methods.setValue('specifics.speaks', [...selectedSpeaks, object]);
	};
	const selectSpecies = allSpecies.find(specie => specie.sub === selectedSub);
	const languageOptions = selectSpecies?.languages;

	if (!languageOptions) return;
	return (
		<fieldset className='w-full sm:w-1/2'>
			<legend className='fieldset-legend label font-cabin text-neutral-content mb-1 pb-0 text-xs capitalize'>
				Language
			</legend>{' '}
			<select
				defaultValue='Pick a language'
				className={cn(
					'select select-bordered font-cabin text-error text-md text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary peer-default:dark:text-neutral h-8 min-h-6 w-full rounded-md px-2 py-0 shadow-sm focus:outline-none focus:ring-1 dark:bg-stone-700',
				)}
				onChange={e => handleLanguageSelect(e)}
			>
				{' '}
				<option disabled={true}>Pick a language</option>
				{languageOptions.map(option => (
					<option
						key={`${option.value}-choice`}
						value={option.value}
					>
						{option.label}
					</option>
				))}
			</select>
		</fieldset>
	);
};

export default CharFormStep4;
