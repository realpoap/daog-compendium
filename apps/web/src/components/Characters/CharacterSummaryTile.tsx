import { cn } from '@/utils/classNames';
import { Character } from '@api/lib/ZodCharacter';
import { UserWithoutPass } from '@api/lib/ZodUser';
import { useNavigate } from '@tanstack/react-router';
import { FiEdit, FiPlusCircle, FiTrash2 } from 'rocketicons/fi';
import { GiGlassHeart, GiPotionBall, GiTombstone } from 'rocketicons/gi';
import { SmallCircleButton } from '../Buttons';
import { Option } from '../SpellList/SelectFilter';

type Props = {
	char: Character;
	campaignOptions?: Option[];
	user: UserWithoutPass | null;
	handleDelete: (id: string) => Promise<void>;
	updateCampaign: (id: string, campaign: string) => Promise<void>;
	updateXp: (expInput: number, char: Character) => Promise<void>;
};

const CharacterSummaryTile = ({
	char,
	user,
	handleDelete,
	updateCampaign,
	updateXp,
	campaignOptions,
}: Props) => {
	const navigate = useNavigate();
	return (
		<li className='list-row text-neutral font-cabin cursor-pointer px-4 py-2'>
			<div className='avatar avatar-placeholder flex flex-col items-center justify-start md:justify-center'>
				<div className='bg-tile font-grenze text-primary size-10 rounded-full'>
					<span className='text-3xl'>{char.name.charAt(0)}</span>
				</div>
			</div>
			<div className='flex flex-col items-start justify-start md:flex-row'>
				<div className='flex w-full flex-col items-start'>
					{/* NAME */}
					<div
						className={cn(
							'text-primary flex w-full flex-col items-start text-base font-semibold md:flex-row md:items-baseline',
							{
								'text-neutral': char.isDead,
							},
						)}
					>
						<div className='flex w-full flex-col items-start md:flex-row md:items-baseline'>
							{' '}
							{char.name}{' '}
							{char.isDead && (
								<GiTombstone className='icon-neutral dark:icon-neutral icon-base mr-2' />
							)}
							{char.surname ? `, ${char.surname}` : ''}
						</div>
						<div className='flex w-full flex-row items-baseline justify-start gap-2'>
							<div className='text-neutral-content text-sm capitalize'>
								{char.subspecies || ''} {char.species}
							</div>
							<div className='text-neutral-content text-sm'>
								Lvl. {char.level}
							</div>
						</div>
					</div>
					{/* CAMPAIGN */}
					<div className='flex w-full flex-col'>
						{(user?.id === char.owner || user?.role === 'ADMIN') && (
							<div className='flex w-full flex-row items-start gap-1 md:flex-row md:items-baseline'>
								<span className='text-neutral-content w-content text-xs'>
									Wandering in{' '}
								</span>
								<div className='flex w-fit flex-row gap-2'>
									<select
										aria-placeholder='Assign to campaign'
										value={char.campaigns ? char.campaigns : 'Unassigned'}
										className='font-cabin dark:text-primary dark:caret-primary peer-default:dark:text-neutral dark:bg-card w-content min-h-fit rounded-md py-0 text-sm text-xs shadow-sm md:w-fit'
										onChange={e => updateCampaign(char.id, e.target.value)}
									>
										<option disabled={false}>Unassigned</option>
										{campaignOptions?.map(option => (
											<option
												className='bg-card font-cabin'
												value={option.value}
												key={option.value}
											>
												{option.label}
											</option>
										))}
									</select>
								</div>
							</div>
						)}
					</div>
					{/* EXPERIENCE */}
					<div className='flex w-full flex-row items-center gap-2'>
						<progress
							className='progress progress-primary h-1 w-full md:w-1/2'
							value={char.experience}
							max={char.level * 100}
						></progress>
						{(user?.role === 'ADMIN' ||
							char.creator === user?.id ||
							char.owner === user?.id) && (
							<>
								<span className='text-xs'>{char.experience}</span>
								<input
									className='input-xs border-1 text-primary w-10 rounded-sm text-center'
									type='number'
									id={`exp-${char.id}`}
								></input>

								<button
									onClick={() => {
										const input = document.querySelector(
											`#exp-${char.id}`,
										) as HTMLInputElement;
										console.log(input.value);

										updateXp(input.valueAsNumber, char);
										//input.value = '';
									}}
								>
									<FiPlusCircle className='icon-primary-sm cursor-pointer' />
								</button>
							</>
						)}
					</div>
				</div>
				{/* HEALTH */}
				<div className='hidden w-1/6 items-center justify-center gap-2 md:flex md:flex-col'>
					<div className='font-cabin text-error flex flex-row'>
						<GiGlassHeart className='icon-error dark:icon-error icon-base mr-2' />{' '}
						{char?.health?.current}
					</div>

					{char.isCaster && (
						<div className='font-cabin text-info flex flex-row'>
							<GiPotionBall className='icon-info dark:icon-info icon-base mr-2' />{' '}
							{char?.spirit?.current}
						</div>
					)}
				</div>
				{/* ADMIN */}
				<div className='hidden flex-row items-end justify-end gap-1 md:flex md:flex-col md:justify-start'>
					{(user?.role === 'ADMIN' ||
						char.creator === user?.id ||
						char.owner === user?.id) && (
						<SmallCircleButton
							color='bg-accent'
							onClick={e => {
								e.stopPropagation();
								navigate({
									to: '/characters/edit/$id',
									params: { id: `${char?.id}` },
								});
							}}
						>
							<FiEdit className='icon-background md:icon-sm size-3' />
						</SmallCircleButton>
					)}
					{user?.role === 'ADMIN' && (
						<SmallCircleButton
							color='bg-error'
							onClick={e => {
								e.stopPropagation();
								handleDelete(char.id);
							}}
						>
							<FiTrash2 className='icon-background md:icon-sm size-3' />
						</SmallCircleButton>
					)}
				</div>
			</div>
		</li>
	);
};

export default CharacterSummaryTile;
