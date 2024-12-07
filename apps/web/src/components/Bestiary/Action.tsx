import { cn } from '@/utils/classNames';

type ActionProps = {
	name: string;
	dmg: string | number;
	description: string;
	type?: string;
};

const Action = ({ name, dmg, description }: ActionProps) => {
	return (
		<div
			tabIndex={0}
			className='font-noto collapse items-center justify-center rounded-md p-0 text-center text-sm focus:bg-stone-700'
		>
			<div className='collapse-title text-md min-h-fit pb-1 pe-0 ps-0 pt-2 font-medium'>
				<h4 className='text-base font-medium tracking-wide'>{name}</h4>
			</div>
			<div className={cn('collapse-content pb-0')}>
				<p>
					<span>{dmg} dmg</span>
					<span className='mx-2 align-baseline text-sm font-semibold'>|</span>
					<span>{dmg} dmg</span>
				</p>
				<p className='mt-2 italic'>{description}</p>
			</div>
		</div>
	);
};

export default Action;
