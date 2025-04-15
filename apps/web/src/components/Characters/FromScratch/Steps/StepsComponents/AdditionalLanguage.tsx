import { useCharacterForm } from '@/store/characterContext';
import { cn } from '@/utils/classNames';
import { LanguageEnum, SpecificLanguage } from '@api/lib/ZodCharacter';
import { SetStateAction, useEffect, useState } from 'react';

type LanguageOption = { label: string; value: LanguageEnum | string };

type Props = {
	title: string;
	mastery: number;
	list: LanguageOption[];
	label: string;
	currentSpeaks: SpecificLanguage[] | undefined;
	setCurrentSpeaks: React.Dispatch<SetStateAction<SpecificLanguage[]>>;
};

const AdditionalLanguage = ({
	title,
	mastery,
	list,
	label,
	currentSpeaks,
	setCurrentSpeaks,
}: Props) => {
	const { methods } = useCharacterForm();
	const [current, setCurrent] = useState<LanguageOption>();
	//const [filteredList, setFilteredList] = useState<LanguageOption[]>(list);

	// Set current based on currentSpeaks
	useEffect(() => {
		if (!currentSpeaks || !list) return;

		//console.log('🔍 currentSpeaks:', currentSpeaks);
		//console.log('🔍 label to find:', label);

		const currentSelection = currentSpeaks.find(lang => lang.label === label);
		//console.log('✔ currentSelection:', currentSelection);

		if (currentSelection) {
			const currentOption = list.find(
				opt => opt.value === currentSelection.language,
			);
			//console.log('✔ matching option:', currentOption);

			if (currentOption) {
				setCurrent(currentOption);
			}
		}
	}, [currentSpeaks, label, list]);

	// Additional Language select logic
	const handleLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.stopPropagation();
		const value = e.target.value;
		const languageObject = {
			language: value as LanguageEnum,
			mastery: mastery,
			label: label,
		};
		if (currentSpeaks) {
			const filteredSpeaks = currentSpeaks.filter(
				speak => speak.label !== label,
			);
			const updatedSpeaks = [...filteredSpeaks, languageObject];
			methods.setValue('specifics.speaks', updatedSpeaks);
			setCurrentSpeaks(updatedSpeaks);

			const newCurrent = list.find(s => s.value === value);
			setCurrent(newCurrent);
		}
	};

	return (
		<div className='w-full sm:w-1/2'>
			<label className='fieldset-legend label font-cabin text-neutral-content mb-1 pb-0 text-xs capitalize'>
				{title}
			</label>{' '}
			<select
				value={current?.value || ''}
				className={cn(
					'select *:font-cabin select-bordered font-cabin text-error text-md text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary peer-default:dark:text-neutral h-8 min-h-6 w-full rounded-md px-2 py-0 capitalize shadow-sm focus:outline-none focus:ring-1 dark:bg-stone-700',
				)}
				onChange={e => handleLanguageSelect(e)}
			>
				{' '}
				<option
					value={''}
					disabled={!current}
				>
					{current?.label || 'Pick a language'}
				</option>
				{list
					.filter(s => {
						if (s.value !== current?.value) {
							return true;
						}
					})
					.map(option => (
						<option
							key={`${option.value}-${title}`}
							value={option.value}
							className='font-cabin capitalize'
						>
							{option.label}
						</option>
					))}
			</select>
		</div>
	);
};

export default AdditionalLanguage;
