import NewCreaturePage from '@/components/Bestiary/NewCreature/NewCreaturePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bestiary/add')({
	component: NewCreaturePage,
});
