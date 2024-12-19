import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';
import { TrpcWrapper } from './components/TrpcWrapper';
import './index.css';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export function App() {
	return (
		<TrpcWrapper>
			<Toaster />
			<RouterProvider
				router={router}
				basepath='/daog-compendium/'
			/>
		</TrpcWrapper>
	);
}
