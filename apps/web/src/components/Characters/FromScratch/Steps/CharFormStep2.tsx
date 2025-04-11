import SelectFilter from '@/components/SpellList/SelectFilter';
import { allSpecies, SpecieDataForm } from '@/data/speciesProfile';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

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

type Props = {
	selected: SpecieDataForm | undefined;
};

const CharFormStep2 = ({ selected }: Props) => {
	const { setValue } = useFormContext();
	const [selectedDifficulty, setSelectedDifficulty] = useState<Option[]>([]);

	const selectedDiffValues = selectedDifficulty.map(d => d.value);

	// Filter species based on difficulty
	const filteredSpecies =
		selectedDiffValues.length === 0
			? allSpecies
			: allSpecies.filter(s => selectedDiffValues.includes(s.specieDifficulty));

	// If a specie is selected, show subspecies
	const subsForSelectedSpecie = filteredSpecies.filter(
		s => s.specie === selected?.specie,
	);

	return (
		<div>
			<fieldset className='flex flex-col gap-4'>
				<SelectFilter
					value={selectedDifficulty}
					options={difficulties}
					onChange={setSelectedDifficulty}
					placeholder='Difficulty'
					isMulti
				/>

				{/* Specie Selection */}
				<div>
					<h3 className='font-semibold'>Choose a Specie</h3>
					<div className='flex flex-row flex-wrap gap-2'>
						{allSpecies
							.filter(
								(obj1, i, arr) =>
									arr.findIndex(obj2 => obj2.specie === obj1.specie) === i,
							)
							.map(specie => (
								<span
									key={specie.sub}
									onClick={() => {
										console.log(specie.specie);
										setValue('bio.species', specie.specie);
										setValue('bio.subspecies', specie.sub);
									}}
									className={`badge badge border-primary border-1 rounded-box cursor-pointer flex-col text-sm ${selected && selected.specie === specie.specie ? 'badge-primary' : ''}`}
								>
									<span className='font-bold capitalize'>{specie.specie}</span>
								</span>
							))}
					</div>
				</div>

				{/* Subspecies Selection */}
				{selected && subsForSelectedSpecie.length > 1 && (
					<div className='font-cabin'>
						<h3 className=''>Choose a Subspecie</h3>
						<div className='flex flex-row gap-2'>
							{subsForSelectedSpecie.map(s => (
								<span
									key={s.sub}
									onClick={() => setValue('bio.subspecies', s.sub)}
									className={`badge badge border-primary border-1 rounded-box cursor-pointer flex-col text-sm ${
										selected.sub === s.sub ? 'badge-primary' : ''
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
			{selected && (
				<div className='mt-6 rounded-lg border p-4 shadow'>
					<h3 className='font-grenze mb-2 text-3xl font-bold'>
						{capitalizeFirstLetter(`${selected.sub}`)}
					</h3>

					{selected && (
						<div className='flex flex-col gap-4'>
							<span className='font-bold'>
								Difficulty : {selected.specieDifficulty}
							</span>
							<div
								className='flex-2'
								key={`${selected.specie}-${selected.sub}`}
							>
								<p className='italic'>{selected.description}</p>
							</div>
							<h3 className='text-lg font-bold'>Attributes</h3>
							<div className='flex flex-row gap-2'>
								{selected.path.attributes.map(attr => (
									<div
										className='flex-1'
										key={`${selected.sub}-${attr.name}`}
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
