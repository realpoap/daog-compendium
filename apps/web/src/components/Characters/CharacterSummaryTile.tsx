import { cn } from '@/utils/classNames';
import { Character } from '@api/lib/ZodCharacter';
import { UserWithoutPass } from '@api/lib/ZodUser';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FiEdit, FiPlusCircle, FiTrash2 } from 'rocketicons/fi';
import { GiGlassHeart, GiPotionBall, GiTombstone } from 'rocketicons/gi';
import { SmallCircleButton } from '../Buttons';
import { Option } from '../SpellList/SelectFilter';

type Props = {
	char: Character;
	dm?: string;
	user: UserWithoutPass | null;
	campaignOptions?: Option[];
	userOptions?: Option[];
	handleDelete: (id: string) => Promise<void>;
	updateCampaign: (
		id: string,
		campaign: string,
		owner: string,
	) => Promise<void>;
	updateOwner: (id: string, user: string, campaign: string) => Promise<void>;
	updateXp: (expInput: number, char: Character) => Promise<void>;
};

const CharacterSummaryTile = ({
	char,
	dm,
	user,
	handleDelete,
	updateCampaign,
	updateXp,
	updateOwner,
	campaignOptions,
	userOptions,
}: Props) => {
	const navigate = useNavigate();
	const [currentExp, setCurrentExp] = useState(char.experience);
	return (
		<li className='list-row text-neutral font-cabin cursor-pointer px-2 py-2'>
			<div className='avatar avatar-placeholder flex flex-col items-center justify-center'>
				<div className='bg-tile font-grenze text-primary size-12 rounded-full'>
					<span className='text-3xl'>{char.name.charAt(0)}</span>
				</div>
			</div>
			<div className='flex flex-col items-start justify-start md:flex-row'>
				<div className='flex w-full flex-col items-start'>
					{/* NAME */}
					<div
						className={cn(
							'text-primary flex w-full flex-col items-start text-base font-semibold md:flex-row md:items-baseline md:gap-2',
							{
								'text-neutral': char.isDead,
							},
						)}
					>
						<div className='flex w-fit flex-col items-start justify-start md:flex-row md:items-baseline'>
							{char.isDead && (
								<GiTombstone className='icon-neutral dark:icon-neutral icon-base mr-2' />
							)}

							{char.name}
							{char.surname ? `, ${char.surname}` : ''}
						</div>
						<div className='flex w-fit flex-row items-baseline justify-start gap-2'>
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
										value={char.campaign}
										disabled={user?.role === 'VIEWER'}
										className='font-cabin dark:text-primary dark:caret-primary peer-default:dark:text-neutral dark:bg-card w-content min-h-fit rounded-md py-0 text-sm text-xs shadow-sm md:w-fit'
										onChange={e =>
											updateCampaign(char.id, e.target.value, char.owner)
										}
									>
										<option
											disabled={false}
											value=''
										>
											Unassigned
										</option>
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
					{/* PLAYER */}
					<div className='flex w-full flex-col'>
						{((dm && dm === user?.id.toString()) || user?.role === 'ADMIN') && (
							<div className='flex w-full flex-row items-start gap-1 md:flex-row md:items-baseline'>
								<span className='text-neutral-content w-content text-xs'>
									Played by{' '}
								</span>
								<div className='flex w-fit flex-row gap-2'>
									<select
										aria-placeholder='Assign to player'
										value={char.owner}
										className='font-cabin dark:text-primary dark:caret-primary peer-default:dark:text-neutral dark:bg-card w-content min-h-fit rounded-md py-0 text-sm text-xs shadow-sm md:w-fit'
										onChange={e =>
											updateOwner(char.id, e.target.value, char.campaign)
										}
									>
										<option
											disabled={false}
											value=''
										>
											no-one
										</option>
										{userOptions?.map(option => (
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
					<div className='flex w-full flex-row items-center justify-start gap-2 md:w-1/2'>
						<div className='tooltip w-full'>
							<div className='tooltip-content text-xs'>{`${char.experience}/${char.level * 100}`}</div>
							<progress
								className='progress progress-primary h-[0.1rem] transition-all duration-1000 [&::-moz-progress-bar]:transition-all [&::-webkit-progress-value]:transition-all'
								value={currentExp}
								max={char.level * 100}
							></progress>
						</div>
						{(user?.role === 'ADMIN' ||
							char.creator === user?.id ||
							char.owner === user?.id) && (
							<div className='flex flex-row gap-1'>
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
										setCurrentExp(prev => prev && prev + input.valueAsNumber);
										updateXp(input.valueAsNumber, char);
									}}
								>
									<FiPlusCircle className='icon-primary-sm cursor-pointer' />
								</button>
							</div>
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
