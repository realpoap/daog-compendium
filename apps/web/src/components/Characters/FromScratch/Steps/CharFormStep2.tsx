import SelectFilter from '@/components/SpellList/SelectFilter';
import { allSpecies, SpecieDataForm } from '@/data/speciesProfile';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

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
	const { setValue, control } = useFormContext();
	const [selectedDifficulty, setSelectedDifficulty] = useState<Option[]>([]);
	const [selectedSpecieData, setSelectedSpecieData] =
		useState<SpecieDataForm>();

	const selectedSpecie = useWatch({ control, name: 'bio.specie' });
	const selectedSub = useWatch({ control, name: 'bio.subspecie' });

	const selectedDiffValues = selectedDifficulty.map(d => d.value);

	// Filter species based on difficulty
	const filteredSpecies =
		selectedDiffValues.length === 0
			? allSpecies
			: allSpecies.filter(s => selectedDiffValues.includes(s.specieDifficulty));

	useEffect(() => {
		console.log(selectedSub);

		if (selectedSub === '')
			setSelectedSpecieData(
				allSpecies.find(specie => specie.specie === selectedSpecie),
			);
		if (selectedSub !== '')
			setSelectedSpecieData(
				allSpecies.find(specie => specie.sub === selectedSub),
			);
		console.log(selectedSpecieData);
	}, [selectedSub, selectedSpecie]);

	// Extract unique species names
	const uniqueSpecies = Array.from(new Set(filteredSpecies.map(s => s.specie)));

	// If a specie is selected, show subspecies
	const subsForSelectedSpecie = filteredSpecies.filter(
		s => s.specie === selectedSpecie,
	);

	return (
		<div className='flex flex-col gap-6'>
			{/* Difficulty Selector */}
			<fieldset>
				<SelectFilter
					value={selectedDifficulty}
					options={difficulties}
					onChange={setSelectedDifficulty}
					placeholder='Difficulty'
					isMulti
				/>

				{/* Specie Selection */}
				<div>
					<h3 className='mb-2 font-semibold'>Choose a Specie</h3>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
						{uniqueSpecies.map(specie => (
							<button
								type='button'
								key={specie}
								onClick={() => {
									setValue('bio.specie', specie);
									setValue('bio.subspecie', '');
								}}
								className={`btn btn-xs flex-col p-4 ${selectedSpecie === specie ? 'btn-primary' : ''}`}
							>
								<span className='font-bold capitalize'>{specie}</span>
							</button>
						))}
					</div>
				</div>

				{/* Subspecies Selection */}
				{selectedSpecie && subsForSelectedSpecie.length > 1 && (
					<div className='font-cabin'>
						<h3 className='mb-2 mt-4 font-semibold'>Choose a Subspecie</h3>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
							{subsForSelectedSpecie.map(s => (
								<button
									type='button'
									key={s.sub}
									onClick={() => setValue('bio.subspecie', s.sub)}
									className={`btn btn-xs flex-col p-4 ${
										selectedSub === s.sub ? 'btn-primary' : ''
									}`}
								>
									<span className='text-md capitalize'>{s.sub}</span>
								</button>
							))}
						</div>
					</div>
				)}
			</fieldset>

			{/* Detail Panel */}
			{selectedSpecie && (
				<div className='mt-6 rounded-lg border p-4 shadow'>
					<h3 className='font-grenze mb-2 text-xl font-bold capitalize'>
						{selectedSub
							? capitalizeFirstLetter(`${selectedSub} ${selectedSpecie}`)
							: selectedSpecie}
					</h3>

					{selectedSpecieData && (
						<div className='font-cabin'>
							<p>
								<div
									key={`${selectedSpecieData.specie}-${selectedSpecieData.sub}`}
								>
									<span className='font-bold'>
										Difficulty : {selectedSpecieData.specieDifficulty}
									</span>
									<p className='italic'>{selectedSpecieData.description}</p>
								</div>
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CharFormStep2;
