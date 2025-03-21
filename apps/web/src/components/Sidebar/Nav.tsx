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
						`[&.active]:underline-primary z-50 w-full text-center align-middle [&.active]:font-bold [&.active]:underline [&.active]:underline-offset-4`,
					)}
				>
					{i.title}
				</Link>
			))}
		</>
	);
};

export default Nav;
