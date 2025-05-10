import TagBadge from '@/components/TagBadge';
import { characterAttributes } from '@/data/charattributesData';
import { useCharacterForm } from '@/store/characterContext';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { Attribute, CreatureAttribute } from '@api/lib/ZodCreature';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

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
	const { methods, formData } = useCharacterForm();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedAttributes, setSelectedAttributes] = useState<
		CreatureAttribute[]
	>([]);
	const startingAttributes = formData.path?.attributes || [];

	// On component mount, just set the selectedAttributes without updating the form
	useEffect(() => {
		const allAttrs = methods.getValues('path.attributes') || [];
		const foundAttr = allAttrs.filter(
			attr => !startingAttributes.some(start => start.name === attr.name),
		);
		console.log('Initial foundAttr', foundAttr);
		setSelectedAttributes(foundAttr);
	}, []);

	// Unified function to update both state and form when attributes change
	const updateAttributesAndForm = (
		newSelectedAttributes: CreatureAttribute[],
	) => {
		// Update the form with combined attributes
		const attributeList = [...startingAttributes, ...newSelectedAttributes];
		methods.setValue('path.attributes', attributeList);

		// Update the state
		setSelectedAttributes(newSelectedAttributes);
	};

	// Modify toggleAttribute to use the unified update function
	const toggleAttribute = (attr: Attribute) => {
		if (!attr.value) return;
		if (totalValue + attr.value > 3 || totalValue + attr.value < -3) {
			toast.error('Your character is already far too unbalanced.');
			return;
		}
		if (selectedAttributes.length > 6) {
			toast.error(`You know you can't select them all, right ?`);
			return;
		}

		// Calculate new selected attributes
		const exists = selectedAttributes.some(a => a.name === attr.name);
		const newSelected = exists
			? selectedAttributes.filter(a => a.name !== attr.name)
			: [...selectedAttributes, attr];

		// Update both state and form
		updateAttributesAndForm(newSelected);
	};

	// Modify removeAttribute to use the unified update function
	const removeAttribute = (attr: CreatureAttribute) => {
		if (!attr.value) return;

		// Calculate new selected attributes
		const exists = selectedAttributes.some(a => a.name === attr.name);
		const newSelected = exists
			? selectedAttributes.filter(a => a.name !== attr.name)
			: [...selectedAttributes, attr];

		// Update both state and form
		updateAttributesAndForm(newSelected);
	};

	const shuffledAttributes = useMemo(() => {
		return characterAttributes ? shuffleArray(characterAttributes) : [];
	}, [characterAttributes]);

	const filteredAttributes = useMemo(() => {
		return shuffledAttributes.filter(
			attr =>
				attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				attr.id.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [shuffledAttributes, searchTerm]);

	const totalValue = selectedAttributes.reduce(
		(sum, attr) => (attr.value ? sum + attr.value : sum),
		0,
	);

	const progressColor =
		totalValue === 3 || totalValue === -3
			? 'range-error'
			: totalValue === 2 || totalValue === -2
				? 'range-warning'
				: 'range-accent';

	if (!characterAttributes) return <div>No attributes found.</div>;

	return (
		<div className='flex w-full flex-col items-center justify-center gap-4'>
			{/* Total Attribute Value Range Bar */}
			<div className='h-fit w-full max-w-xs'>
				<h3 className='font-grenze text-xl'>Équilibre :</h3>
				<input
					type='range'
					min={-3}
					max={+3}
					value={totalValue}
					readOnly
					disabled={!selectedAttributes}
					className={`range range-xs w-full ${progressColor} cursor-default [--range-thumb:accent]`}
				/>

				<div className='mt-2 flex justify-between px-2.5 text-xs'>
					<span>-3</span>
					<span>-2</span>
					<span>-1</span>
					<span>0</span>
					<span>+1</span>
					<span>+2</span>
					<span>+3</span>
				</div>
			</div>
			{/* Search Input */}
			<fieldset className='flex flex-col items-center gap-4'>
				<input
					type='text'
					placeholder='Type to search...'
					className='input input-bordered'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>

				{/* Attributes Tag List */}
				<div className='h-50 flex flex-wrap items-start justify-center gap-2 overflow-scroll rounded-md p-2'>
					{filteredAttributes
						.filter(
							attr =>
								!selectedAttributes.some(
									selected => attr.name === selected.name,
								),
						)
						.map(attr => {
							const isSelected = selectedAttributes.some(
								a => a.name === attr.name,
							);
							return (
								<div
									key={attr.id}
									className={`badge badge-md cursor-pointer capitalize ${isSelected ? 'badge-primary' : 'badge-tile border-primary border-1 sm:tooltip'}`}
									data-tip={attr.description}
									onClick={() => toggleAttribute(attr)}
								>
									{attr.name}
								</div>
							);
						})}
				</div>

				{/* Selected Attributes Details */}
				{selectedAttributes && (
					<div className='space-y-3'>
						<h3 className='font-grenze text-xl'>Attributes :</h3>
						<ul className='flex flex-row flex-wrap gap-1'>
							{selectedAttributes.length > 0 &&
								selectedAttributes.map(attr => (
									<div
										key={attr.name}
										className='tooltip'
									>
										<span className='tooltip-content'>{attr.effect}</span>
										<TagBadge
											text={capitalizeFirstLetter(attr.name)}
											onClick={() => removeAttribute(attr)}
											xl
										/>
									</div>
								))}
							{startingAttributes &&
								startingAttributes.map(attr => (
									<div
										key={attr.name}
										className='tooltip'
									>
										<span className='tooltip-content'>{attr.effect}</span>
										<TagBadge
											text={capitalizeFirstLetter(attr.name)}
											button={false}
											xl
										/>
									</div>
								))}
						</ul>
					</div>
				)}
			</fieldset>
		</div>
	);
};

export default CharFormStep5;
