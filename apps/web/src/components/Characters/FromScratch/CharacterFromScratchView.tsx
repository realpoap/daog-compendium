import TitleBack from '@/components/TitleBack';
import { CharacterFormContextProvider } from '@/store/characterContext';
import CharacterFormNavigation from './CharacterFormNavigation';

const CharacterFromScratchView = () => {
	return (
		<CharacterFormContextProvider>
			<div className='flex w-full flex-col items-center px-4'>
				<TitleBack title='New Character' />
				<CharacterFormNavigation />
			</div>
		</CharacterFormContextProvider>
	);
};

export default CharacterFromScratchView;
