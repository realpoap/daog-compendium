import { Field, Select } from '@/components/RHFComponents';

import { useFormContext, useWatch } from 'react-hook-form';
import { allSpecies } from 'src/data/speciesProfile';

const CharFormStep4 = () => {
	const { control } = useFormContext();
	const selectedSub = useWatch({ control, name: 'bio.subspecie' });

	const selectSpecies = allSpecies.find(specie => specie.sub === selectedSub);
	const languageOptions = selectSpecies?.languages;

	if (!languageOptions) return;
	return (
		<div>
			<fieldset>
				<Field name='specifics.speaks'>
					<Select
						name='specific.speaks'
						options={languageOptions}
						defaultValue=''
					/>
				</Field>
			</fieldset>
		</div>
	);
};

export default CharFormStep4;
