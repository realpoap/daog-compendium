import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Character } from '@api/lib/ZodCharacter';
import { UserWithoutPass } from '@api/lib/ZodUser';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FiEdit, FiPlusCircle, FiTrash2 } from 'rocketicons/fi';
import {
	GiArmorVest,
	GiBullseye,
	GiCampfire,
	GiCheckedShield,
	GiCursedStar,
	GiDominoMask,
	GiGhost,
	GiGlassHeart,
	GiHood,
	GiMagnifyingGlass,
	GiPirateGrave,
	GiPotionBall,
	GiSemiClosedEye,
	GiSly,
	GiSwapBag,
	GiSwordWound,
	GiThunderSkull,
} from 'rocketicons/gi';
import { SmallCircleButton } from '../Buttons';
import { Option } from '../SpellList/SelectFilter';
import AvatarUpload from './AvatarUpload';

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
	const [currentExp, setCurrentExp] = useState(char.profile.experience);

	return (
		<div
			tabIndex={0}
			className={cn(
				'bg-card has-[.btn-error:hover]:animate-shake collapse mb-2 flex w-full flex-col rounded-xl shadow-md transition-all duration-500 focus:*:last:grid',
			)}
		>
			<li
				className={cn(
					'list-row collapse-title text-neutral font-cabin cursor-pointer px-2 py-2',
					{
						'grayscale-50': char.bio.isDead,
					},
				)}
			>
				{/* AVATAR */}
				<AvatarUpload char={char} />

				<div className='flex flex-col items-start justify-start md:flex-row'>
					<div className='flex w-full flex-col items-start'>
						{/* NAME */}
						<div
							className={cn(
								'text-primary flex w-full flex-col items-start text-base font-semibold md:flex-row md:items-baseline md:gap-2',
							)}
						>
							<div className='flex w-fit flex-row items-center justify-start'>
								<span
									className={`${char.bio.isDead && 'line-through decoration-2'}`}
								>
									{char.bio.name}
									{char.bio.surname ? `, ${char.bio.surname}` : ''}
								</span>
								{char.bio.isDead && (
									<GiPirateGrave className='icon-primary icon-base mx-2' />
								)}
							</div>
							<div className='flex w-fit flex-row items-baseline justify-start gap-2'>
								<div className='text-neutral-content text-sm capitalize'>
									{char.bio.subspecies || ''} {char.bio.species}
								</div>
								<div className='text-neutral-content text-sm'>
									Lvl. {char.profile.level}
								</div>
							</div>
						</div>
						<div className='flex w-full flex-col items-start justify-between md:flex-row'>
							{/* EXPERIENCE */}
							<div className='flex w-full flex-row items-end justify-start gap-2 md:w-1/2'>
								<div className='tooltip tooltip-top'>
									<div className='tooltip-content shadow-background shadow-lg'>
										<span className='px-1 py-0 text-xs'>{`Exp: ${char.profile.experience}/${char.profile.level * 100}`}</span>
									</div>
									<progress
										className='progress progress-primary h-[0.1rem] transition-all duration-1000 [&::-moz-progress-bar]:transition-all [&::-webkit-progress-value]:transition-all'
										value={currentExp}
										max={char.profile.level * 100}
									></progress>
								</div>
								{(user?.role === 'ADMIN' ||
									char.bio.creator === user?.id ||
									char.bio.owner === user?.id) && (
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
												setCurrentExp(
													prev => prev && prev + input.valueAsNumber,
												);
												updateXp(input.valueAsNumber, char);
											}}
										>
											<FiPlusCircle className='icon-primary-sm cursor-pointer' />
										</button>
									</div>
								)}
							</div>
							<div className='flex flex-col'>
								{/* CAMPAIGN */}
								<div className='flex w-full flex-col'>
									{(user?.id === char.bio.owner || user?.role === 'ADMIN') && (
										<div className='flex w-full flex-row items-start gap-1 md:flex-row md:items-baseline'>
											<span className='text-neutral-content w-content text-xs'>
												Wandering in{' '}
											</span>
											<div className='flex w-fit flex-row gap-2'>
												<select
													aria-placeholder='Assign to campaign'
													value={char.bio.campaign}
													disabled={user?.role === 'VIEWER'}
													className='font-cabin dark:text-primary dark:caret-primary peer-default:dark:text-neutral dark:bg-card w-content min-h-fit rounded-md py-0 text-sm text-xs shadow-sm md:w-fit'
													onChange={e =>
														updateCampaign(
															char.id,
															e.target.value,
															char.bio.owner,
														)
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
									{((dm && dm === user?.id.toString()) ||
										user?.role === 'ADMIN') && (
										<div className='flex w-full flex-row items-start gap-1 md:flex-row md:items-baseline'>
											<span className='text-neutral-content w-content text-xs'>
												Played by{' '}
											</span>
											<div className='flex w-fit flex-row gap-2'>
												<select
													aria-placeholder='Assign to player'
													value={capitalizeFirstLetter(char.bio.owner)}
													className='font-cabin dark:text-primary dark:caret-primary peer-default:dark:text-neutral dark:bg-card w-content min-h-fit rounded-md py-0 text-sm text-xs shadow-sm md:w-fit'
													onChange={e =>
														updateOwner(
															char.id,
															e.target.value,
															char.bio.campaign,
														)
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
															{capitalizeFirstLetter(option.label)}
														</option>
													))}
												</select>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					{/* HEALTH */}
					<div className='hidden w-1/6 items-center justify-center gap-2 md:flex md:flex-col'>
						<div className='font-cabin text-error flex flex-row'>
							<GiGlassHeart className='icon-error dark:icon-error icon-base mr-2' />{' '}
							{char?.status.health?.current}
						</div>

						{char.bio.isCaster && (
							<div className='font-cabin text-info flex flex-row'>
								<GiPotionBall className='icon-info dark:icon-info icon-base mr-2' />{' '}
								{char?.status.spirit?.current}
							</div>
						)}
					</div>
					{/* ADMIN */}
					<div className='hidden flex-row items-end justify-end gap-1 md:flex md:flex-col md:justify-start'>
						{(user?.role === 'ADMIN' ||
							char.bio.creator === user?.id ||
							char.bio.owner === user?.id) && (
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
								<FiTrash2 className='delete icon-background md:icon-sm size-3' />
							</SmallCircleButton>
						)}
					</div>
				</div>
			</li>
			<div
				className={cn('collapse-content hidden grid-cols-5 gap-4 font-bold', {
					'grayscale-50 opacity-50': char.bio.isDead,
				})}
			>
				{[
					{ icon: GiThunderSkull, value: char.profile.variables.initiative },
					// { icon: GiWingfoot, value: char.profile.speed?.running },
					{ icon: GiBullseye, value: char.profile.variables.ranged },
					{ icon: GiSwordWound, value: char.profile.variables.attack },
					{ icon: GiCheckedShield, value: char.profile.variables.defense },
					{ icon: GiArmorVest, value: char.equipment.armorClass },
					{ icon: GiSemiClosedEye, value: char.profile.variables.perception },
					{ icon: GiHood, value: char.profile.variables.discretion },
					{ icon: GiCampfire, value: char.profile.variables.survival },
					{ icon: GiMagnifyingGlass, value: char.profile.variables.enigms },
					{ icon: GiHood, value: char.profile.variables.speech },
					{ icon: GiSwapBag, value: char.profile.variables.trade },
					{ icon: GiDominoMask, value: char.profile.variables.performance },
					{ icon: GiSly, value: char.profile.variables.intimidation },
					{ icon: GiCursedStar, value: char.profile.variables.magic },
					{ icon: GiGhost, value: char.profile.variables.bravery },
				].map(({ icon: Icon, value }, index) => (
					<div
						key={index}
						className='font-cabin bg-neutral flex w-full flex-row items-center justify-center rounded-sm p-1'
					>
						<Icon className='icon-background dark:icon-stone-200 mr-1 size-[1rem] flex-shrink-0' />
						<span>{value}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default CharacterSummaryTile;
