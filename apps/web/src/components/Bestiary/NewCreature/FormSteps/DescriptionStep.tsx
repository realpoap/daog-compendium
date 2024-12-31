import {
	creatureAlignmentOptions,
	creatureSizeOptions,
	creatureTypeOptions,
} from '@/types/creatureOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Attribute } from '@api/lib/zod-prisma';
import { CreatureAttribute, NewCreature } from '@api/lib/ZodCreature';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { RiArrowDropRightLine } from 'rocketicons/ri';
import {
	Checkbox,
	Field,
	Input,
	Select,
	Textarea,
} from '../../../RHFComponents';
import { AttributeTags } from '../../utils/AttributeTags';

const DescriptionStep = ({
	setValue,
	handleNext,
}: {
	setValue: UseFormSetValue<NewCreature>;
	handleNext: (
		inputs: (keyof NewCreature)[],
		nextStep: number,
	) => Promise<void>;
}) => {
	const [attributes, setAttributes] = useState<string[]>([]);
	const attributesList = trpc.attributes.getAll.useQuery();

	useEffect(() => {
		if (attributesList.data) {
			const list: Attribute[] = attributesList.data;
			let attObjects = [] as CreatureAttribute[];
			attributes?.map(att => {
				const attObject = list.find(el => el.name === att);
				if (attObject) {
					const { id, ...rest } = attObject;
					attObjects.push(rest);
				}
			});
			console.log(attObjects);
			setValue('attributes', attObjects as CreatureAttribute[]);
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
					label='is legendary'
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
						defaultValue=''
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
						defaultValue=''
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
						defaultValue=''
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
				<div className='collapse-title font-cabin m-0 ml-4 mt-2 min-h-2 py-0 text-sm text-purple-400'>
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
				{attributesList.data?.length !== 0 && attributesList?.data ? (
					<AttributeTags
						setTags={setAttributes}
						tags={attributes}
						attributesList={attributesList?.data}
					/>
				) : (
					<div className='skeleton rounded-btn h-11 w-full dark:bg-stone-700'></div>
				)}
			</Field>
			<Field
				name='flavor'
				label='Flavor'
			>
				<Input name='flavor' />
			</Field>
			<Field
				name='description'
				label='Description'
			>
				<Textarea name='description' />
			</Field>
			<button
				className='font-cabin m-y-2 disabled:glass mt-8 flex w-2/3 flex-row items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold uppercase transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
				onClick={() =>
					handleNext(
						[
							'name',
							'type',
							'alignment',
							'rank',
							'subtype',
							'flavor',
							'description',
							'isBoss',
							'size',
						],
						2,
					)
				}
				type='button'
			>
				Next <RiArrowDropRightLine className='icon-stone-200-2xl' />
			</button>
		</div>
	);
};

export default DescriptionStep;
