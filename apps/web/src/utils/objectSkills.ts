import { skillsData } from '@/data/skillsData';

import { CharacterSkill } from '@api/lib/ZodCharacter';

export const setObjectSkills = (skilllist: Array<string>) => {
	const objectSkills: CharacterSkill[] = []; // reset skill object
	skilllist.map(skill => {
		const foundSkill = skillsData.find(data => data.id === skill); // get the skill from the skill list based on the id on species
		// recreate CharacterSkill object
		if (foundSkill) {
			const foundCharSkill = {
				...foundSkill,
				playerPoints: 0,
				playerLevel: 1,
			};
			objectSkills.push(foundCharSkill); // add skill to list
		}
	});
	return objectSkills;
};

export const deduplicateSkills = (skills: CharacterSkill[]) => {
	const skillMap = new Map<string, CharacterSkill>();

	skills.map(skill => {
		if (skillMap.has(skill.id)) {
			// If duplicate, increment playerPoints of existing one
			const existing = skillMap.get(skill.id)!;
			if (existing.playerPoints !== null) existing.playerPoints += 1;
		} else {
			// Clone the skill to avoid mutating original objects
			skillMap.set(skill.id, { ...skill });
		}
	});

	return Array.from(skillMap.values());
};
