import MonsterDetails from '@/components/Bestiary/MonsterDetails';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bestiary/$id')({
	component: MonsterDetails,
});
