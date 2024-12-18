import { trpc } from '@/utils/trpc';
import { createLazyFileRoute } from '@tanstack/react-router';

import spellEntries from '@/data/spellts';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	const query = trpc.hello.get.useQuery({ name: 'Admin' });

	return (
		<p className='text-xl'>
			Message: {query.data?.message}, and server url:{' '}
			{import.meta.env.VITE_API_URL}
		</p>
	);
}

// function Index() {
// const mutation = trpc.spells.create.useMutation();
// const sendSpell = () => {
// 	spellEntries.map(s => {
// 		console.log(s);
// 		mutation.mutate(s);
// 	});
// };

// 	return (
// 		<div>
// 			{/* <h1>Api test</h1>
// 			<p>{mutation.data?.id}</p>
// 			<button
// 				onClick={sendSpell}
// 				disabled={mutation.isPending}
// 			>
// 				Create Spell
// 			</button>
// 			{mutation.error && <p>Something went wrong! {mutation.error.message}</p>} */}
// 		</div>
// 	);
// }
