import SpellSearch from '@/components/SpellList/SpellSearch';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/spells/')({
	component: SpellSearch,
});
