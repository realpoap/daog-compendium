import { OriginCharacter, origins } from '@/data/origins'; // Importez les données typées
import { useCharacterForm } from '@/store/characterContext';
import { cn } from '@/utils/classNames';
import { deduplicateSkills, setObjectSkills } from '@/utils/objectSkills';
import { useState } from 'react';

const CharFormStep3 = () => {
	const { setFormData, formData } = useCharacterForm();
	const [selectedOrigin, setSelectedOrigin] = useState<OriginCharacter | null>(
		formData.path?.origin || null,
	);

	const handleOriginSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const name = e.target.value;
		const origin = origins.find(ori => ori.name === name);
		if (origin) {
			setSelectedOrigin(origin);
			const skillList = origin.skills;
			const objectSkills = setObjectSkills(skillList);
			const currentSkills = formData.path?.skills;
			if (currentSkills) objectSkills?.push(...currentSkills);
			const deduplicatedSkills = deduplicateSkills(objectSkills);
			setFormData(prev => ({
				...prev,
				path: {
					...prev.path,
					skills: deduplicatedSkills,
					origin: origin,
				},
			}));
		}
	};

	return (
		<div className='relative flex flex-col gap-6'>
			<fieldset>
				<legend className='fieldset-legend label font-cabin text-neutral-content mb-1 pb-0 text-xs capitalize'>
					Origin
				</legend>{' '}
				<select
					defaultValue={'Pick an origin'}
					className={cn(
						'select select-bordered font-cabin text-error text-md text-secondary caret-secondary focus:border-secondary focus:ring-secondary dark:text-primary dark:caret-primary dark:focus:border-primary dark:focus:ring-primary peer-default:dark:text-neutral h-8 min-h-6 w-full rounded-md px-2 py-0 shadow-sm focus:outline-none focus:ring-1 dark:bg-stone-700',
					)}
					onChange={e => handleOriginSelect(e)}
				>
					{' '}
					<option disabled={true}>Pick an origin</option>
					{origins.map(option => (
						<option
							key={`${option.name}-choice`}
							value={option.name}
						>
							{option.name}
						</option>
					))}
				</select>
			</fieldset>

			{selectedOrigin && (
				<div className='font-cabin bg-tile flex flex-col gap-2 rounded-lg p-4 shadow-sm'>
					<h3 className='font-grenze mb-2 text-3xl font-bold'>
						{selectedOrigin.name}
					</h3>
					<p className='text-sm italic'>{selectedOrigin.description}</p>
					<div className='flex flex-col text-sm'>
						<div>
							<strong>Profile bonus :</strong>{' '}
							{selectedOrigin.profileBonus.join(', ')}
						</div>
						<div>
							<strong>Skills :</strong> {selectedOrigin.skills.join(', ')}
						</div>

						<div>
							<strong>Knowledges :</strong>{' '}
							{selectedOrigin.knowledges.join(', ')}
						</div>
						<div>
							<strong>Equipment A :</strong>{' '}
							{selectedOrigin.equipmentA?.join(', ')}
						</div>
						<div>
							<strong>Equipment B :</strong>{' '}
							{selectedOrigin.equipmentB?.join(', ')}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CharFormStep3;
