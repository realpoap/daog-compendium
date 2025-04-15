import { Checkbox, Field, Input } from '@/components/RHFComponents';

const CharFormStep1 = () => {
	return (
		<fieldset>
			<Field
				name='bio.name'
				label='Full Name'
			>
				<Input
					name='bio.name'
					type='text'
				/>
			</Field>
			<Field
				name='bio.surname'
				label='Nickname'
			>
				<Input
					name='bio.surname'
					type='text'
				/>
			</Field>

			<Field
				name='bio.isPun'
				label=''
			>
				<Checkbox
					name='bio.isPun'
					label='this name qualify as a pun'
				/>
			</Field>
		</fieldset>
	);
};

export default CharFormStep1;
