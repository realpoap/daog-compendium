import ItemsSearch from '@/components/Items/ItemsSearch';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/')({
	component: ItemsSearch,
});
