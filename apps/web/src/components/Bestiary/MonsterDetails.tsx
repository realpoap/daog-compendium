import { useAuth } from '@/store/authContext';
import { creatureTypeOptions } from '@/types/creatureOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { NewAction } from '@api/lib/ZodAction';
import { ActionList, CreatureAttribute } from '@api/lib/ZodCreature';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiEdit3, FiPlus } from 'rocketicons/fi';
import {
	GiArmorVest,
	GiBullseye,
	GiCheckedShield,
	GiCrownedSkull,
	GiFairyWand,
	GiGlassHeart,
	GiHood,
	GiPotionBall,
	GiRoundStar,
	GiSemiClosedEye,
	GiSwordWound,
	GiThunderSkull,
} from 'rocketicons/gi';
import { RiCloseFill } from 'rocketicons/ri';
import { ActionButton, BackButton, SmallCircleButton } from '../Buttons';
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
	const [Icon, setMonsterIcon] = useState<JSX.Element | undefined>();

	const monsterById = trpc.creatures.getById.useQuery(id as string);
	const [edit, setEdit] = useState(false);

	const { user } = useAuth();
	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';

	useEffect(() => {
		if (monsterById.data) {
			if (monster?.actions) setActions(monster?.actions);
			if (monster?.attributes) setAttributes(monster?.attributes);
			if (monster?.type) {
				creatureTypeOptions.find(o => {
					if (
						o.label.toLowerCase() === monster?.type?.toLowerCase() ||
						o.value === monster?.type?.toLowerCase()
					) {
						setMonsterIcon(o.icon);
					}
				});
			}
		}
	}, [monsterById.data]);

	if (monsterById.isPending) {
		return <div>loading</div>; // TODO: add skeleton
	}

	const monster = monsterById.data;

	return (
		<div className='item-center flex h-[100dvh] flex-col'>
			<div className='align-center flex flex-col items-center justify-center gap-2'>
				<BackButton
					onClick={() =>
						navigate({
							to: '/bestiary',
						})
					}
				/>

				<div className='align-center relative mt-4 flex flex-col items-center justify-center text-wrap text-center'>
					<label className='swap swap-flip hover:animate-wiggle text-9xl'>
						{/* this hidden checkbox controls the state */}
						<input type='checkbox' />

						<div className='swap-off'>
							<div className='mt-1 flex flex-col items-center justify-center'>
								<div
									className={cn(
										'*:icon-stone-500 *:hover:icon-primary hover:border-primary hover:animate-wiggle flex size-12 items-center justify-center overflow-clip rounded-full border-2 border-stone-500 *:shadow-stone-800 *:drop-shadow-lg',
										{
											'*:icon-5xl *:mt-1': monster?.type === 'wyrm',
											'*:icon-6xl *:mr-1 *:mt-2': monster?.type === 'fae',
											'*:icon-4xl *:-mt-2': monster?.type === 'insect',
											'*:icon-5xl *:mt-2': monster?.type === 'monster',
											'*:icon-6xl *:mt-2': monster?.type === 'plant',
											'*:icon-3xl': monster?.type !== 'wyrm',
										},
									)}
								>
									{Icon}
								</div>
							</div>
						</div>
						<div className='swap-on'>
							<div
								className={cn(
									'relative flex flex-col items-center justify-center text-center',
									{ 'animate-shake': monster?.level && monster?.level > 30 },
								)}
							>
								<GiRoundStar className='icon-7xl icon-primary relative inline-block shadow-lg shadow-stone-800' />
								<span className='font-grenze absolute top-[0.85rem] z-20 inline-block text-xl font-bold dark:text-stone-800'>
									{monster?.level}
								</span>
							</div>
						</div>
					</label>
					<div className='w-full'>
						<h3
							className={cn(
								'font-grenze text-primary text-wrap text-5xl font-extrabold tracking-wider',
							)}
						>
							{monster?.name}
						</h3>
						{monster?.isBoss && (
							<div className='badge badge-lg bg-goldenrod-500 glass absolute -right-4 top-12 size-6 animate-bounce content-center items-center rounded-full border-0 p-0 shadow-sm shadow-stone-900'>
								<GiCrownedSkull className='dark:icon-stone-800-sm align-baseline' />
							</div>
						)}
					</div>
					<p
						className={cn(
							`text-md font-cabin animate-text bg-clip-text align-middle font-bold italic text-transparent`,
							{
								'bg-gradient-to-r from-stone-300 via-indigo-300 to-stone-300':
									monster?.alignment === 'saint',
								'bg-gradient-to-r from-stone-500 via-blue-500 to-stone-500':
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
						<div className='flex flex-row justify-end'>
							{isEditor && edit && (
								<div
									className={`${edit ? '-mr-10' : ''} flex flex-row justify-start gap-2`}
								>
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
										<FiPlus className='icon-stone-900 icon' />
									</SmallCircleButton>
									<SmallCircleButton
										onClick={e => {
											e.stopPropagation();
											setEdit(!edit);
										}}
										color={'bg-red-500'}
									>
										<RiCloseFill className='icon-stone-900' />
									</SmallCircleButton>
									{createPortal(
										<AttributeForm
											creatureId={monster?.id as string}
											attributes={attributes}
											setAttributes={setAttributes}
										/>,
										document.body,
									)}
								</div>
							)}
							{isEditor && !edit && (
								<SmallCircleButton
									onClick={e => {
										e.stopPropagation();
										setEdit(!edit);
									}}
								>
									<FiEdit3 className='icon-stone-900-sm' />
								</SmallCircleButton>
							)}
						</div>
					</div>
				)}
				{monster?.description && (
					<div
						className={cn(
							'font-noto max-w-72 text-center text-sm italic text-stone-700 md:line-clamp-none md:max-w-xl dark:text-stone-400',
						)}
					>
						{monster?.description}
					</div>
				)}
				{monster?.habitat.length !== 0 && (
					<div className='flex flex-row justify-center gap-2'>
						<h4 className='font-semibold'>Habitat :</h4>{' '}
						<ul className='flex flex-row flex-wrap gap-1 [&>:not(:last-child)]:after:content-[","]'>
							{monster?.habitat.map(h => <li key={h}>{h}</li>)}
						</ul>
					</div>
				)}

				<div className='flex flex-row items-end justify-center gap-8 align-baseline'>
					<div className='align-center mt-4 flex flex-col items-center justify-center text-center'>
						<div className='relative flex'>
							<GiGlassHeart className='icon-red-500 icon-2xl absolute animate-ping opacity-30' />
							<GiGlassHeart className='icon-red-500 icon-2xl relative drop-shadow-md' />
						</div>
						<p className='font-noto align-baseline text-lg font-semibold text-red-500'>
							{monster?.health}
						</p>
						<p className='font-noto align-baseline text-sm font-light text-stone-500'>
							(1d3 +
							{monster?.stats?.VIT && Math.floor(monster?.stats?.VIT / 10)})
						</p>
					</div>
					{monster?.isCaster && (
						<div className='align-center mt-4 flex flex-col items-center justify-center text-center'>
							<div className='relative flex'>
								<GiPotionBall className='icon-indigo-500 icon-3xl absolute animate-ping opacity-30' />
								<GiPotionBall className='icon-indigo-500 icon-3xl relative drop-shadow-md' />
							</div>
							<p className='font-noto align-baseline text-lg font-semibold text-indigo-500'>
								{monster?.spirit}
							</p>
							<p className='font-noto align-baseline text-sm font-light text-stone-500'>
								(1d3 +
								{monster?.stats?.SEN && Math.floor(monster?.stats?.SEN / 10)})
							</p>
						</div>
					)}
				</div>

				<div className='font-cabin flex w-full list-none flex-col items-center justify-center gap-2 pt-4 text-base font-semibold md:flex-row'>
					<div className='grid-container justify-center gap-2 space-x-2'>
						<span className='grid-cols-1 after:pl-2 after:text-stone-500 after:content-["|"]'>
							<GiThunderSkull className='icon-stone-900 dark:icon-stone-200 icon-[1.1rem] mr-2' />
							{monster?.initiative || '~'}
						</span>
						<span className='grid-cols-1 after:pl-2 after:text-stone-500 after:content-["|"]'>
							<GiSwordWound className='icon-stone-900 dark:icon-stone-200 icon-base mr-2' />
							{monster?.attack || '~'}
						</span>

						<span className='grid-cols-1 after:pl-2 after:text-stone-500 after:content-["|"]'>
							<GiCheckedShield className='icon-stone-900 dark:icon-stone-200 mr-2 size-[1.1rem]' />
							{monster?.defense || '~'}
						</span>
						<span className='grid-cols-1 after:pl-2 after:text-stone-500'>
							<GiArmorVest className='icon-stone-900 dark:icon-stone-200 mr-2 size-[1.1rem]' />
							{monster?.armor || '~'}
						</span>
					</div>
					<div className='grid-container justify-center gap-2 space-x-2'>
						<span className='grid-cols-1 after:pl-2 after:text-stone-500 after:content-["|"]'>
							<GiBullseye className='icon-stone-900 dark:icon-stone-200 icon-base mr-2' />
							{monster?.ranged || '~'}
						</span>
						<span className='grid-cols-1 after:pl-2 after:text-stone-500 after:content-["|"]'>
							<GiSemiClosedEye className='icon-stone-900 dark:icon-stone-200 icon-sm mr-2' />
							{monster?.perception || '~'}
						</span>
						<span className='grid-cols-1 after:pl-2 after:text-stone-500 after:content-["|"]'>
							<GiHood className='icon-stone-900 dark:icon-stone-200 icon-[1.1rem] mr-2' />
							{monster?.discretion || '~'}
						</span>
						<span className='grid-cols-1 after:pl-2 after:text-transparent after:content-["|"]'>
							<GiFairyWand className='icon-stone-900 dark:icon-stone-200 icon-sm max-w-1/6 mr-2' />
							{monster?.magic || '~'}
						</span>
					</div>
				</div>
				{monster && (
					<div className='md:w-[54dvw] lg:w-2/5'>
						<Collapsible title='show stats'>
							<StatsTable creature={monster} />
						</Collapsible>
					</div>
				)}

				{isEditor && (
					<>
						{createPortal(
							<ActionForm
								creatureId={monster?.id as string}
								name={monster?.name as string}
								actions={actions}
								setActions={setActions}
							/>,
							document.body,
						)}
					</>
				)}

				<h3 className='font-grenze line mb-1 border-b-2 text-4xl font-semibold tracking-wider'>
					Spells
				</h3>
				{monster?.magicDomain.length !== 0 && (
					<div className='flex flex-col items-center justify-center'>
						<p className='italic text-stone-500'>
							Can cast spells from the following domains :{' '}
						</p>
						<ul className='flex flex-row flex-wrap gap-1 [&>:not(:last-child)]:after:content-[","]'>
							{monster?.magicDomain.map(h => <li key={h}>{h}</li>)}
						</ul>
					</div>
				)}

				<ActionComponent
					actionList={monster?.actionList as ActionList}
					actions={actions}
					setActions={setActions}
					creatureId={monster?.id as string}
					creatureName={monster?.name as string}
				/>
				{isEditor && (
					<SmallCircleButton
						onClick={e => {
							e.stopPropagation();

							(
								document.getElementById('action-form') as HTMLDialogElement
							).showModal();
						}}
					>
						<FiPlus className='icon-stone-900' />
					</SmallCircleButton>
				)}
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
