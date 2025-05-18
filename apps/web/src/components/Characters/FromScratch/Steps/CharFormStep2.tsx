import { SingleErrorMessage } from '@/components/RHFComponents';
import { allSpecies, SpecieDataForm, speciesMap } from '@/data/speciesProfile';
import { useCharacterForm } from '@/store/characterContext';
import { variablesReset } from '@/utils/calculateStats';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { setObjectSkills } from '@/utils/objectSkills';
import { ChangeEvent, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

const difficulties = [
	{ value: 'easy', label: 'easy' },
	{ value: 'normal', label: 'normal' },
	{ value: 'tough', label: 'tough' },
];

export type Option = {
	label: string;
	value: string | number;
	icon?: JSX.Element;
};

const CharFormStep2 = () => {
	const { methods, setFormData } = useCharacterForm();
	const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([
		'easy',
		'normal',
		'tough',
	]);
	const [selectedSpecieData, setSelectedSpecieData] =
		useState<SpecieDataForm>();
	const selectedSpecies = useWatch({ name: 'bio.species' });
	const selectedSub = useWatch({ name: 'bio.subspecies' });
	const punName = useWatch({ name: 'bio.isPun' });

	useEffect(() => {
		if (selectedSub !== '') {
			const foundSub = allSpecies.find(specie => specie.sub === selectedSub);
			if (foundSub) {
				setSelectedSpecieData(foundSub);
				const skilllist = foundSub?.path.skills;
				const languagelist = foundSub?.specifics.speaks;
				const attributelist = foundSub?.path.attributes;
				const selectedSpecies = speciesMap[foundSub.sub];
				const objectSkills = setObjectSkills(skilllist);
				const skillPoints = foundSub.specie === 'human' ? 10 : 5;
				setFormData(prev => ({
					...prev,
					path: {
						...prev.path,
						skills: objectSkills,
						skillPoints: skillPoints,
						attributes: attributelist,
					},
					specifics: {
						...prev.specifics,
						speaks: languagelist,
						description: '',
						background: '',
					},
					profile: {
						...prev.profile,
						level: 1,
						statsStarting: selectedSpecies.profile.statsStarting,
						variables: variablesReset,
						boni: variablesReset,
						advantages: variablesReset,
					},
				}));
				methods.setValue(
					'profile.statsStarting',
					selectedSpecies.profile.statsStarting,
				);
				methods.setValue(
					'profile.statsStarting.VIT',
					punName
						? selectedSpecies.profile.statsStarting.VIT + 1
						: selectedSpecies.profile.statsStarting.VIT,
				);
			}
		}
	}, [selectedSpecies, selectedSub]);

	// If a specie is selected, show subspecies
	const subsForSelectedSpecie = allSpecies.filter(
		s => s.specie === selectedSpecies,
	);

	const handleDifficultySelect = (e: ChangeEvent<HTMLInputElement>) => {
		//FIXME: logic inverse

		// Find Difficulty option selected
		const value = e.target.ariaLabel;
		//const diff = difficulties.find(diff => diff.value === value);
		if (!value) return;

		// Find if already selected
		const isAlreadySelected =
			selectedDifficulty.length !== 0
				? selectedDifficulty?.includes(value)
				: false;
		console.log(value, isAlreadySelected);
		if (!isAlreadySelected) {
			//If not selected, add to selectedDifficulty
			setSelectedDifficulty(prev => [...prev, value]);
		} else {
			// If selected, remove from selectedDifficulty
			setSelectedDifficulty(selectedDifficulty?.filter(diff => diff !== value));
		}
		methods.setValue('bio.species', '');
		methods.setValue('bio.subspecies', undefined);
		console.dir(selectedDifficulty);
	};

	return (
		<div>
			<fieldset className='flex flex-col items-center gap-4'>
				<h3 className='font-semibold'>Select playing difficulty</h3>
				<div className='flex flex-row gap-2'>
					{difficulties.map(diff => (
						<input
							className='btn btn-sm capitalize'
							key={`diff-${diff.label}-input`}
							type='checkbox'
							name='difficulty'
							defaultChecked={true}
							aria-label={diff.label}
							onChange={e => handleDifficultySelect(e)}
						/>
					))}
				</div>

				{/* Specie Selection */}
				<div className='flex flex-col items-center'>
					<h3 className='font-semibold'>Choose a Specie</h3>
					<SingleErrorMessage name='bio.species' />
					<div className='flex flex-row flex-wrap items-center justify-center gap-2'>
						{allSpecies
							.filter(s => {
								if (selectedDifficulty.length !== 0) {
									return selectedDifficulty.some(
										diff => diff === s.specieDifficulty,
									);
								} else {
									return true;
								}
							})
							.filter(
								(obj1, i, arr) =>
									arr.findIndex(obj2 => obj2.specie === obj1.specie) === i,
							)

							.map(specie => (
								<span
									key={specie.sub}
									onClick={() => {
										methods.setValue('bio.species', specie.specie);
										if (specie.specie === specie.sub) {
											methods.setValue('bio.subspecies', specie.sub);
										} else {
											methods.setValue('bio.subspecies', undefined);
										}
									}}
									className={cn(
										`badge badge border-primary border-1 rounded-box cursor-pointer flex-col text-sm`,
										{
											'badge-primary': selectedSpecies === specie.specie,
										},
									)}
								>
									<span className='font-bold capitalize'>{specie.specie}</span>
								</span>
							))}
					</div>
				</div>

				{/* Subspecies Selection */}
				{selectedSpecies !== selectedSub &&
					subsForSelectedSpecie.length !== 0 && (
						<div className='font-cabin'>
							<h3 className=''>Choose a Subspecie</h3>
							<SingleErrorMessage name='bio.subspecies' />
							<div className='flex flex-row gap-2'>
								{subsForSelectedSpecie
									.filter(s => {
										if (selectedDifficulty.length !== 0) {
											return selectedDifficulty.some(
												diff => diff === s.specieDifficulty,
											);
										} else {
											return true;
										}
									})
									.map(s => (
										<span
											key={s.sub}
											onClick={() => methods.setValue('bio.subspecies', s.sub)}
											className={cn(
												`badge badge border-primary border-1 rounded-box cursor-pointer flex-col text-sm`,
												{
													'badge-primary': selectedSub === s.sub,
												},
											)}
										>
											<span className='text-md capitalize'>{s.sub}</span>
										</span>
									))}
							</div>
						</div>
					)}
			</fieldset>

			{/* Detail Panel */}
			{selectedSub && selectedSpecieData && (
				<div className='mt-6 rounded-lg border p-4 shadow'>
					<h3 className='font-grenze mb-2 text-3xl font-bold'>
						{capitalizeFirstLetter(`${selectedSpecieData.sub}`)}
					</h3>

					{selectedSpecieData && (
						<div className='flex flex-col gap-4'>
							<span className='font-bold'>
								Difficulty : {selectedSpecieData.specieDifficulty}
							</span>
							<div
								className='flex-2'
								key={`${selectedSpecieData.specie}-${selectedSpecieData.sub}`}
							>
								<p className='italic'>{selectedSpecieData.description}</p>
							</div>
							<h3 className='text-lg font-bold'>Attributes</h3>
							<div className='flex flex-row gap-2'>
								{selectedSpecieData.path.attributes.map(attr => (
									<div
										className='flex-1'
										key={`${selectedSpecieData.sub}-${attr.name}`}
									>
										<h4 className='font-bold'>{attr.name}</h4>
										<p className='text-xs italic'>{attr.description}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CharFormStep2;
