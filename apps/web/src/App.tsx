import {
	createHashHistory,
	createRouter,
	RouterProvider,
} from '@tanstack/react-router';
import { resolveValue, Toast, Toaster, ToastIcon } from 'react-hot-toast';
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
				<Toaster toastOptions={{ duration: 1000 }}>
					{(t: Toast) => (
						<div className='toast toast-top toast-center dark:bg-tile text-content rounded-lg bg-stone-200 px-2 py-1 shadow shadow-lg'>
							<div className='flex flex-row'>
								<ToastIcon toast={t} />
								<p className='px-2'>{resolveValue(t.message, t)}</p>
							</div>
						</div>
					)}
				</Toaster>

				<RouterProvider
					router={router}
					basepath='/'
				/>
			</AuthContextProvider>
		</TrpcWrapper>
	);
}
