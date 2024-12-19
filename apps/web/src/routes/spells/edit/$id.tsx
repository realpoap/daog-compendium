import SpellEdit from '@/components/SpellList/SpellEdit';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spells/edit/$id')({
	component: SpellEdit,
});
