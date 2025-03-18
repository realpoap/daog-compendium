import { useAuth } from '@/store/authContext';
import { spellOptions } from '@/types/spellOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { SpellSchema } from '@api/lib/zod-prisma/index';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
	GiBackup,
	GiCardRandom,
	GiCharacter,
	GiDrop,
	GiFairyWand,
	GiFlake,
	GiHeartPlus,
	GiPentacle,
	GiPerson,
	GiPolarStar,
	GiSheikahEye,
	GiStarCycle,
	GiSwordWound,
	GiVibratingBall,
} from 'rocketicons/gi';
import { z } from 'zod';
import { ActionButton, BackButton } from '../Buttons';

type Spell = z.infer<typeof SpellSchema>;

const SpellDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams({ strict: false });
	const [spell, setSpell] = useState<Spell | undefined>();
	const [Icon, setSpellIcon] = useState<JSX.Element | undefined>();

	const query = trpc.spells.getByNumber.useQuery(Number(id));
	const { user } = useAuth();
	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';

	useEffect(() => {
		if (query.data) {
			setSpell(query.data);
		}
		spellOptions.find(o => {
			if (
				o.label.toLowerCase() === spell?.type.toLowerCase() ||
				o.value === spell?.type.toLowerCase()
			) {
				setSpellIcon(o.icon);
			}
		});
	}, [query.data, spell]);

	if (query.isLoading) {
		return console.log('loading single spell...');
	}

	return (
		<div className='flex w-full flex-col justify-center px-8'>
			<div className='align-center flex flex-col items-center justify-center gap-2'>
				<BackButton
					onClick={() =>
						navigate({
							to: '/spells',
						})
					}
				/>
			</div>

			<div className='top-20dvh card sticky mt-4 flex flex-col items-center gap-2 rounded-xl bg-stone-800 p-2 text-center'>
				<div className='mt-2 flex items-center justify-center'>
					<div
						className={cn(
							'*:icon-stone-500 hover:*:icon-primary hover:border-primary hover:animate-wiggle *:shadow-background flex size-12 items-center justify-center overflow-clip rounded-full border-2 border-stone-500 *:drop-shadow-lg',
							{
								'*:icon-4xl *:mr-2': spell?.type === 'mouflette',
								'*:icon-4xl *:-mt-2': spell?.type === 'blood',
								'*:icon-2xl': spell?.type !== 'mouflette',
							},
						)}
					>
						{Icon}
					</div>
				</div>
				<span className='text-md font-cabin text-neutral-content'>
					~ {spell?.number} ~
				</span>
				<div className='w-full'>
					<h1
						className={cn(
							'font-grenze text-primary text-wrap text-5xl font-extrabold tracking-wider',
						)}
					>
						{spell?.titleCommon}
					</h1>
					<p
						className={cn(
							'font-cabin dark:text-primary text-secondary text-lg font-bold tracking-wider opacity-80',
						)}
					>
						{spell?.titleGlaise}
					</p>
				</div>
				<span className='font-grenze dark:text-base-content mr-1 align-baseline text-2xl font-semibold capitalize tracking-wider'>
					{spell?.type}
				</span>
				<span className='font-cabin dark:text-neutral-content align-baseline text-sm font-light italic'>
					{'//'} {spell?.casting} spell to {spell?.action}{' '}
					{spell?.targetType !== 'none' && spell?.targetType}
					{spell?.targetType === 'none'
						? 'noone'
						: spell?.targetType === 'single'
							? ' creature'
							: spell?.targetType === 'self'
								? ''
								: ' creatures'}
					{' //'}
				</span>
				<div className='font-cabin dark:text-base-content my-4 flex w-full flex-row items-baseline justify-center align-baseline'>
					<span className='font-cabin align-baseline text-sm font-semibold'>
						<GiPolarStar className='icon-stone-900 dark:icon-stone-100 icon-base' />
						{spell?.level}
					</span>
					<span className='text-md mx-2 align-baseline font-semibold'>|</span>
					<span className='font-cabin align-baseline text-sm font-semibold'>
						<GiDrop className='icon-stone-900 dark:icon-stone-100 icon-base' />
						{spell?.cost}
					</span>
					<span className='text-md mx-2 align-baseline font-semibold'>|</span>
					<span className='text-md font-cabin align-baseline font-semibold'>
						<GiFairyWand className='icon-stone-900 dark:icon-stone-100 icon-base' />
						{spell?.difficulty}
					</span>
				</div>
				<div
					className={cn(
						'font-grenze my-2 max-w-72 text-lg italic leading-none tracking-wider text-stone-700 md:line-clamp-none md:max-w-xl dark:text-stone-400',
					)}
				>
					{spell?.flavor}
				</div>
				<div
					className={cn(
						'font-cabin text-md my-1 max-w-72 text-left text-justify text-stone-700 md:line-clamp-none md:max-w-xl md:text-center dark:text-stone-400',
					)}
				>
					{spell?.description}
				</div>
				<div className='flex flex-row'>
					<span className='font-cabin mr-2 align-baseline text-sm font-semibold'>
						{spell?.casting === 'instant' ? (
							<GiFlake className='icon-stone-400 icon-base' />
						) : spell?.casting === 'delayed' ? (
							<GiVibratingBall className='icon-stone-400 icon-base' />
						) : spell?.casting === 'ritual' ? (
							<GiPentacle className='icon-stone-400 icon-base' />
						) : spell?.casting === 'concentration' ? (
							<GiSheikahEye className='icon-stone-400 icon-base' />
						) : spell?.casting === 'upkeep' ? (
							<GiStarCycle className='icon-stone-400 icon-base' />
						) : (
							''
						)}
					</span>
					<span className='font-cabin mr-2 align-baseline text-sm font-semibold'>
						{spell?.targetType === 'random' ? (
							<GiCardRandom className='icon-stone-400 icon-base' />
						) : spell?.targetType === 'single' ? (
							<GiPerson className='icon-stone-400 icon-base' />
						) : spell?.targetType === 'multiple' ? (
							<GiBackup className='icon-stone-400 icon-base' />
						) : spell?.targetType === 'self' ? (
							<GiCharacter className='icon-stone-400 icon-base' />
						) : (
							''
						)}
					</span>
				</div>
				<div className='font-cabin text-wider my-4 flex flex-col gap-1 align-baseline text-sm font-medium'>
					{spell?.duration && (
						<div>
							<p className='font-grenze text-xl tracking-wide text-purple-400'>
								Duration
							</p>
							<p className='text-base'>{spell?.duration}</p>
						</div>
					)}
					{spell?.range && (
						<div>
							<p className='font-grenze text-xl tracking-wide text-purple-400'>
								Range
							</p>
							<p className='text-base'>{spell?.range}</p>
						</div>
					)}
					{spell?.target && (
						<div>
							<p className='font-grenze text-xl tracking-wide text-purple-400'>
								Target
							</p>
							<p className='text-base'>{spell?.target}</p>
						</div>
					)}
					{spell?.effects && (
						<div>
							<p className='font-grenze text-xl tracking-wide text-purple-400'>
								Effects
							</p>
							<p className='text-base'>{spell?.effects}</p>
						</div>
					)}
				</div>
				<div className='flex flex-row text-stone-900 dark:text-stone-200'>
					<span className='flex flex-row align-baseline text-base font-semibold'>
						<GiSwordWound className='icon-stone-900 dark:icon-stone-100 icon-base mr-2' />
						{spell?.damages || '~'}
					</span>
					<span className='mx-4 align-baseline text-sm font-semibold'>|</span>
					<span className='font-cabin flex flex-row align-baseline text-base font-semibold'>
						<GiHeartPlus className='icon-stone-900 dark:icon-stone-100 icon-base mr-2' />
						{spell?.heal || '~'}
					</span>
				</div>
			</div>
			{isEditor && (
				<ActionButton
					onClick={() =>
						navigate({
							to: `/spells/edit/$id`,
							params: { id: `${spell?.id}` },
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
					onClick={() =>
						navigate({
							to: `/`,
						})
					}
					color='red-500'
					textColor='stone-800'
				>
					Delete
				</ActionButton>
			)}
		</div>
	);
};

export default SpellDetails;
