import { Career, careersData } from '@/data/careers';
import { useCharacterForm } from '@/store/characterContext';
import { ChangeEvent, useEffect, useState } from 'react';

const CharFormStep10 = () => {
	const { methods } = useCharacterForm();
	const [selectedCareer, setSelectedCareer] = useState<Career | null>();
	const [selectedCareerType, setSelectedCareerType] = useState<string | null>();

	useEffect(() => {
		if (!selectedCareer) return;
		methods.setValue('path.careers', [selectedCareer.ranks[0].name]);
	}, [selectedCareer]);

	const handleCareerTypeSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.ariaLabel;
		if (value === 'All') {
			setSelectedCareerType(null);
			setSelectedCareer(null);
		}
		setSelectedCareerType(value);
	};
	const handleCareerSelect = (id: number) => {
		const career = careersData.find(c => c.id === id);
		setSelectedCareer(career);
	};

	return (
		<div className='flex w-full flex-col items-center justify-start'>
			<fieldset className='flex w-full flex-col items-center'>
				<label className='fieldset-legend label font-cabin text-neutral-content mb-1 pb-0 text-xs capitalize'>
					Careers
				</label>

				<div className='my-2 filter'>
					<input
						className='btn btn-xs filter-reset focus:btn-primary w-fit border-0'
						type='radio'
						name='type'
						aria-label='All'
						onChange={e => handleCareerTypeSelect(e)}
					/>
					<input
						className='btn btn-xs focus:btn-primary border-0'
						type='radio'
						name='type'
						aria-label='Craft'
						onChange={e => handleCareerTypeSelect(e)}
					/>
					<input
						className='btn btn-xs focus:btn-primary border-0'
						type='radio'
						name='type'
						aria-label='Arts & Letters'
						onChange={e => handleCareerTypeSelect(e)}
					/>
					<input
						className='btn btn-xs focus:btn-primary border-0'
						type='radio'
						name='type'
						aria-label='Gathering'
						onChange={e => handleCareerTypeSelect(e)}
					/>
					<input
						className='btn btn-xs focus:btn-primary border-0'
						type='radio'
						name='type'
						aria-label='Service'
						onChange={e => handleCareerTypeSelect(e)}
					/>
					<input
						className='btn btn-xs focus:btn-primary border-0'
						type='radio'
						name='type'
						aria-label='Spiritual'
						onChange={e => handleCareerTypeSelect(e)}
					/>
				</div>
				<div className='flex w-full flex-col gap-4 sm:flex-row'>
					<div className='h-50 w-1/2 overflow-y-scroll rounded-sm shadow'>
						{careersData
							.filter(c => {
								if (selectedCareerType) {
									return c.type === selectedCareerType;
								} else return true;
							})
							.sort(function (a, b) {
								return a.name.localeCompare(b.name);
							})
							.map(option => (
								<div
									key={`${option.name}-choice`}
									onClick={() => handleCareerSelect(option.id)}
									className='hover:text-primary cursor-pointer rounded-sm pl-2'
								>
									{option.name}
								</div>
							))}
					</div>
					{selectedCareer && (
						<div className='font-cabin bg-tile h-50 flex w-1/2 flex-col gap-2 rounded-lg p-4 shadow-sm'>
							<h3 className='font-grenze text-xl'>{selectedCareer.name}</h3>
							<p className='text-sm italic'>{selectedCareer.type}</p>
							<div className='flex flex-col items-start'>
								{selectedCareer.ranks.map((r, i) => (
									<div
										key={r.name}
										className='flex flex-row items-center gap-2'
									>
										<span className='badge badge-xs badge-primary'>
											{i + 1}
										</span>
										<h4>{r.name}</h4>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</fieldset>
		</div>
	);
};

export default CharFormStep10;
