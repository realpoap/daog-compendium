import { useCharacterForm } from '@/store/characterContext';
import { cn } from '@/utils/classNames';
import { CharacterSkill } from '@api/lib/ZodCharacter';
import { useRef } from 'react';

const BourguignonFormBlock = () => {
	const { methods, formData, setFormData } = useCharacterForm();
	const selectedSub = methods.getValues('bio.subspecies');

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
	return (
		<fieldset className='w-full sm:w-1/2'>
			{selectedSub === 'bourguignon' && (
				<fieldset className='flex flex-col'>
					<label className='fieldset-legend label font-cabin text-neutral-content mb-1 pb-0 text-xs capitalize'>
						Specificities
					</label>{' '}
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
		</fieldset>
	);
};

export default BourguignonFormBlock;
