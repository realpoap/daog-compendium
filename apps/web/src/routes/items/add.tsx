import NewItemPage from '@/components/Items/NewItemPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/add')({
	component: NewItemPage,
});
