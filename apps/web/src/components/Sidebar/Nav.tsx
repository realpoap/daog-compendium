import { NAV_ITEMS } from '@/styles/constants';
import { cn } from '@/utils/classNames';
import { Link } from '@tanstack/react-router';

const Nav = () => {
	return (
		/*add mixins for repetability */
		<>
			{NAV_ITEMS.map(i => (
				<Link
					key={i.title}
					to={i.path}
					className={cn(
						`z-50 w-full text-center align-middle hover:text-purple-300 [&.active]:font-bold [&.active]:underline`,
					)}
				>
					{i.title}
				</Link>
			))}
		</>
	);
};

export default Nav;
