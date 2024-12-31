import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { CreatureAction } from '@api/lib/zod-prisma';
import { CreatureAttribute } from '@api/lib/ZodCreature';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
	GiBullseye,
	GiCheckedShield,
	GiCrownedSkull,
	GiGlassHeart,
	GiSwordWound,
} from 'rocketicons/gi';
import Ability from './Ability';
import Action from './Action';
import ActionForm from './utils/ActionForm';
import AttributeForm from './utils/AttributeForm';

const MonsterDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams({ strict: false });
	const [actions, setActions] = useState<CreatureAction[]>([]);
	const [attributes, setAttributes] = useState<CreatureAttribute[]>([]);

	const monsterById = trpc.creatures.getById.useQuery(id as string);

	useEffect(() => {
		if (monsterById.data) {
			monster?.actions && setActions(monster?.actions);
			monster?.attributes && setAttributes(monster?.attributes);
		}
	}, [monsterById.data]);

	if (monsterById.isPending) {
		return <div>loading</div>;
	}

	const monster = monsterById.data;

	return (
		<div className='item-center flex flex-col'>
			<div className='align-center flex flex-col items-center justify-center gap-2'>
				<button
					className='font-grenze mt-1 align-middle text-2xl text-stone-500 hover:text-stone-200'
					onClick={() =>
						navigate({
							to: '/bestiary',
						})
					}
				>
					<span className='text-2xl'>&#8249;</span> Back
				</button>

				<div className='align-center relative mt-4 flex flex-col content-center text-wrap p-4 text-center'>
					<div className='min-w-54 mx-2 w-min'>
						<h3
							className={cn(
								'font-grenze text-wrap text-4xl font-extrabold tracking-wider text-purple-900 dark:text-purple-400',
							)}
						>
							{monster?.name}
						</h3>
						{monster?.isBoss && (
							<div className='badge badge-accent badge-lg absolute -right-2 top-2 size-6 animate-bounce content-center items-center rounded-full p-0 shadow-sm shadow-stone-900'>
								<GiCrownedSkull className='dark:icon-stone-800-sm' />
							</div>
						)}
					</div>
					<p className='text-md font-noto align-baseline font-semibold italic text-stone-500'>
						{monster?.size} {monster?.alignment} {monster?.type}
					</p>
				</div>
				<div
					className={cn(
						'font-noto max-w-72 text-center text-sm italic text-stone-700 md:line-clamp-none md:max-w-xl dark:text-stone-400',
					)}
				>
					{monster?.description}
				</div>
				<div className='align-center mt-4 flex flex-col items-center justify-center text-center'>
					<div className='relative flex'>
						<GiGlassHeart className='icon-red-500 icon-xl absolute animate-ping opacity-20' />
						<GiGlassHeart className='icon-red-500 icon-xl relative drop-shadow-md' />
					</div>
					<p className='font-noto align-baseline text-sm font-semibold text-red-500'>
						{monster?.health}
					</p>
					<p className='font-noto align-baseline text-sm font-medium text-stone-500'>
						(1d3 +{monster?.stats?.VIT && Math.floor(monster?.stats?.VIT / 10)})
					</p>
				</div>
				<div>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiSwordWound className='icon-stone-900 dark:icon-stone-100 icon-md mr-2' />
						{monster?.attack || '~'}
					</span>
					<span className='mx-4 align-baseline text-sm font-semibold'>|</span>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiBullseye className='icon-stone-900 dark:icon-stone-100 icon-md mr-2' />
						{monster?.ranged || '~'}
					</span>
					<span className='mx-4 align-baseline text-sm font-semibold'>|</span>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiCheckedShield className='icon-stone-900 dark:icon-stone-100 icon-md mr-2' />
						{monster?.defense || '~'}
					</span>
				</div>
				<button
					className='bg-accent font-cabin m-y-2 mt-8 flex max-h-fit max-w-fit flex-col items-center justify-center self-center rounded-full px-8 py-2 text-base font-extrabold uppercase text-stone-900 transition-all duration-100 hover:ring-2 hover:ring-stone-200'
					onClick={e => {
						e.stopPropagation();

						(
							document.getElementById('attribute-form') as HTMLDialogElement
						).showModal();
					}}
				>
					Add attribute
				</button>
				{createPortal(
					<AttributeForm
						id={monster?.id as string}
						attributes={attributes}
						setAttributes={setAttributes}
					/>,
					document.body,
				)}
				{monster?.attributes && (
					<div className='flex w-full flex-row flex-wrap items-center justify-center gap-2 overflow-visible px-2'>
						{attributes.map(a => (
							<Ability
								key={a.name}
								name={a.name}
								description={a.description ?? ''}
							/>
						))}
					</div>
				)}

				<button
					className='bg-accent font-cabin m-y-2 mt-8 flex max-h-fit max-w-fit flex-col items-center justify-center self-center rounded-full px-8 py-2 text-base font-extrabold uppercase text-stone-900 transition-all duration-100 hover:ring-2 hover:ring-stone-200'
					onClick={e => {
						e.stopPropagation();

						(
							document.getElementById('action-form') as HTMLDialogElement
						).showModal();
					}}
				>
					Add action
				</button>
				{createPortal(
					<ActionForm
						id={monster?.id as string}
						name={monster?.name as string}
						actions={actions}
						setActions={setActions}
					/>,
					document.body,
				)}
				<div className='flex w-1/2 flex-col items-center justify-center px-2'>
					<h3 className='font-grenze line mb-1 border-b-2 text-2xl font-semibold tracking-wider'>
						Actions
					</h3>
					{actions
						?.filter(a => a.action !== 'epic')
						.map(a => (
							<Action
								key={a.name}
								action={a}
							/>
						))}
				</div>

				{monster?.isBoss && (
					<div className='flex w-1/2 flex-col items-center justify-center px-2'>
						<h3 className='font-grenze line mb-1 border-b-2 text-2xl font-semibold tracking-wider'>
							Epics
						</h3>
						{actions
							?.filter(a => a.action === 'epic')
							.map(a => (
								<Action
									key={a.name}
									action={a}
								/>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MonsterDetails;
