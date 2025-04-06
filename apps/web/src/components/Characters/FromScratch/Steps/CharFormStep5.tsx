import { trpc } from '@/utils/trpc';
import { Attribute } from '@api/lib/ZodCreature';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// Function to shuffle an array using the Fisher-Yates algorithm
const shuffleArray = (array: Attribute[]) => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

const CharFormStep5 = () => {
	const { setValue } = useFormContext();
	const { data: attributes, isLoading } = trpc.attributes.getAll.useQuery();
	const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setValue('path.feats', selectedAttributes);
	}, [selectedAttributes, setValue]);

	const shuffledAttributes = useMemo(() => {
		return attributes ? shuffleArray(attributes) : [];
	}, [attributes]);

	const filteredAttributes = useMemo(() => {
		return shuffledAttributes.filter(attr =>
			attr.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [shuffledAttributes, searchTerm]);

	const toggleAttribute = (attr: Attribute) => {
		setSelectedAttributes(prev => {
			const exists = prev.some(a => a.id === attr.id);
			return exists ? prev.filter(a => a.id !== attr.id) : [...prev, attr];
		});
	};

	const totalValue = selectedAttributes.reduce(
		(sum, attr) => (attr.value ? sum + attr.value : sum),
		0,
	);
	const progressColor = totalValue < 0 ? 'range-error' : 'range-accent';

	if (isLoading) return <div>Loading attributes...</div>;
	if (!attributes) return <div>No attributes found.</div>;

	return (
		<div className='space-y-6'>
			{/* Search Input */}
			<fieldset>
				<input
					type='text'
					placeholder='Type to search...'
					className='input input-bordered'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>

				{/* Attributes Tag List */}
				<div className='flex flex-wrap gap-2 rounded-md bg-stone-900 p-2'>
					{filteredAttributes.map(attr => {
						const isSelected = selectedAttributes.some(a => a.id === attr.id);
						return (
							<div
								key={attr.id}
								className={`badge cursor-pointer p-3 ${isSelected ? 'badge-primary' : 'badge-secondary'}`}
								onClick={() => toggleAttribute(attr)}
							>
								{attr.name} ({attr.value && attr.value >= 0 ? '+' : ''}
								{attr.value})
							</div>
						);
					})}
				</div>

				{/* Selected Attributes Details */}
				{selectedAttributes.length > 0 && (
					<div className='space-y-3'>
						<h3 className='text-md font-semibold'>Selected Attributes</h3>
						<ul className='space-y-2'>
							{selectedAttributes.map(attr => (
								<li
									key={attr.id}
									className='rounded-md bg-stone-800 p-3 shadow'
								>
									<p className='font-semibold'>
										{attr.name} ({attr.value && attr.value >= 0 ? '+' : ''}
										{attr.value})
									</p>
									<p className='text-sm text-stone-400'>{attr.description}</p>
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Total Attribute Value Range Bar */}
				<div>
					<input
						type='range'
						min={-100}
						max={100}
						value={totalValue}
						readOnly
						className={`range ${progressColor}`}
					/>
				</div>
			</fieldset>
		</div>
	);
};

export default CharFormStep5;
