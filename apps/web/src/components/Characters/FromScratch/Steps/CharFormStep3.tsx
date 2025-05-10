import TagBadge from '@/components/TagBadge';
import { OriginCharacter, origins } from '@/data/origins'; // Importez les données typées
import { useCharacterForm } from '@/store/characterContext';
import { cn } from '@/utils/classNames';
import {
	deduplicateSkills,
	getSkillNames,
	setObjectSkills,
} from '@/utils/objectSkills';
import { StatProfil } from '@api/lib/ZodCreature';
import { useState } from 'react';
import { TbSwitchHorizontal } from 'rocketicons/tb';

const CharFormStep3 = () => {
	const { methods, setFormData, formData } = useCharacterForm();
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

			//profile bonus
			const bonus = origin.profileBonus;
			const profile = formData.profile?.statsStarting ?? ({} as StatProfil);
			const updatedProfile: StatProfil = { ...profile };

			(Object.keys(profile) as (keyof StatProfil)[]).map(stat => {
				bonus.map(bon => {
					if (stat === bon) {
						updatedProfile[stat] = (profile[stat] ?? 0) + 1;

						console.log(stat, profile[stat], '+1 =', updatedProfile[stat]);
					}
				});
			});
			// update statsstarting
			methods.setValue('profile.statsStarting', updatedProfile);
		}
	};

	const [selectedSet, setSelectedSet] = useState<'A' | 'B'>('A');

	const toggleEquipment = () => {
		setSelectedSet(prev => (prev === 'A' ? 'B' : 'A'));
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
					<div className='flex flex-col gap-2 text-sm'>
						<div className=''>
							<strong>Profile bonus :</strong>{' '}
							<div className='flex flex-row gap-2'>
								{selectedOrigin.profileBonus.map(bon => (
									<TagBadge
										key={`bonus-${bon}`}
										text={bon}
										button={false}
									/>
								))}
							</div>
						</div>
						<div className='flex w-full flex-row gap-4'>
							<div className='flex-1'>
								<strong>Skills :</strong>{' '}
								<ul className='ml-2'>
									{getSkillNames(selectedOrigin.skills).map(s => (
										<li
											className='lowercase'
											key={`skill-li-${s}`}
										>
											- {s}
										</li>
									))}
								</ul>
							</div>

							<div className='flex-1'>
								<strong>Knowledges :</strong>{' '}
								<ul className='ml-2'>
									{selectedOrigin.knowledges.map(s => (
										<li
											className='lowercase'
											key={`know-li-${s}`}
										>
											- {s}
										</li>
									))}
								</ul>
							</div>
						</div>
						{/* <div>
							<strong>Equipment A :</strong>{' '}
							{selectedOrigin.equipmentA?.join(', ')}
						</div>
						<div>
							<strong>Equipment B :</strong>{' '}
							{selectedOrigin.equipmentB?.join(', ')}
						</div> */}
						<div className='flex w-full flex-col items-start justify-center gap-4 sm:flex-row'>
							{/* Equipment A */}
							<div
								className={cn(
									'card border-base-300 w-1/2 rounded-lg border p-4 shadow-md',
									selectedSet === 'A'
										? 'bg-primary text-primary-content'
										: 'bg-base-200',
								)}
								onClick={toggleEquipment}
							>
								<h4 className='mb-2 font-bold'>Equipment A</h4>
								<p className='text-sm'>
									{selectedOrigin.equipmentA?.join(', ')}
								</p>
							</div>

							{/* Toggle Button */}
							<div className='flex items-center justify-center'>
								<TbSwitchHorizontal className='icon-neutral-content icon-base rotate-90 sm:rotate-0' />
							</div>

							{/* Equipment B */}
							<div
								className={cn(
									'card border-base-300 w-1/2 rounded-lg border p-4 shadow-md',
									selectedSet === 'B'
										? 'bg-primary text-primary-content'
										: 'bg-base-200',
								)}
								onClick={toggleEquipment}
							>
								<h4 className='mb-2 font-bold'>Equipment B</h4>
								<p className='text-sm'>
									{selectedOrigin.equipmentB?.join(', ')}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CharFormStep3;
