import { speciesMap } from '@/data/speciesProfile'; // Move your statsMap there
import { masteriesReset, variablesReset } from '@/utils/calculateStats';
import { NewCharacter } from '@api/lib/ZodCharacter';
import { UserWithoutPass } from '@api/lib/ZodUser';
import { UseFormReturn } from 'react-hook-form';

export const setupBasicCharacterFormValues = (
	methods: UseFormReturn<NewCharacter>,
	user?: UserWithoutPass | null,
) => {
	methods.getValues('profile.level');
	setupBio(methods, user);
	setupStatus(methods);

	methods.setValue('profile.variables', variablesReset);
	methods.setValue('profile.boni', variablesReset);

	methods.setValue('path', {});
	methods.setValue('masteries', masteriesReset);
	methods.setValue('specifics', { description: '', background: '' });
	methods.setValue('equipment', {});
};

export const setupCompleteCharacterFormValues = (
	methods: UseFormReturn<NewCharacter>,
	user?: UserWithoutPass | null,
) => {
	methods.setValue('profile.level', 1);
	setupBio(methods, user);
	setupStatus(methods);
	methods.setValue('masteries', masteriesReset);
};

const setupBio = (
	methods: UseFormReturn<NewCharacter>,
	user?: UserWithoutPass | null,
) => {
	const name = methods.getValues('bio.name');
	const subspecies = methods.getValues('bio.subspecies');
	const species = methods.getValues('bio.species');
	const level = methods.getValues('profile.level');

	methods.setValue(
		'fullname',
		`${name} (${subspecies || ''} ${species}) - lvl ${level}`,
	);

	if (user?.id) {
		methods.setValue('bio.creator', user.id);
		methods.setValue('bio.owner', user.id);
	}

	const selectedKey = subspecies || species;
	const selectedSpecies = speciesMap[selectedKey];
	if (selectedSpecies) {
		methods.setValue(
			'profile.statsStarting',
			selectedSpecies.profile.statsStarting,
		);
	}

	methods.setValue(
		'bio.isCaster',
		speciesMap[selectedKey].bio?.isCaster || false,
	);
};

const setupStatus = (methods: UseFormReturn<NewCharacter>) => {
	const levelBonus = Math.floor(methods.getValues('profile.level') / 5);

	methods.setValue('status.health.max', 15 + levelBonus + 1);
	methods.setValue('status.health.current', 15 + levelBonus + 1);
	methods.setValue('status.spirit.max', 15 + levelBonus + 1);
	methods.setValue('status.spirit.current', 15 + levelBonus + 1);
	methods.setValue('status.weight.max', 7);
	methods.setValue('status.weight.current', 0);
	methods.setValue('status.magicLoad.max', 1 + levelBonus);
	methods.setValue('status.magicLoad.current', 0);
};
