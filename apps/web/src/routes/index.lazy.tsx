import { trpc } from '@/utils/trpc';
import { SpellSchema } from '@api/lib/zod/modelSchema/SpellSchema';
import { createLazyFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import spellEntries from '@/data/spellts';

const SpellNewSchema = SpellSchema.omit({ id: true });
type SpellNew = z.infer<typeof SpellNewSchema>;

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	// const mutation = trpc.spells.create.useMutation();
	// const sendSpell = () => {
	// 	spellEntries.map(s => {
	// 		console.log(s);
	// 		mutation.mutate(s);
	// 	});
	// };

	return (
		<div>
			{/* <h1>Api test</h1>
			<p>{mutation.data?.id}</p>
			<button
				onClick={sendSpell}
				disabled={mutation.isPending}
			>
				Create Spell
			</button>
			{mutation.error && <p>Something went wrong! {mutation.error.message}</p>} */}
		</div>
	);
}
