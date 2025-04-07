import { OriginCharacter, origins } from '@/data/origins'; // Importez les données typées
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const CharFormStep3 = () => {
	const { setValue } = useFormContext();
	const [selectedOrigin, setSelectedOrigin] = useState<OriginCharacter | null>(
		null,
	);
	const [isListOpen, setIsListOpen] = useState(false);

	const handleOriginSelect = useCallback(
		(origin: OriginCharacter) => {
			setSelectedOrigin(origin);
			setValue('path.origin', origin.name); // Enregistrez le nom de l'origine dans le formulaire
			setIsListOpen(false); // Fermez la liste après la sélection
		},
		[setValue],
	);

	const toggleList = useCallback(() => {
		setIsListOpen(prev => !prev);
	}, []);

	return (
		<div className='relative flex flex-col gap-6'>
			<fieldset>
				<label
					htmlFor='origin'
					className='block text-sm font-medium'
				>
					Choose your origin :
				</label>
				<div className='bg-background relative mt-1'>
					<button
						type='button'
						className='bg-card w-full cursor-default rounded-md px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500'
						aria-haspopup='listbox'
						aria-expanded={isListOpen}
						onClick={toggleList}
					>
						{selectedOrigin ? selectedOrigin.name : 'Sélectionnez une origine'}
						<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
							<svg
								className='h-5 w-5 text-gray-400'
								viewBox='0 0 20 20'
								fill='currentColor'
								aria-hidden='true'
							>
								<path
									fillRule='evenodd'
									d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zM10 17a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-.707.293z'
									clipRule='evenodd'
								/>
							</svg>
						</span>
					</button>

					{isListOpen && (
						<ul
							className='absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg focus:outline-none'
							tabIndex={-1}
							role='listbox'
							aria-labelledby='listbox-label'
						>
							{origins.map(origin => (
								<li
									key={origin.name}
									className={`relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100 ${
										selectedOrigin?.name === origin.name
											? 'bg-indigo-600 text-white'
											: ''
									}`}
									id={`listbox-option-${origin.name.replace(/\s+/g, '-')}`}
									role='option'
									aria-selected={selectedOrigin?.name === origin.name}
									onClick={() => handleOriginSelect(origin)}
								>
									<div className='flex items-center'>
										<span
											className={`ml-2 block truncate ${selectedOrigin?.name === origin.name ? 'font-semibold' : 'font-normal'}`}
										>
											{origin.name}
										</span>
									</div>

									{selectedOrigin?.name === origin.name && (
										<span className='absolute inset-y-0 right-0 flex items-center pr-2'>
											<svg
												className='h-5 w-5 text-white'
												viewBox='0 0 20 20'
												fill='currentColor'
												aria-hidden='true'
											>
												<path
													fillRule='evenodd'
													d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
													clipRule='evenodd'
												/>
											</svg>
										</span>
									)}
								</li>
							))}
						</ul>
					)}
				</div>
			</fieldset>

			{selectedOrigin && (
				<div className='font-cabin rounded-md border p-4 shadow-sm'>
					<h3 className='mb-2 text-lg font-semibold'>{selectedOrigin.name}</h3>
					<p className='mb-2'>{selectedOrigin.description}</p>
					<div className='grid grid-cols-2 gap-2 text-sm'>
						<div>
							<strong>Bonus de stats :</strong>{' '}
							{selectedOrigin.statBonus.join(', ')}
						</div>
						<div>
							<strong>Compétence 1 :</strong> {selectedOrigin.skill1}
						</div>
						<div>
							<strong>Compétence 2 :</strong> {selectedOrigin.skill2}
						</div>
						<div>
							<strong>Compétence 3 :</strong> {selectedOrigin.skill3}
						</div>
						<div>
							<strong>Connaissances :</strong>{' '}
							{selectedOrigin.knowledges.join(', ')}
						</div>
						<div>
							<strong>Équipement A :</strong>{' '}
							{selectedOrigin.equipmentA.join(', ')}
						</div>
						<div>
							<strong>Équipement B :</strong>{' '}
							{selectedOrigin.equipmentB.join(', ')}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CharFormStep3;
