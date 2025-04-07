import { Field, InputNumber, Select } from '@/components/RHFComponents';
import {
	creatureAlignmentOptions,
	creatureGenderOptions,
} from '@/types/creatureOptions';

const CharFormStep7 = () => {
	return (
		<div>
			<fieldset>
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
			</fieldset>
		</div>
	);
};

export default CharFormStep7;
