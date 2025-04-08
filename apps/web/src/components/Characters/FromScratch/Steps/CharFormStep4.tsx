import { Field, Select } from '@/components/RHFComponents';

import { useFormContext, useWatch } from 'react-hook-form';
import { allSpecies, SpecieDataForm } from 'src/data/speciesProfile';

type Props = {
	selected: SpecieDataForm | undefined;
};

const CharFormStep4 = ({ selected }: Props) => {
	const { control } = useFormContext();
	const selectedSub = useWatch({ control, name: 'bio.subspecie' });

	const selectSpecies = allSpecies.find(specie => specie.sub === selectedSub);

	const languageOptions = selectSpecies?.languages;

	if (!languageOptions) return;
	return (
		<fieldset>
			<Field name='specifics.speaks'>
				<Select
					name='specific.speaks'
					options={languageOptions}
					defaultValue=''
				/>
			</Field>
		</fieldset>
	);
};

export default CharFormStep4;
