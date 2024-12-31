import { cn } from '@/utils/classNames';

type Props = {
	title: string;
};
const TitleCollapse = ({ title }: Props) => {
	return (
		<div className='collapse-title min-h-fit px-10 py-0'>
			<div
				className={cn(
					'font-cabin font-stone-200 m-0 border-0 text-sm font-bold text-purple-400',
				)}
			>
				+ {title}
			</div>
		</div>
	);
};

export default TitleCollapse;
