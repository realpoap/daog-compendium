import { speciesMap } from '@/data/speciesProfile'; // Move your statsMap there
import { masteriesReset, variablesReset } from '@/utils/calculateStats';
import { Masteries, NewCharacter } from '@api/lib/ZodCharacter';
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
	setupSpecieBonus(methods);
	setupActions(methods);
	setupMasteries(methods);

	return methods.getValues();
};

const setupMasteries = (methods: UseFormReturn<NewCharacter>) => {
	console.info('CALCULATING MASTERIES');

	// check if data is here --------------------------------
	if (!methods.getValues('masteries')) {
		console.error('No masteries found');
		return;
	}
	if (!methods.getValues('path.skills')) {
		console.error('No skills found');
		return;
	}
	const masteries: Masteries = methods.getValues('masteries');

	// Loop through skills and update masteries accordingly
	methods?.getValues('path.skills')?.forEach(skill => {
		const skillMast = skill.mastery as keyof Masteries;
		if (!masteries[skillMast] || !skill.playerLevel) return;
		const currentMastery = masteries[skillMast];

		// Update the mastery entry
		masteries[skillMast] = {
			current: currentMastery.current + skill.playerLevel,
			max:
				currentMastery.max < skill.playerLevel
					? skill.playerLevel
					: currentMastery.max,
		};
	});

	console.info('CALCULATED MASTERIES');
	console.dir(masteries);
	methods.setValue('masteries', masteries);
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

	if (subspecies) {
		const selectedKey = subspecies;
		const selectedSpecies = speciesMap[selectedKey];

		methods.setValue('bio.isCaster', selectedSpecies.bio?.isCaster || false);
	}
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

	methods.setValue('path.actionList.limited', levelBonus);
};

const setupSpecieBonus = (methods: UseFormReturn<NewCharacter>) => {
	const species = methods.getValues('bio.subspecies');
	let newInit: number = Number(
		methods.getValues('profile.variables.initiative'),
	);
	let newKnowledge: number = Number(
		methods.getValues('masteries.knowledge.current'),
	);
	switch (species) {
		case 'inclay':
			newInit = newInit - 2;
			methods.setValue('profile.variables.initiative', newInit);
			break;
		case 'republican':
			newKnowledge = newKnowledge + 1;
			methods.setValue('masteries.knowledge.current', newKnowledge);
			break;

		default:
			break;
	}
};

const setupActions = (methods: UseFormReturn<NewCharacter>) => {
	const cel = Math.floor(methods.getValues('profile.statsStarting.CEL') / 10);
	methods.setValue('path.actionList.free', 1);
	methods.setValue('path.actionList.travel', 2);
	methods.setValue('path.actionList.epic', 0);
	methods.setValue('path.actionList.main', cel < 1 ? 1 : cel);
};
