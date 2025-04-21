import { skillsData } from '@/data/skillsData';
import { useCharacterForm } from '@/store/characterContext';
import { cn } from '@/utils/classNames';
import { useEffect, useState } from 'react';
import BourguignonFormBlock from './StepsComponents/Blocks/BourguignonFormBlock';
import LanguagesFormBlock from './StepsComponents/Blocks/LanguagesFormBlock';

const CharFormStep4 = () => {
	const { methods, formData, setFormData } = useCharacterForm();
	const selectedSub = methods.getValues('bio.subspecies');
	const [specificities, setSpecificities] = useState('');
	const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
	const [needsSkills, setNeedsSkills] = useState(false);

	useEffect(() => {
		methods.setValue('path.skills', formData.path?.skills);
	}, [formData.path?.skills]);

	useEffect(() => {
		if (!selectedSub) return;
		// Species specificities assessment
		switch (selectedSub) {
			case 'bourguignon':
				setNeedsSkills(true);
				break;
			case 'pipourray':
				setNeedsSkills(true);
				setSpecificities('crafting');
				break;
			case 'villous':
				setNeedsSkills(true);

				setSpecificities('fighting');
				break;
			case 'barbarian':
				setNeedsSkills(true);

				setSpecificities('fighting');
				break;
			case 'troll':
				setNeedsSkills(true);

				setSpecificities('survival');
				break;

			default:
				break;
		}
	}, [selectedSub]);

	const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSkillId = e.target.value;
		const originSkills = formData.path?.skills || [];
		const updatedSkills = [...originSkills];

		// If a skill was previously selected, handle its removal or decrement
		if (selectedSkillId && selectedSkillId !== newSkillId) {
			const prevIndex = updatedSkills.findIndex(s => s.id === selectedSkillId);
			updatedSkills.splice(prevIndex, 1);
		}
		// Handle adding or incrementing the new selected skill
		const selectedSkill = skillsData.find(s => s.id === newSkillId);
		if (!selectedSkill) return;

		updatedSkills.push({ ...selectedSkill, playerLevel: 1, playerPoints: 0 });

		// Update the form data and selection state
		setFormData(prev => ({
			...prev,
			path: {
				...prev.path,
				skills: updatedSkills,
			},
		}));
		setSelectedSkillId(newSkillId);
	};

	return (
		<>
			<LanguagesFormBlock />
			<h3 className=''>Specificities</h3>
			{selectedSub === 'bourguignon' && <BourguignonFormBlock />}
			{needsSkills && (
				<fieldset className='w-full items-center'>
					<label className='fieldset-legend label font-cabin text-neutral-content mb-1 pb-0 text-xs capitalize'>
						Species skill choice
					</label>{' '}
					{specificities && (
						<select
							onChange={handleSkillSelect}
							value='' // Always reset to placeholder after each select
							className={cn(
								'select *:font-cabin select-bordered font-cabin text-error text-md text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary peer-default:dark:text-neutral h-8 min-h-6 w-full rounded-md px-2 py-0 capitalize shadow-sm focus:outline-none focus:ring-1 dark:bg-stone-700',
							)}
						>
							<option
								disabled
								value=''
							>
								Choose a skill
							</option>
							{skillsData
								.filter(skill => skill.mastery === specificities)
								.map(skill => (
									<option
										key={skill.id}
										value={skill.id}
									>
										{skill.name}
									</option>
								))}
						</select>
					)}
				</fieldset>
			)}
			{/* ------------------------- */}

			{needsSkills && (
				<div className='w-full transition-all duration-300'>
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
			)}
		</>
	);
};

export default CharFormStep4;
