import ItemSingleShared from '@/components/Items/ItemSingleShared';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/$type/$id/share')({
	component: ItemSingleShared,
});
