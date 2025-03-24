import Sidebar from '@/components/Sidebar/Sidebar';
import { cn } from '@/utils/classNames';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
	component: () => (
		<div
			className={cn(
				'dark:bg-background bg-content text-background dark:text-content h-[100dvh] overflow-y-scroll',
			)}
		>
			<Sidebar />
			<Outlet />
		</div>
	),
});
