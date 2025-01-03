import { useAuth } from '@/store/authContext';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { NewAction } from '@api/lib/ZodAction';
import { CreatureAttribute } from '@api/lib/ZodCreature';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiEdit, FiPlus } from 'rocketicons/fi';
import {
	GiArmorVest,
	GiBullseye,
	GiCheckedShield,
	GiCrownedSkull,
	GiFairyWand,
	GiGlassHeart,
	GiRoundStar,
	GiSemiClosedEye,
	GiSwordWound,
} from 'rocketicons/gi';
import { RiCloseFill } from 'rocketicons/ri';
import { ActionButton, SmallCircleButton } from '../Buttons';
import Collapsible from '../Collapsible';
import Ability from './Ability';
import ActionComponent from './ActionComponent';
import StatsTable from './StatsTable';
import ActionForm from './utils/ActionForm';
import AttributeForm from './utils/AttributeForm';

const MonsterDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams({ strict: false });
	const [actions, setActions] = useState<NewAction[]>([]);
	const [attributes, setAttributes] = useState<CreatureAttribute[]>([]);

	const monsterById = trpc.creatures.getById.useQuery(id as string);
	const [edit, setEdit] = useState(false);

	const { user } = useAuth();
	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';

	useEffect(() => {
		if (monsterById.data) {
			if (monster?.actions) setActions(monster?.actions);
			if (monster?.attributes) setAttributes(monster?.attributes);
		}
	}, [monsterById.data]);

	if (monsterById.isPending) {
		return <div>loading</div>; // TODO: add skeleton
	}

	const monster = monsterById.data;

	return (
		<div className='item-center flex flex-col'>
			<div className='align-center flex flex-col items-center justify-center gap-2'>
				<button
					className='font-cabin mt-1 max-h-fit max-w-fit px-8 py-2 align-middle text-base uppercase text-stone-500 hover:text-stone-200'
					onClick={() =>
						navigate({
							to: '/bestiary',
						})
					}
				>
					<span className='text-2xl'>&#8249;</span> Back
				</button>

				<div className='align-center relative mt-4 flex flex-col items-center justify-center text-wrap text-center'>
					<div className='w-full'>
						<h3
							className={cn(
								'font-grenze text-wrap text-center text-4xl font-extrabold tracking-wider text-purple-900 dark:text-purple-400',
							)}
						>
							{monster?.name}
						</h3>
						{monster?.isBoss && (
							<div className='badge badge-lg bg-goldenrod-500 glass absolute -right-4 -top-1 size-6 animate-bounce content-center items-center rounded-full border-0 p-0 shadow-sm shadow-stone-900'>
								<GiCrownedSkull className='dark:icon-stone-800-sm align-baseline' />
							</div>
						)}
					</div>
					<p
						className={cn(
							`text-md font-cabin animate-text bg-clip-text align-middle font-bold italic text-transparent`,
							{
								'bg-gradient-to-r from-stone-300 via-blue-300 to-stone-300':
									monster?.alignment === 'saint',
								'bg-gradient-to-r from-stone-500 via-teal-500 to-stone-500':
									monster?.alignment === 'good',
								'via-accent bg-gradient-to-r from-stone-500 to-stone-500':
									monster?.alignment === 'neutral',
								'bg-gradient-to-r from-stone-500 via-red-500 to-stone-500':
									monster?.alignment === 'bad',
								'bg-gradient-to-r from-stone-500 via-rose-900 to-stone-500':
									monster?.alignment === 'evil',
							},
						)}
					>
						{monster?.size} {monster?.alignment} {monster?.type}
					</p>
				</div>
				{monster?.level !== 0 && (
					<div
						className={cn(
							'relative flex flex-col items-center justify-center text-center',
							{ 'animate-shake': monster?.level > 30 },
						)}
					>
						<GiRoundStar className='icon-4xl icon-primary relative inline-block' />
						<span className='font-grenze absolute top-2 z-50 inline-block text-base font-bold dark:text-stone-800'>
							{monster?.level}
						</span>
					</div>
				)}
				<div
					className={cn(
						'font-noto max-w-72 text-center text-sm italic text-stone-700 md:line-clamp-none md:max-w-xl dark:text-stone-400',
					)}
				>
					{monster?.description}
				</div>
				{monster?.attributes && (
					<div className='flex w-full flex-row flex-wrap items-center justify-center gap-2 overflow-visible px-2 align-middle'>
						{attributes.map(a => (
							<Ability
								edit={edit}
								key={a.name}
								name={a.name}
								creatureId={monster.id}
								attributes={attributes}
								setAttributes={setAttributes}
								description={a.description ?? ''}
							/>
						))}

						{isEditor && edit && (
							<>
								<SmallCircleButton
									onClick={e => {
										e.stopPropagation();
										(
											document.getElementById(
												'attribute-form',
											) as HTMLDialogElement
										).showModal();
									}}
								>
									<FiPlus className='icon-stone-900' />
								</SmallCircleButton>
								{createPortal(
									<AttributeForm
										id={monster?.id as string}
										attributes={attributes}
										setAttributes={setAttributes}
									/>,
									document.body,
								)}
							</>
						)}
						<SmallCircleButton
							onClick={e => {
								e.stopPropagation();
								setEdit(!edit);
							}}
							color={edit ? 'bg-red-500' : undefined}
						>
							{!edit ? (
								<FiEdit className='icon-stone-900-sm' />
							) : (
								<RiCloseFill className='icon-stone-900' />
							)}
						</SmallCircleButton>
					</div>
				)}
				<div className='align-center mt-4 flex flex-col items-center justify-center text-center'>
					<div className='relative flex'>
						<GiGlassHeart className='icon-red-500 icon-2xl absolute animate-ping opacity-30' />
						<GiGlassHeart className='icon-red-500 icon-2xl relative drop-shadow-md' />
					</div>
					<p className='font-noto align-baseline text-lg font-semibold text-red-500'>
						{monster?.health}
					</p>
					<p className='font-noto align-baseline text-sm font-light text-stone-500'>
						(1d3 +{monster?.stats?.VIT && Math.floor(monster?.stats?.VIT / 10)})
					</p>
				</div>

				<ul className='font-cabin flex w-1/2 list-none flex-row flex-wrap items-center justify-center gap-2 pt-4 align-middle text-base font-semibold md:w-full'>
					<span className='after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiSwordWound className='icon-stone-900 dark:icon-stone-100 icon-base mr-2' />
						{monster?.attack || '~'}
					</span>
					<span className='after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiBullseye className='icon-stone-900 dark:icon-stone-100 icon-base mr-2' />
						{monster?.ranged || '~'}
					</span>
					<span className='after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiCheckedShield className='icon-stone-900 dark:icon-stone-100 icon-base mr-2' />
						{monster?.defense || '~'}
					</span>
					<span className='after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiArmorVest className='icon-stone-900 dark:icon-stone-100 mr-2 size-5' />
						{monster?.armor || '~'}
					</span>
					<span className='after:pl-2 after:text-stone-500 after:content-["|"]'>
						<GiSemiClosedEye className='icon-stone-900 dark:icon-stone-100 icon-sm mr-2' />
						{monster?.perception || '~'}
					</span>
					<span>
						<GiFairyWand className='icon-stone-900 dark:icon-stone-100 icon-sm mr-2' />
						{monster?.magic || '~'}
					</span>
				</ul>
				{monster && (
					<div className='md:w-[54dvw]'>
						<Collapsible title='show stats'>
							<StatsTable creature={monster} />
						</Collapsible>
					</div>
				)}

				{isEditor && (
					<>
						{createPortal(
							<ActionForm
								id={monster?.id as string}
								name={monster?.name as string}
								actions={actions}
								setActions={setActions}
							/>,
							document.body,
						)}
					</>
				)}

				<ActionComponent
					actions={actions}
					setActions={setActions}
					creatureId={monster?.id as string}
					creatureName={monster?.name as string}
				/>
			</div>
			{isEditor && (
				<ActionButton
					onClick={() =>
						navigate({
							to: `/bestiary/edit/$id`,
							params: { id: `${monster?.id}` },
						})
					}
					color='accent'
					textColor='stone-800'
				>
					Edit
				</ActionButton>
			)}
		</div>
	);
};

export default MonsterDetails;
