import Sidebar from '@/components/Sidebar/Sidebar';
import { cn } from '@/utils/classNames';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className={cn('min-height-screen items-center md:grid-cols-12 text-stone-900 bg-stone-100 dark:text-stone-100 dark:bg-stone-800')}>
      <Sidebar/>
      <Outlet/>
    </div>
  ),
})