import { spellOptions } from '@/types/spellOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { SpellSchema } from '@api/lib/zod-prisma/index';
import { useParams, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { GiBrain, GiDrop, GiHeartPlus, GiSwordWound } from 'rocketicons/gi';
import { z } from 'zod';

type Spell = z.infer<typeof SpellSchema>;

const SpellDetails = () => {
	const { history } = useRouter();
	const { id } = useParams({ strict: false });
	const [spell, setSpell] = useState<Spell | undefined>();
	const query = trpc.spells.getByNumber.useQuery(Number(id));

	useEffect(() => {
		if (query.isLoading) {
			return console.log('loading single spell...');
		}
		if (query.data) {
			setSpell(query.data);
		}
	}, [query.data]);

	const icon = spellOptions.find(o => {
		if (
			o.label.toLowerCase() === spell?.type.toLowerCase() ||
			o.value === spell?.type.toLowerCase()
		) {
			return o.icon;
		}
	});
	console.log(spell?.type, icon);

	return (
		<div className='flex flex-col justify-center'>
			<button
				className='font-grenze mt-1 align-middle text-2xl text-stone-500 hover:text-stone-200'
				onClick={() => history.go(-1)}
			>
				<span className='text-2xl'>&#8249;</span> Back
			</button>

			<div className='mt-4 flex flex-col items-center text-center'>
				<div className='size-10 items-center overflow-clip rounded-full border-0 align-middle'>
					<span className='relative mb-2 inline-block'>{icon?.icon}</span>
				</div>
				<span className='text-md font-noto text-stone-500'>
					~ {spell?.number} ~
				</span>
				<p
					className={cn(
						'font-grenze text-4xl font-extrabold tracking-wider text-purple-900 dark:text-purple-400',
					)}
				>
					{spell?.titleCommon}
				</p>
				<p
					className={cn(
						'font-noto text-md font-bold tracking-wider text-purple-900 opacity-80 dark:text-purple-400',
					)}
				>
					{spell?.titleGlaise}
				</p>
				<div className='font-noto my-4 flex w-full flex-row items-baseline justify-center align-baseline dark:text-stone-200'>
					<span className='text-md text- mr-1 align-baseline font-semibold capitalize'>
						{spell?.type}
					</span>
					<span className='text-md mx-2 align-baseline font-semibold'>|</span>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiDrop className='icon-stone-900 dark:icon-stone-100 icon-md' />
						{spell?.level}
					</span>
					<span className='text-md mx-2 align-baseline font-semibold'>|</span>
					<span className='text-md font-noto align-baseline font-semibold'>
						<GiBrain className='icon-stone-900 dark:icon-stone-100 icon-md mr-1' />
						{spell?.difficulty}
					</span>
				</div>
				<div
					className={cn(
						'font-noto mt-1 max-w-72 text-sm italic text-stone-700 md:line-clamp-none md:max-w-xl dark:text-stone-400',
					)}
				>
					{spell?.description}
				</div>
				<div className='font-noto text-wider my-4 flex flex-col gap-1 align-baseline text-sm font-medium'>
					<p>Effects : {spell?.effects}</p>
					<p>Duration : {spell?.duration}</p>
					<p>Range : {spell?.range}</p>
					<p>Target : {spell?.target}</p>
				</div>
				<div>
					<span className='align-baseline text-sm font-semibold'>
						<GiSwordWound className='icon-stone-900 dark:icon-stone-100 icon-md mr-2' />
						{spell?.damages || '~'}
					</span>
					<span className='mx-4 align-baseline text-sm font-semibold'>|</span>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiHeartPlus className='icon-stone-900 dark:icon-stone-100 icon-md mr-2' />
						{spell?.heal || '~'}
					</span>
				</div>
			</div>
		</div>
	);
};

export default SpellDetails;
