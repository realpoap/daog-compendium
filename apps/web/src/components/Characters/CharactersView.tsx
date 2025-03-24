import { trpc } from '@/utils/trpc';
import { FiEdit } from 'rocketicons/fi';
import { SmallCircleButton } from '../Buttons';
import Collapsible from '../Collapsible';
import TitleCount from '../TitleCount';
import CharacterNewForm from './Character NewForm';

const CharactersView = () => {
	const getAllCharacters = trpc.characters.getAll.useQuery(undefined, {
		enabled: true,
	});

	if (!getAllCharacters.data)
		return (
			<div className='font-grenze mt-10 flex flex-col items-center justify-center gap-2'>
				<h3 className='text-4xl'>Collecting resources</h3>
				<span className='font-cabin italic'>
					Please wait while we search for the knowledge within the library ...
				</span>
				<progress className='progress w-56'></progress>
			</div>
		);
	return (
		<div className='mt-sm flex h-[100dvh] flex-col items-center px-2'>
			<div className='h-content dark:from-background container sticky top-8 z-10 flex min-h-[25dvh] w-full flex-col items-center bg-gradient-to-b from-stone-100 from-80% pb-8'>
				<h1 className='font-grenze dark:text-primary text-secondary sticky z-10 mx-auto my-4 text-center text-6xl font-bold tracking-wide md:mt-8'>
					Characters
					{getAllCharacters.data && (
						<TitleCount number={getAllCharacters.data.length} />
					)}
				</h1>
				<Collapsible title='new character'>
					<CharacterNewForm />
				</Collapsible>
			</div>

			<div className='w-full md:w-1/2'>
				<ul className='list bg-base-100 rounded-box shadow-md'>
					{getAllCharacters.data?.map(char => (
						<li
							className='list-row text-neutral font-cabin cursor-pointer'
							key={char.fullname}
						>
							<div className='bg-tile flex size-10 items-center justify-center rounded-full'>
								<span className='font-grenze text-primary text-3xl'>
									{char.name.charAt(0)}
								</span>
							</div>
							<div>
								<div className='text-primary text-base font-semibold'>
									{char.name}
								</div>
								<div className='text-neutral-content text-sm capitalize'>
									{char.subspecies || ''} {char.species}
								</div>
							</div>
							<div className='text-neutral-content'>Lvl. {char.level}</div>
							{
								<SmallCircleButton
									color='bg-accent'
									onClick={e => {
										e.stopPropagation();
									}}
								>
									<FiEdit className='icon-stone-900-sm' />
								</SmallCircleButton>
							}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CharactersView;
