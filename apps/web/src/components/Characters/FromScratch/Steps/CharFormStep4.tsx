import { useCharacterForm } from '@/store/characterContext';

import {
	languageOptions,
	obscureLanguageOptions,
	spokenLanguageOptions,
} from '@/types/characterOptions';
import { cn } from '@/utils/classNames';
import {
	CharacterSkill,
	LanguageEnum,
	SpecificLanguage,
} from '@api/lib/ZodCharacter';
import { useEffect, useMemo, useRef, useState } from 'react';
import { allSpecies } from 'src/data/speciesProfile';
import AdditionalLanguage from './StepsComponents/AdditionalLanguage';

type LanguageOption = { label: string; value: LanguageEnum | string };

const CharFormStep4 = () => {
	const { methods, formData, setFormData } = useCharacterForm();
	const selectedSub = methods.getValues('bio.subspecies');
	//const [specificities, setSpecificities] = useState({});
	const [prunedList, setPrunedList] =
		useState<LanguageOption[]>(languageOptions);
	const [currentSpeaks, setCurrentSpeaks] = useState<SpecificLanguage[]>(
		formData.specifics?.speaks ?? [],
	);
	// Store original skills at first render
	const originSkillsRef = useRef<CharacterSkill[]>(formData.path?.skills ?? []);
	const originSkills = originSkillsRef.current;

	const lettersSkill = {
		id: 'lecture-ecriture-153',
		name: 'Letters',
		mastery: 'knowledge',
		stat: 'éru',
		description:
			'The fundamental skills of interpreting written language and forming written text.',
		playerLevel: 1,
		playerPoints: 0,
	};
	const bowSkill = {
		id: 'arc-183',
		name: 'Bow',
		mastery: 'ranged',
		stat: 'cha',
		description:
			'Using a weapon is essential for an adventurer. Skill in using a flexible weapon that shoots arrows.',
		playerLevel: 1,
		playerPoints: 0,
	};

	//const [skillChoices, setSkillChoices] = useState<CharacterSkill[]>([]);

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

	useEffect(() => {
		methods.setValue('path.skills', formData.path?.skills);
	}, [formData.path?.skills]);

	// Memoize species data
	const selectSpecies = useMemo(
		() => allSpecies.find(specie => specie.sub === selectedSub),
		[selectedSub],
	);
	const speciesLanguageOptions = useMemo(
		() => selectSpecies?.languages || [],
		[selectSpecies],
	);

	// Species specificities assessment
	// switch (selectedSub) {
	// 	case 'bourguignon':
	// 		if (toggle) toggle.indeterminate = true;
	// 		setSpecificities({ number: 1, mastery: 'art' });
	// 		break;
	// 	case 'pipourray':
	// 		setSpecificities({ number: 2, mastery: 'art' });
	// 		break;

	// 	default:
	// 		break;
	// }
	const handleBourguignonSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!selectedSub || selectedSub !== 'bourguignon') return;

		const choice = e.target.value;
		const skillToAdd = choice === 'eru' ? lettersSkill : bowSkill;
		const skillToRemove = choice === 'eru' ? bowSkill : lettersSkill;

		// Clone current skills to avoid direct mutation
		const updatedSkills = [...originSkills];

		// Handle removal or reduction
		const removeIndex = updatedSkills.findIndex(s => s.id === skillToRemove.id);
		if (removeIndex !== -1) {
			const existing = updatedSkills[removeIndex];
			const isInOrigin = originSkills.some(s => s.id === existing.id);
			console.warn(isInOrigin);
			if (existing.playerPoints && existing.playerPoints > 0) {
				updatedSkills[removeIndex] = {
					...existing,
					playerPoints: existing.playerPoints - 1,
				};
			} else if (!isInOrigin) {
				// Remove if not in origin and has no points
				updatedSkills.splice(removeIndex, 1);
			}
		}

		// Handle addition or increment
		const addIndex = updatedSkills.findIndex(s => s.id === skillToAdd.id);
		if (addIndex !== -1) {
			updatedSkills[addIndex] = {
				...updatedSkills[addIndex],
				playerPoints: (updatedSkills[addIndex].playerPoints || 0) + 1,
			};
		} else {
			updatedSkills.push({ ...skillToAdd, playerPoints: 0 });
		}
		console.dir(updatedSkills);
		// Update formData safely
		setFormData(prev => ({
			...prev,
			path: {
				...prev.path,
				skills: updatedSkills,
			},
		}));
	};
	if (!languageOptions) return;

	return (
		<>
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

			<fieldset className='w-full sm:w-1/2'>
				<label className='fieldset-legend label font-cabin text-neutral-content mb-1 pb-0 text-xs capitalize'>
					Specificities
				</label>{' '}
				{selectedSub === 'bourguignon' && (
					<fieldset className='flex flex-col'>
						<label>Enseignement cloisonné</label>
						<div className='flex flex-row gap-4'>
							<label className={cn('checked:text-primary text-base-content')}>
								<input
									type='radio'
									name='bourguignon-toggle'
									className='radio checked:text-primary peer mr-2'
									value={'cha'}
									onChange={e => handleBourguignonSelect(e)}
								/>
								Charisme
							</label>
							<label className={cn('checked:text-primary text-base-content')}>
								<input
									type='radio'
									name='bourguignon-toggle'
									className='radio checked:text-primary peer mr-2'
									value={'eru'}
									onChange={e => handleBourguignonSelect(e)}
								/>
								Erudition
							</label>
						</div>
					</fieldset>
				)}
				<div className='transition-all duration-300'>
					{formData.path?.skills?.map(skill => (
						<div
							key={skill.id}
							className='flex items-center justify-between rounded border-b p-2 hover:bg-stone-800'
						>
							<span className='text-base font-semibold'>{skill.name}</span>
							<span className='badge badge-accent'>
								{skill.playerPoints} pts
							</span>
						</div>
					))}
				</div>
			</fieldset>
		</>
	);
};

export default CharFormStep4;
