import Sidebar from '@/components/Sidebar/Sidebar';
import { cn } from '@/utils/classNames';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
	component: () => (
		<div
			className={cn(
				'h-[100dvh] overflow-y-scroll bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-200',
			)}
		>
			<Sidebar />
			<Outlet />
		</div>
	),
});
