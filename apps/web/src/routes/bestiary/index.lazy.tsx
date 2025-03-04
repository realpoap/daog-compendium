import BestiaryView from '@/components/Bestiary/BestiaryView'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/bestiary/')({
  component: BestiaryView,
})
