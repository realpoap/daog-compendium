import BestiaryView from '@/components/Bestiary/BestiaryView';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bestiary/')({
	component: BestiaryView,
});
