import Login from '@/components/User/Login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/me/login')({
	component: Login,
});
