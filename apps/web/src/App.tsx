import {
	RouterProvider,
	createHashHistory,
	createRouter,
} from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';
import { TrpcWrapper } from './components/TrpcWrapper';
import './index.css';
import { routeTree } from './routeTree.gen';
import { AuthContextProvider } from './store/authContext';

const hashHistory = createHashHistory();

const router = createRouter({
	routeTree,
	history: hashHistory,
	//context: { auth: undefined },
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export function App() {
	return (
		<TrpcWrapper>
			<AuthContextProvider>
				<Toaster />
				<RouterProvider
					router={router}
					basepath='/daog-compendium/'
				/>
			</AuthContextProvider>
		</TrpcWrapper>
	);
}
