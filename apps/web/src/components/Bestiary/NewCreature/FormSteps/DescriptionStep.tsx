import { ActionButton } from '@/components/Buttons';
import Collapsible from '@/components/Collapsible';
import MultiSelect from '@/components/RHFComponents/MultiSelect';
import {
	creatureAlignmentOptions,
	creatureHabitatOptions,
	creatureSizeOptions,
	creatureTypeOptions,
} from '@/types/creatureOptions';
import { trpc } from '@/utils/trpc';
import { Attribute, HabitatTypeType } from '@api/lib/zod-prisma';
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
	const [habitats, setHabitats] = useState<string[]>([]);
	const attributesList = trpc.attributes.getAll.useQuery();

	useEffect(() => {
		if (attributesList.data) {
			const list: Attribute[] = attributesList.data;
			const attObjects = [] as CreatureAttribute[];
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

	useEffect(() => {
		setValue('habitat', habitats as HabitatTypeType[]);
	}, [habitats]);

	return (
		<div className='flex h-full w-full flex-col items-center justify-start'>
			<Field
				name='name'
				label='Name'
			>
				<Input
					name='name'
					type='text'
				/>
			</Field>

			<div className='flex w-full flex-row gap-2 px-4 md:w-1/2 md:gap-8'>
				<Field
					name='isBoss'
					label=''
					width='full'
				>
					<Checkbox
						name='isBoss'
						label='legendary creature'
					/>
				</Field>
				<Field
					name='isCaster'
					label=''
				>
					<Checkbox
						id='magicdomain'
						name='isCaster'
						label='magic user'
					/>
				</Field>
			</div>
			<div className='flex w-full justify-center gap-2 px-4 md:flex-row'>
				<Field
					name='type'
					label='Type'
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
				>
					<Select
						name='alignment'
						options={creatureAlignmentOptions}
						defaultValue=''
					/>
				</Field>
			</div>
			<Collapsible title='add details'>
				<Field
					name='habitat'
					label='Habitat'
				>
					<MultiSelect
						name='habitat'
						list={creatureHabitatOptions}
						values={habitats}
						setValues={setHabitats}
						placeholder='Select one or several habitat'
					/>
				</Field>
				<Field
					name='subtype'
					label='Sub-Type'
				>
					<Input
						name='subtype'
						type='text'
					/>
				</Field>
				<Field
					name='flavor'
					label='Flavor'
				>
					<Input name='flavor' />
				</Field>
			</Collapsible>
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
				name='description'
				label='Description'
			>
				<Textarea name='description' />
			</Field>
			<ActionButton
				color='primary'
				textColor='stone-800'
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
				<span className='pl-4 align-middle'>
					Next <RiArrowDropRightLine className='icon-stone-800-base' />
				</span>
			</ActionButton>
		</div>
	);
};

export default DescriptionStep;
