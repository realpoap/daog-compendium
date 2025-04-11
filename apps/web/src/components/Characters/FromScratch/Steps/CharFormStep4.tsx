import { cn } from '@/utils/classNames';

import { useFormContext, useWatch } from 'react-hook-form';
import { allSpecies, SpecieDataForm } from 'src/data/speciesProfile';

type Props = {
	selected: SpecieDataForm | undefined;
};

const CharFormStep4 = ({ selected }: Props) => {
	const { control, setValue } = useFormContext();
	const selectedSub = useWatch({ control, name: 'bio.subspecies' });
	const selectedSpeaks = selected?.specifics.speaks || [];

	const handleLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setValue('specifics.speaks', []);
		const value = e.target.value;
		const object = { language: value, mastery: 1 };
		setValue('specifics.speaks', [...selectedSpeaks, object]);
	};

	const selectSpecies = allSpecies.find(specie => specie.sub === selectedSub);

	const languageOptions = selectSpecies?.languages;

	if (!languageOptions) return;
	return (
		<fieldset className='w-full sm:w-1/2'>
			<legend className='fieldset-legend label font-cabin pb-1 text-xs capitalize text-stone-500'>
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
