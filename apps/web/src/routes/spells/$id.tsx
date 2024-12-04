import SpellDetails from '@/components/SpellList/SpellDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/spells/$id')({
  component: SpellDetails,
})

