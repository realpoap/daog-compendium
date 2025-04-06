import { Field, Input, Textarea } from '@/components/RHFComponents';

const CharFormStep8 = () => {
	return (
		<div>
			<fieldset>
				<Field
					name='specifics.bornIn'
					label='Born in'
				>
					<Input name='specifics.bornIn' />
				</Field>
				<Field
					name='specifics.background'
					label='Background'
				>
					<Textarea name='specifics.background'></Textarea>
				</Field>
				<Field
					name='specifics.description'
					label='Description'
				>
					<Textarea name='specifics.description'></Textarea>
				</Field>
			</fieldset>
		</div>
	);
};

export default CharFormStep8;
