import { trpc } from '@/utils/trpc';
import { SpellSchema } from '@api/lib/zod/modelSchema/SpellSchema';
import { createLazyFileRoute } from '@tanstack/react-router';
import ObjectId from 'bson-objectid';
import { zocker } from 'zocker';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	const mutation = trpc.spells.create.useMutation();
	const sendSpell = () => {
		const id = new ObjectId();
		let spell = zocker(SpellSchema).generate();
		spell.id = id.toString();
		mutation.mutate(spell);
	};
	return (
		<div>
			<h1>Api test</h1>
			<p>{mutation.data?.id}</p>
			<button
				onClick={sendSpell}
				disabled={mutation.isPending}
			>
				Create Spell
			</button>
			{mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
		</div>
	);
}
