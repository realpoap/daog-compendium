import { SpellList } from '@/components/SpellList/SpellList';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spells/')({
  component: SpellList
})

