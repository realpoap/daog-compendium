import { allSpecies } from '@/data/speciesProfile';
import { useCharacterForm } from '@/store/characterContext';
import {
	languageOptions,
	obscureLanguageOptions,
	spokenLanguageOptions,
} from '@/types/characterOptions';
import { LanguageEnum, SpecificLanguage } from '@api/lib/ZodCharacter';
import { useEffect, useMemo, useState } from 'react';
import AdditionalLanguage from '../AdditionalLanguage';

type LanguageOption = { label: string; value: LanguageEnum | string };

const LanguagesFormBlock = () => {
	const { methods, formData } = useCharacterForm();
	const selectedSub = methods.getValues('bio.subspecies');
	const [prunedList, setPrunedList] =
		useState<LanguageOption[]>(languageOptions);
	const [currentSpeaks, setCurrentSpeaks] = useState<SpecificLanguage[]>(
		formData.specifics?.speaks ?? [],
	);
	// Avoid calling setValue directly in render
	useEffect(() => {
		methods.setValue('specifics.speaks', formData.specifics?.speaks || []);
	}, [methods]);

	useEffect(() => {
		if (!currentSpeaks) return;
		const selectedLanguages = new Set(currentSpeaks.map(lang => lang.language));

		// Filter the language options, removing already selected languages

		const filtered = languageOptions.filter(
			speak => !selectedLanguages.has(speak.value as LanguageEnum),
		);
		setPrunedList(filtered);
	}, [currentSpeaks]);
	// Memoize species data
	const selectSpecies = useMemo(
		() => allSpecies.find(specie => specie.sub === selectedSub),
		[selectedSub],
	);
	const speciesLanguageOptions = useMemo(
		() => selectSpecies?.languages || [],
		[selectSpecies],
	);

	if (!languageOptions) return;
	return (
		<fieldset className='w-full items-center'>
			<legend>Languages</legend>
			<div className='flex w-full flex-col gap-4 sm:flex-row'>
				{speciesLanguageOptions && (
					<AdditionalLanguage
						title='Species language'
						mastery={1}
						list={speciesLanguageOptions}
						label='tertiary'
						currentSpeaks={currentSpeaks}
						setCurrentSpeaks={setCurrentSpeaks}
					/>
				)}
				{selectedSub === 'moufflian' && (
					<AdditionalLanguage
						title='Cosmopolite language'
						mastery={1}
						list={prunedList.filter(speak =>
							spokenLanguageOptions.some(s => s.value === speak.value),
						)}
						label='moufflian'
						currentSpeaks={currentSpeaks}
						setCurrentSpeaks={setCurrentSpeaks}
					/>
				)}

				{methods
					.getValues('path.attributes')
					?.find(attr => attr.name === 'Polyglot') && (
					<AdditionalLanguage
						title='+ Spoken language'
						mastery={1}
						list={prunedList.filter(speak =>
							spokenLanguageOptions.some(s => s.value === speak.value),
						)}
						label='spoken'
						currentSpeaks={currentSpeaks}
						setCurrentSpeaks={setCurrentSpeaks}
					/>
				)}
				{methods
					.getValues('path.attributes')
					?.find(attr => attr.name === 'Scholar') && (
					<AdditionalLanguage
						title='+ Scholar language'
						mastery={1}
						list={prunedList.filter(speak =>
							obscureLanguageOptions.some(s => s.value === speak.value),
						)}
						label='scholar'
						currentSpeaks={currentSpeaks}
						setCurrentSpeaks={setCurrentSpeaks}
					/>
				)}
			</div>
		</fieldset>
	);
};

export default LanguagesFormBlock;
