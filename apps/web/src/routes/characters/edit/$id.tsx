import CharacterEdit from '@/components/Characters/CharacterEdit';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/characters/edit/$id')({
	component: CharacterEdit,
});
