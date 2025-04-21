import { useCharacterForm } from '@/store/characterContext';

import { useEffect } from 'react';
import BourguignonFormBlock from './StepsComponents/Blocks/BourguignonFormBlock';
import LanguagesFormBlock from './StepsComponents/Blocks/LanguagesFormBlock';

const CharFormStep4 = () => {
	const { methods, formData } = useCharacterForm();
	const selectedSub = methods.getValues('bio.subspecies');
	//const [specificities, setSpecificities] = useState({});

	//const [skillChoices, setSkillChoices] = useState<CharacterSkill[]>([]);

	useEffect(() => {
		methods.setValue('path.skills', formData.path?.skills);
	}, [formData.path?.skills]);

	// Species specificities assessment
	// switch (selectedSub) {
	// 	case 'bourguignon':
	// 		if (toggle) toggle.indeterminate = true;
	// 		setSpecificities({ number: 1, mastery: 'art' });
	// 		break;
	// 	case 'pipourray':
	// 		setSpecificities({ number: 2, mastery: 'art' });
	// 		break;

	// 	default:
	// 		break;
	// }

	return (
		<>
			<LanguagesFormBlock />
			{selectedSub === 'bourguignon' && <BourguignonFormBlock />}
			<div className='transition-all duration-300'>
				{formData.path?.skills?.map(skill => (
					<div
						key={skill.id}
						className='flex items-center justify-between rounded border-b p-2 hover:bg-stone-800'
					>
						<span className='text-base font-semibold'>{skill.name}</span>
						<span className='badge badge-accent'>{skill.playerPoints} pts</span>
					</div>
				))}
			</div>
		</>
	);
};

export default CharFormStep4;
