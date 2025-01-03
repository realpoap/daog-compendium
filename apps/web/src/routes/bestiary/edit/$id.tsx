import MonsterEdit from '@/components/Bestiary/MonsterEdit';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bestiary/edit/$id')({
	component: MonsterEdit,
});
