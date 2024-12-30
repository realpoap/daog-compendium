import { cn } from '@/utils/classNames';
import { CreatureAction } from '@api/lib/ZodAction';

type ActionProps = {
	action: CreatureAction;
};

const Action = ({ action }: ActionProps) => {
	if (action) {
		return (
			<div
				tabIndex={0}
				className='font-noto collapse items-center justify-center rounded-md p-0 text-center text-sm focus:bg-stone-700'
			>
				<div className='collapse-title text-md min-h-fit pb-1 pe-0 ps-0 pt-2 font-medium'>
					<h4 className='text-base font-medium tracking-wide'>{action.name}</h4>
				</div>
				<div className={cn('collapse-content pb-0')}>
					<p>
						<span>{action.type}</span>
						<span>{action.damages} dmg</span>
					</p>
					<p className='mt-2 italic'>{action.description}</p>
					<p className='mt-2 italic'>{action.target}</p>
					<p className='mt-2 italic'>{action.range}</p>
				</div>
			</div>
		);
	}
};

export default Action;
