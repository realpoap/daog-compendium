import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import superjson from 'superjson';

import { trpc } from '@/utils/trpc';

export function TrpcWrapper({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: import.meta.env.VITE_API_URL + '/trpc',
					transformer: superjson,
					// You can pass any HTTP headers you wish here
					async headers() {
						return {
							'Access-Control-Allow-Origin': '*', // Adjust this as needed for your CORS policy
						};
					},
				}),
			],
		}),
	);

	return (
		<trpc.Provider
			client={trpcClient}
			queryClient={queryClient}
		>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}
