import { useAuth } from '@/store/authContext';
import { creatureTypeOptions } from '@/types/creatureOptions';
import { calcLevel } from '@/utils/calculateStats';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { NewAction } from '@api/lib/ZodAction';
import { ActionList, CreatureAttribute } from '@api/lib/ZodCreature';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { FiEdit3, FiPlus } from 'rocketicons/fi';
import { GiCrownedSkull, GiRoundStar } from 'rocketicons/gi';
import { RiCloseFill } from 'rocketicons/ri';
import { ActionButton, BackButton, SmallCircleButton } from '../Buttons';
import Ability from './Ability';
import ActionComponent from './ActionComponent';
import CreatureComponentBlock from './CreatureComponentBlock';
import ItemComponent from './ItemComponent';
import MonsterStatsCard from './MonsterStatsCard';
import ActionForm from './utils/ActionForm';
import AttributeForm from './utils/AttributeForm';

const MonsterDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams({ strict: false });
	const [actions, setActions] = useState<NewAction[]>([]);
	const [attributes, setAttributes] = useState<CreatureAttribute[]>([]);
	const [Icon, setMonsterIcon] = useState<JSX.Element | undefined>();
	//TODO: change update logic for attributes / actions so that front and back are always sync

	const monsterById = trpc.creatures.getById.useQuery(id as string);
	const updateCreature = trpc.creatures.update.useMutation({
		onSuccess: () => {
			toast.success('Level updated !');
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});
	const deleteMonster = trpc.creatures.delete.useMutation({
		onSuccess: () => {
			toast.success('Creature deleted !');
			navigate({
				to: `/bestiary`,
			});
		},
	});

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
			//calc new level
			const newCreature = monsterById.data;
			newCreature.level = calcLevel(monsterById.data);
			if (newCreature.level !== monsterById.data.level) {
				updateCreature.mutate(newCreature);
			}
		}
	}, [monsterById.data]);

	if (monsterById.isPending) {
		return <div>loading</div>; // TODO: add skeleton
	}

	const monster = monsterById.data;

	return (
		<div className='flex w-full flex-col items-center p-8'>
			<div className='align-center flex flex-col items-center justify-center gap-4'>
				<BackButton
					onClick={() =>
						navigate({
							to: '/bestiary',
						})
					}
				/>
				<div className='card indicator bg-card w-full items-center gap-2 rounded-xl p-2'>
					{monster?.isBoss && (
						<span className='indicator-item badge badge-lg indicator bg-pirategold glass absolute top-2 size-7 animate-bounce content-center items-center rounded-full border-0 p-0 shadow-sm shadow-stone-900'>
							<GiCrownedSkull className='dark:icon-stone-800 icon-sm align-center absolute m-0 p-0' />
						</span>
					)}
					<div className='align-center relative mt-4 flex flex-col items-center justify-center text-wrap text-center'>
						<label className='swap swap-flip hover:animate-wiggle text-9xl'>
							{/* this hidden checkbox controls the state */}
							<input type='checkbox' />

							<div className='swap-off'>
								<div className='mt-1 flex flex-col items-center justify-center'>
									<div
										className={cn(
											'*:icon-stone-500 hover:*:icon-primary hover:border-primary hover:animate-wiggle flex size-12 items-center justify-center overflow-clip rounded-full border-2 border-stone-500 *:shadow-stone-800 *:drop-shadow-lg',
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
									<GiRoundStar className='icon-7xl icon-primary shadow-background relative inline-block *:shadow-lg' />
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
				</div>
				{/* STATS */}

				{monster && <MonsterStatsCard monster={monster} />}

				{monster?.magicDomain.length !== 0 && (
					<div className='card bg-card flex w-full flex-col items-center justify-center rounded-lg p-2'>
						<h3 className='font-grenze line mb-1 border-b-2 text-4xl font-semibold tracking-wider'>
							Spells
						</h3>
						<p className='italic text-stone-500'>
							Can cast spells from the following domains :{' '}
						</p>
						<ul className='flex flex-row flex-wrap gap-1 [&>:not(:last-child)]:after:content-[","]'>
							{monster?.magicDomain.map(h => <li key={h}>{h}</li>)}
						</ul>
					</div>
				)}
				<div className='card bg-card w-full rounded-lg p-2'>
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
				<ItemComponent items={monster?.loot} />
				<CreatureComponentBlock components={monster?.scavenge} />
			</div>
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
			{user?.role === 'ADMIN' && (
				<ActionButton
					onClick={() => deleteMonster.mutate(monster?.id as string)}
					color='error'
					textColor='stone-800'
				>
					Delete
				</ActionButton>
			)}
		</div>
	);
};

export default MonsterDetails;
