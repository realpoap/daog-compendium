import { Field, Select } from '@/components/RHFComponents';

const CharFormStep9 = () => {
	return (
		<div>
			<fieldset>
				<Field
					name='path.talentTree'
					label='Talent tree'
				>
					<Select
						name='path.talentTree'
						options={['Adroitness', 'Constitution', 'Perception', 'Shroudness']}
						defaultValue=''
					/>
				</Field>
			</fieldset>
		</div>
	);
};

export default CharFormStep9;
