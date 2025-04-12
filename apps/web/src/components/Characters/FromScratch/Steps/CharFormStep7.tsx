import { Field, InputNumber, Select } from '@/components/RHFComponents';
import {
	creatureAlignmentOptions,
	creatureGenderOptions,
} from '@/types/creatureOptions';

// type Props = {
// 	selected: SpecieDataForm | undefined;
// };

const CharFormStep7 = () => {
	return (
		<>
			<Field
				name='specifics.gender'
				width='third'
				label='gender'
			>
				<Select
					name='specifics.gender'
					options={creatureGenderOptions}
					defaultValue=''
					required
				/>
			</Field>
			<div className='flex w-full flex-col items-center justify-center gap-4 sm:flex-row'>
				<Field
					name='specifics.age'
					width='digit'
					label='age'
				>
					<InputNumber name='specifics.age' />
				</Field>
				<Field
					name='specifics.weight'
					width='digit'
					label='weight'
				>
					<InputNumber name='specifics.weight' />
				</Field>
				<Field
					name='specifics.height'
					width='digit'
					label='height'
				>
					<InputNumber name='specifics.height' />
				</Field>
			</div>
			{/* <div className='flex w-full flex-row items-center justify-center gap-2'>
				<Field
					name='specifics.size'
					width='third'
					label='size'
				>
					<Select
						name='specifics.size'
						options={creatureSizeOptions}
						defaultValue=''
						disabled
					/>
				</Field>
				<Field
					name='specifics.massive'
					width='third'
					label='shape'
				>
					<Checkbox
						name='specifics.massive'
						label='massive'
						disabled
						checked={selected?.specifics.massive}
					/>
				</Field>
			</div> */}
			<Field
				name='specifics.alignment'
				width='third'
				label='alignment'
			>
				<Select
					name='specifics.alignment'
					options={creatureAlignmentOptions}
					defaultValue=''
				/>
			</Field>
		</>
	);
};

export default CharFormStep7;
