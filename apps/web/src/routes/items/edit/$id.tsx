import ItemEdit from '@/components/Items/ItemEdit';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/edit/$id')({
	component: ItemEdit,
});
