import Sidebar from '@/components/Sidebar/Sidebar';
import { cn } from '@/utils/classNames';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
	component: () => (
		<div
			className={cn(
				'min-height-[dvh] items-center bg-stone-100 text-stone-900 md:grid-cols-12 dark:bg-stone-800 dark:text-stone-100',
			)}
		>
			<Sidebar />
			<Outlet />
		</div>
	),
});
