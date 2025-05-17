import { SingleErrorMessage } from '@/components/RHFComponents';
import { allSpecies, SpecieDataForm, speciesMap } from '@/data/speciesProfile';
import { useCharacterForm } from '@/store/characterContext';
import { variablesReset } from '@/utils/calculateStats';
import { capitalizeFirstLetter } from '@/utils/capitalize';
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
	const [selectedDifficulty, setSelectedDifficulty] =
		useState<Option[]>(difficulties);
	const [selectedSpecieData, setSelectedSpecieData] =
		useState<SpecieDataForm>();
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
	}, [selectedSub]);

	// If a specie is selected, show subspecies
	const subsForSelectedSpecie = allSpecies.filter(
		s => s.specie === selectedSpecieData?.specie,
	);

	const handleDifficultySelect = (e: ChangeEvent<HTMLInputElement>) => {
		//FIXME: logic inverse

		const label = e.target.ariaLabel;
		const diff = difficulties.find(diff => diff.label === label);
		const isAlreadySelected = selectedDifficulty.some(
			diff => diff.label === label,
		);
		console.log(diff, isAlreadySelected);
		if (label === 'All') {
			setSelectedDifficulty(difficulties);
		}
		if (diff && !isAlreadySelected) {
			setSelectedDifficulty([...selectedDifficulty, diff]);
		} else if (diff && isAlreadySelected) {
			setSelectedDifficulty(
				selectedDifficulty.filter(diff => diff.label !== label),
			);
		}
		console.dir(selectedDifficulty);
	};

	return (
		<div>
			<fieldset className='flex flex-col items-center gap-4'>
				<h3 className='font-semibold'>Select playing difficulty</h3>
				<div className='filter'>
					{difficulties.map(diff => (
						<input
							className='btn btn-sm capitalize'
							key={`diff-${diff.label}-input`}
							type='checkbox'
							name='difficulty'
							defaultChecked={false}
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
							.filter(
								(obj1, i, arr) =>
									arr.findIndex(obj2 => obj2.specie === obj1.specie) === i,
							)
							.filter(s =>
								selectedDifficulty.some(
									diff => diff.value === s.specieDifficulty,
								),
							)
							.map(specie => (
								<span
									key={specie.sub}
									onClick={() => {
										//console.log(specie.specie, specie.sub);
										methods.setValue('bio.species', specie.specie);
										methods.setValue('bio.subspecies', specie.sub);
									}}
									className={`badge badge border-primary border-1 rounded-box cursor-pointer flex-col text-sm ${selectedSpecieData && selectedSpecieData.specie === specie.specie ? 'badge-primary' : ''}`}
								>
									<span className='font-bold capitalize'>{specie.specie}</span>
								</span>
							))}
					</div>
				</div>

				{/* Subspecies Selection */}
				{selectedSpecieData && subsForSelectedSpecie.length > 1 && (
					<div className='font-cabin'>
						<h3 className=''>Choose a Subspecie</h3>
						<SingleErrorMessage name='bio.subspecies' />
						<div className='flex flex-row gap-2'>
							{subsForSelectedSpecie
								.filter(s =>
									selectedDifficulty.some(
										diff => diff.value === s.specieDifficulty,
									),
								)
								.map(s => (
									<span
										key={s.sub}
										onClick={() => methods.setValue('bio.subspecies', s.sub)}
										className={`badge badge border-primary border-1 rounded-box cursor-pointer flex-col text-sm ${
											selectedSpecieData.sub === s.sub ? 'badge-primary' : ''
										}`}
									>
										<span className='text-md capitalize'>{s.sub}</span>
									</span>
								))}
						</div>
					</div>
				)}
			</fieldset>

			{/* Detail Panel */}
			{selectedSpecieData && (
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
