import SpellForm from '@/components/SpellList/SpellForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spells/add')({
	component: SpellForm,
});
