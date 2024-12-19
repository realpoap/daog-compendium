import { spellOptions } from '@/types/spellOptions';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { SpellSchema } from '@api/lib/zod-prisma/index';
import {
	Link,
	useNavigate,
	useParams,
	useRouter,
} from '@tanstack/react-router';
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

type Spell = z.infer<typeof SpellSchema>;

const SpellDetails = () => {
	const { history } = useRouter();
	const navigate = useNavigate();
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

	const spellIcon = spellOptions.find(o => {
		if (
			o.label.toLowerCase() === spell?.type.toLowerCase() ||
			o.value === spell?.type.toLowerCase()
		) {
			return o.icon;
		}
	});

	return (
		<div className='flex flex-col justify-center'>
			<button
				className='font-grenze mt-1 align-middle text-2xl text-stone-500 hover:text-stone-200'
				onClick={() =>
					navigate({
						to: '/spells',
					})
				}
			>
				<span className='text-2xl'>&#8249;</span> Back
			</button>

			<div className='top-20dvh sticky mt-4 flex flex-col items-center text-center'>
				<div className='size-10 items-center overflow-clip rounded-full border-0 align-middle'>
					<span className='relative mb-2 inline-block'>{spellIcon?.icon}</span>
				</div>
				<span className='text-md font-noto text-stone-400'>
					~ {spell?.number} ~
				</span>
				<div className='sticky top-10 w-full bg-stone-800 py-4'>
					<h3
						className={cn(
							'font-grenze text-4xl font-extrabold tracking-wider text-purple-900 dark:text-purple-400',
						)}
					>
						{spell?.titleCommon}
					</h3>
					<p
						className={cn(
							'font-noto text-md font-bold tracking-wider text-purple-900 opacity-80 dark:text-purple-400',
						)}
					>
						{spell?.titleGlaise}
					</p>
				</div>
				<span className='text-md font-grenze mr-1 align-baseline font-semibold capitalize tracking-wider dark:text-stone-200'>
					{spell?.type}
				</span>
				<span className='font-noto align-baseline text-xs font-light italic dark:text-stone-400'>
					// {spell?.casting} spell to {spell?.action}{' '}
					{spell?.targetType !== 'none' && spell?.targetType}
					{spell?.targetType === 'none'
						? 'noone'
						: spell?.targetType === 'self'
							? ''
							: ' creatures'}{' '}
					//
				</span>
				<div className='font-noto my-4 flex w-full flex-row items-baseline justify-center align-baseline dark:text-stone-200'>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiPolarStar className='icon-stone-900 dark:icon-stone-100 icon-md mr-1' />
						{spell?.level}
					</span>
					<span className='text-md mx-2 align-baseline font-semibold'>|</span>
					<span className='font-noto align-baseline text-sm font-semibold'>
						<GiDrop className='icon-stone-900 dark:icon-stone-100 icon-md' />
						{spell?.cost}
					</span>
					<span className='text-md mx-2 align-baseline font-semibold'>|</span>
					<span className='text-md font-noto align-baseline font-semibold'>
						<GiFairyWand className='icon-stone-900 dark:icon-stone-100 icon-md mr-1' />
						{spell?.difficulty}
					</span>
				</div>
				<div
					className={cn(
						'font-grenze my-1 max-w-72 text-base italic tracking-wider text-stone-700 md:line-clamp-none md:max-w-xl dark:text-stone-400',
					)}
				>
					{spell?.flavor}
				</div>
				<div
					className={cn(
						'font-noto my-1 max-w-72 text-sm text-stone-700 md:line-clamp-none md:max-w-xl dark:text-stone-400',
					)}
				>
					{spell?.description}
				</div>
				<div>
					<span className='font-noto mr-2 align-baseline text-sm font-semibold'>
						{spell?.casting === 'instant' ? (
							<GiFlake className='icon-stone-400 icon-md' />
						) : spell?.casting === 'delayed' ? (
							<GiVibratingBall className='icon-stone-400 icon-md' />
						) : spell?.casting === 'ritual' ? (
							<GiPentacle className='icon-stone-400 icon-md' />
						) : spell?.casting === 'concentration' ? (
							<GiSheikahEye className='icon-stone-400 icon-md' />
						) : spell?.casting === 'upkeep' ? (
							<GiStarCycle className='icon-stone-400 icon-md' />
						) : (
							''
						)}
					</span>
					<span className='font-noto mr-2 align-baseline text-sm font-semibold'>
						{spell?.targetType === 'random' ? (
							<GiCardRandom className='icon-stone-400 icon-md' />
						) : spell?.targetType === 'single' ? (
							<GiPerson className='icon-stone-400 icon-md' />
						) : spell?.targetType === 'multiple' ? (
							<GiBackup className='icon-stone-400 icon-md' />
						) : spell?.targetType === 'self' ? (
							<GiCharacter className='icon-stone-400 icon-md' />
						) : (
							''
						)}
					</span>
				</div>
				<div className='font-noto text-wider my-4 flex flex-col gap-1 align-baseline text-sm font-medium'>
					{spell?.duration && (
						<div>
							<p className='font-grenze text-xl tracking-wide text-purple-400'>
								Duration
							</p>
							<p className='text-sm'>{spell?.duration}</p>
						</div>
					)}
					{spell?.range && (
						<div>
							<p className='font-grenze text-xl tracking-wide text-purple-400'>
								Range
							</p>
							<p className='text-sm'>{spell?.range}</p>
						</div>
					)}
					{spell?.target && (
						<div>
							<p className='font-grenze text-xl tracking-wide text-purple-400'>
								Target
							</p>
							<p className='text-sm'>{spell?.target}</p>
						</div>
					)}
					{spell?.effects && (
						<div>
							<p className='font-grenze text-xl tracking-wide text-purple-400'>
								Effects
							</p>
							<p className='text-sm'>{spell?.effects}</p>
						</div>
					)}
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
			<Link
				to={`/spells/edit/$id`}
				params={{ id: `${spell?.id}` }}
				className='bg-accent font-grenze my-4 w-1/4 self-center rounded-lg px-4 py-1 text-center text-lg font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
			>
				Edit
			</Link>
		</div>
	);
};

export default SpellDetails;
