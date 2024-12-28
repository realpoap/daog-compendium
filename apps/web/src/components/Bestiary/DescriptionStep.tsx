import {
	creatureAlignmentOptions,
	creatureSizeOptions,
	creatureTypeOptions,
} from '@/types/creatureOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Attribute, NewCreature } from '@api/lib/ZodCreature';
import { SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { UseFormSetValue } from 'react-hook-form';
import {
	Checkbox,
	Field,
	Input,
	Select,
	Textarea,
} from '../RHFComponents/index';
import AttributeForm from './utils/AttributeForm';
import { AttributeTags } from './utils/AttributeTags';

const DescriptionStep = ({
	setValue,
	setStep,
	step,
}: {
	setValue: UseFormSetValue<NewCreature>;
	setStep: React.Dispatch<SetStateAction<number>>;
	step: number;
}) => {
	const [attributes, setAttributes] = useState<string[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const attributesList = trpc.attributes.getAll.useQuery();

	useEffect(() => {
		const object = {
			id: '',
			name: '',
			flavor: null,
			description: null,
			creatureId: null,
		};
		setValue('attributes', [object]);
	}, []);

	useEffect(() => {
		if (attributesList.data) {
			const list = attributesList.data;
			let attObjects = [] as Attribute[];
			attributes.map(att => {
				const attObject = list.find(el => el.name === att);
				attObject && attObjects.push(attObject);
			});
			console.log(attObjects);
			setValue('attributes', attObjects as Attribute[]);
		}
	}, [attributes]);

	return (
		<div className='flex w-full flex-col items-center'>
			<Field
				name='name'
				label='Name'
			>
				<Input
					name='name'
					type='text'
				/>
			</Field>
			<Field
				name='isBoss'
				label=''
				width='full'
			>
				<Checkbox
					name='isBoss'
					label='is an unique (and powerful) monster'
				/>
			</Field>
			<div className='flex w-full justify-center gap-4 md:flex-row'>
				<Field
					name='type'
					label='Type'
					width='small'
				>
					<Select
						name='type'
						options={creatureTypeOptions}
						defaultValue='default'
					/>
				</Field>
				<Field
					name='size'
					label='Size'
					width='small'
				>
					<Select
						name='size'
						options={creatureSizeOptions}
						defaultValue='default'
					/>
				</Field>
				<Field
					name='alignment'
					label='Alignment'
					width='small'
				>
					<Select
						name='alignment'
						options={creatureAlignmentOptions}
						defaultValue='default'
					/>
				</Field>
			</div>
			<div
				className='collapse'
				tabIndex={0}
			>
				<input
					type='checkbox'
					className='peer min-h-2'
				/>
				<div className='collapse-title font-noto m-0 ml-4 mt-2 min-h-2 py-0 text-sm text-purple-400'>
					+ sub-type
				</div>
				<div
					className={cn(
						'collapse-content peer-checked:collapse-open flex flex-col items-center pb-0 pr-0',
					)}
				>
					<Field
						name='subtype'
						label='Sub-Type'
						width='half'
					>
						<Input
							name='subtype'
							type='text'
						/>
					</Field>
				</div>
			</div>

			<Field
				name='attributes'
				label='Search attribute'
			>
				{attributesList.data && (
					<AttributeTags
						setTags={setAttributes}
						tags={attributes}
						attributesList={attributesList?.data}
					/>
				)}
			</Field>

			<button
				className='bg-accent font-grenze m-y-2 mt-8 flex w-2/3 flex-col items-center justify-center self-center rounded-lg px-4 py-2 text-xl font-bold'
				onClick={e => {
					e.stopPropagation();
					setIsModalVisible(true);
					(
						document.getElementById('attribute-form') as HTMLDialogElement
					).showModal();
				}}
			>
				New attribute
			</button>
			{isModalVisible &&
				createPortal(
					<AttributeForm
						tags={attributes}
						setTags={setAttributes}
						setVisible={setIsModalVisible}
					/>,
					document.body,
				)}
			<Field
				name='flavor'
				label='Flavor'
			>
				<Textarea name='flavor' />
			</Field>
			<Field
				name='description'
				label='Description'
			>
				<Textarea name='description' />
			</Field>
			<button
				className='font-grenze m-y-2 mt-8 flex w-2/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
				onClick={() => setStep(2)}
			>
				Next &#10095;
			</button>
		</div>
	);
};

export default DescriptionStep;
