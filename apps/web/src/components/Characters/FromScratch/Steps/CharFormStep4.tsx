import { Field, Select } from '@/components/RHFComponents';
import { Language } from '@api/lib/zod-prisma';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { allSpecies } from 'src/data/speciesProfile';

const CharFormStep4 = () => {
	const { setValue, control } = useFormContext();
	const selectedSub = useWatch({ control, name: 'bio.subspecie' });
	const [spokenLanguage, setSpokenLanguage] = useState<Language>();

	const selectSpecies = allSpecies.find(specie => specie.sub === selectedSub);
	const speak = selectSpecies?.specifics.speaks;
	const languageOptions = selectSpecies?.languages;
	console.log(speak);
	console.log(languageOptions);

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
