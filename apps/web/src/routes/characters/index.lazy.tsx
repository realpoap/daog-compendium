import CharactersView from '@/components/Characters/CharactersView';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/characters/')({
	component: CharactersView,
});
