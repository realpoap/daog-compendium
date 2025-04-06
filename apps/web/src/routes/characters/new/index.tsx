import CharacterFromScratchView from '@/components/Characters/FromScratch/CharacterFromScratchView';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/characters/new/')({
	component: CharacterFromScratchView,
});
