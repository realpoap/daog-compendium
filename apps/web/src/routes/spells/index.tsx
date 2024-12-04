import SpellSearch from '@/components/SpellList/SpellSearch';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spells/')({
  component: SpellSearch
})

