import Register from '@/components/User/Register';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/me/register')({
	component: Register,
});
