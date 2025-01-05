import { Spell } from '@api/lib/zod-prisma';

type Props = {
	spells: Spell[];
};

const SpellListComponent = ({ spells }: Props) => {
	return (
		<div className='my-4 flex w-full flex-col items-center justify-center gap-2 px-2'>
			<h3 className='font-grenze line mb-1 border-b-2 text-4xl font-semibold tracking-wider'>
				Spells
			</h3>
			<ul>
				{spells.map(s => (
					<li key={s.number}>{s.titleCommon}</li>
				))}
			</ul>
		</div>
	);
};

export default SpellListComponent;
