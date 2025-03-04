import ItemsSearch from '@/components/Items/ItemsSearch'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/items/')({
  component: ItemsSearch,
})
