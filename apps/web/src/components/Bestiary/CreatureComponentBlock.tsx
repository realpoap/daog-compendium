import { CreatureComponent } from '@api/lib/ZodComponent';
import { GiRollingDiceCup } from 'rocketicons/gi';
import Collapsible from '../Collapsible';

type Props = {
	components: CreatureComponent[] | undefined;
};

const CreatureComponentBlock = ({ components }: Props) => {
	return (
		<div className='my-4 flex w-full flex-col items-center justify-center gap-2 px-2'>
			<div className='flex flex-row items-center gap-2'>
				<h3 className='font-grenze text-4xl font-semibold tracking-wider'>
					Scavenge
				</h3>
				<GiRollingDiceCup className='dark:icon-stone-200-2xl hover:icon-primary' />
			</div>

			<Collapsible title='see details'>
				<ul className='flex flex-col justify-start'>
					{components?.map(comp => (
						<li
							className={'flex flex-row justify-start gap-2'}
							key={comp.id}
						>
							<span>{comp.name}</span>
						</li>
					))}
				</ul>
			</Collapsible>
		</div>
	);
};

export default CreatureComponentBlock;
