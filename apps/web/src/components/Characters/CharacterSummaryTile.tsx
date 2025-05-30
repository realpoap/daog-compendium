import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Character } from '@api/lib/ZodCharacter';
import { UserWithoutPass } from '@api/lib/ZodUser';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
	FiEdit,
	FiMaximize,
	FiPlusCircle,
	FiRefreshCw,
	FiSliders,
	FiTrash2,
} from 'rocketicons/fi';
import { GiPirateGrave } from 'rocketicons/gi';
import { SmallCircleButton } from '../Buttons';
import { Option } from '../SpellList/SelectFilter';
import AvatarUpload from './AvatarUpload';
import CharacterVariablesPanel from './CharacterVariablesPanel';
import CharacterViewDialog from './CharacterViewDialog';

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
	updateOwner: (
		charId: string,
		userId: string,
		campaign: string,
	) => Promise<void>;
	updateChar: (char: Character) => Promise<void>;
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
	updateChar,
	campaignOptions,
	userOptions,
}: Props) => {
	const navigate = useNavigate();
	const [currentExp, setCurrentExp] = useState(char.profile.experience ?? 0);
	const [togglePanel, setTogglePanel] = useState(false);

	return (
		<div
			className={cn(
				'bg-card has-[.btn-error:hover]:animate-shake has-[.btn-error:hover]:ring-error ring-card mb-2 flex w-full flex-col rounded-xl shadow-md ring-2 transition-all duration-500 has-[.btn-error:hover]:opacity-70',
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

				<div className='xs:flex-row flex w-full flex-col items-start justify-start'>
					<div className='flex w-full flex-col items-start'>
						{/* NAME */}
						<div
							className={cn(
								'text-primary xs:flex-row xs:items-baseline xs:gap-2 flex w-full flex-col items-start justify-between text-base font-semibold',
							)}
						>
							<div className='flex flex-row items-center gap-2'>
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
								<div className='flex w-fit flex-row items-baseline justify-end gap-2'>
									<div className='text-neutral-content text-sm capitalize'>
										{char.bio.subspecies !== char.bio.species
											? char.bio.subspecies
											: ''}{' '}
										{char.bio.species}
									</div>
									<div className='text-neutral-content text-sm'>
										Lvl. {char.profile.level}
									</div>
								</div>
							</div>
							<div className='flex flex-row items-center justify-end gap-2'>
								{togglePanel && (
									<div
										className='hover:scale-120 hover:*:icon-neutral-content z-50 ml-auto flex'
										onClick={() => {
											if (togglePanel) updateChar(char);
										}}
									>
										<FiRefreshCw className='icon-sm icon-neutral' />
									</div>
								)}
								<div
									className='hover:scale-120 hover:*:icon-neutral-content z-50 ml-auto flex'
									onClick={() => {
										setTogglePanel(prev => !prev);
										if (!togglePanel) updateChar(char);
									}}
								>
									<FiSliders className='icon-sm icon-neutral' />
								</div>
								<div
									className='hover:scale-120 hover:*:icon-neutral-content z-50 ml-auto flex'
									onClick={e => {
										e.stopPropagation();
										(
											document.getElementById(
												`modal-char-${char.id}`,
											) as HTMLDialogElement
										).showModal();
									}}
								>
									<FiMaximize className='icon-sm icon-neutral' />
								</div>
							</div>
						</div>
						<div className='xs:flex-row flex w-full flex-col items-start justify-between gap-2'>
							{/* -------------- INFO BLOCK -------------- */}
							<div className='flex-1 flex-col'>
								{/* EXPERIENCE */}
								<div className='xs:w-half flex w-full flex-row items-end justify-start gap-2'>
									<div className='tooltip tooltip-top'>
										<div className='tooltip-content shadow-background shadow-lg'>
											<span className='px-1 py-0 text-xs'>{`Exp: ${currentExp}/${char.profile.level * 100}`}</span>
										</div>
										<progress
											className='progress progress-primary h-1 after:[animation-duration:5s]'
											value={currentExp}
											max={char.profile.level * 100}
										></progress>
									</div>
									{(user?.role === 'ADMIN' ||
										char.bio.creator === user?.id ||
										char.bio.owner === user?.id) && (
										<div className='flex flex-row gap-1'>
											<input
												className='input-xs border-1 focus:text-primary h-4 w-8 rounded-sm text-center ring-0'
												type='number'
												id={`exp-${char.id}`}
											></input>

											<button
												onClick={() => {
													const input = document.querySelector(
														`#exp-${char.id}`,
													) as HTMLInputElement;
													if (input.value != '') {
														setCurrentExp(currentExp + input.valueAsNumber);
														updateXp(input.valueAsNumber, char);
													}
													input.value = '';
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
										<div className='xs:flex-row xs:items-baseline flex w-full flex-row items-start gap-1'>
											{/* <span className='text-neutral-content w-content text-xs'>
											Wandering in{' '}
										</span> */}
											{user?.id !== char.bio.owner &&
												user?.role === 'VIEWER' && (
													<span className='text-neutral-content w-content text-xs'>
														{campaignOptions &&
															campaignOptions.find(
																campaign =>
																	campaign.value === char.bio.campaign,
															)?.label}
													</span>
												)}
											<div className='flex w-fit flex-row gap-2'>
												{(user?.id === char.bio.owner ||
													user?.role !== 'VIEWER') && (
													<select
														aria-placeholder='Assign to campaign'
														value={char.bio.campaign}
														disabled={user?.role === 'VIEWER'}
														className='font-cabin dark:text-primary dark:caret-primary peer-default:dark:text-neutral dark:bg-card w-content xs:w-fit min-h-fit rounded-md py-0 text-sm text-xs shadow-sm'
														onChange={e =>
															updateCampaign(
																char.id,
																e.target.value,
																char.bio.owner,
															)
														}
													>
														<option
															disabled={true}
															value=''
														>
															Assign to campaign
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
												)}
											</div>
										</div>
									</div>
									{/* PLAYER */}
									<div className='flex w-full flex-col'>
										{((dm && dm === user?.id.toString()) ||
											user?.role === 'ADMIN') && (
											<div className='xs:flex-row xs:items-baseline flex w-full flex-row items-start gap-1'>
												<span className='text-neutral-content w-content text-xs'>
													Played by{' '}
												</span>
												<div className='flex w-fit flex-row gap-2'>
													<select
														aria-placeholder='Assign to player'
														value={capitalizeFirstLetter(char.bio.owner)}
														className='font-cabin dark:text-primary dark:caret-primary peer-default:dark:text-neutral dark:bg-card w-content xs:w-fit min-h-fit rounded-md py-0 text-sm text-xs shadow-sm'
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
							{/* -------------- STAT BLOCK -------------- */}
							<div className='xs:flex-1 xs:flex-col hidden'>
								<div className='w-half text-cabin flex flex-row items-center gap-1 text-xs'>
									<span>Speed :</span>

									<span>{char.profile.speed?.crawling} /</span>
									<span>{char.profile.speed?.walking} /</span>
									<span>{char.profile.speed?.running} /</span>
									<span>{char.profile.speed?.obstacle} m</span>
								</div>
								<div className='w-half text-cabin flex flex-col items-start text-xs'>
									<span>
										Load : {char.status.weight.current}/{char.status.weight.max}{' '}
										({char.status.weightClass})
									</span>
									<span>Defense Type : {char.path.defenseType}</span>
									<span>Armor Class : {char.equipment.armorClass}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* HEALTH */}
				<div className='h-22 flex w-4 flex-row items-center justify-center'>
					{(user?.id === char.bio.owner || user?.role !== 'VIEWER') && (
						<div className='rotate-270 flex flex-col gap-1'>
							<progress
								className='progress progress-error w-22 h-1 transition-all duration-500 after:[animation-duration:500]'
								value={Math.round(
									(char.status.health.current /
										(char.status.tempHealth
											? char.status.health.max + char.status.tempHealth
											: char.status.health.max)) *
										100,
								)}
								max={100}
							></progress>
							<progress
								className='progress progress-info h-1 transition-all duration-500 after:[animation-duration:500]'
								value={Math.round(
									(char.status.spirit.current /
										(char.status.tempSpirit
											? char.status.spirit.max + char.status.tempSpirit
											: char.status.spirit.max)) *
										100,
								)}
								max={100}
							></progress>

							{/* <div className='font-cabin text-error flex w-max flex-row items-center text-sm'>
								<GiGlassHeart className='icon-error dark:icon-error icon-sm mr-2' />
								<div className='flex flex-col'>
									<span>{char?.status.health?.current}</span>
									<div className='text-error hidden flex-row items-center gap-0.5 peer-hover:flex'>
										<GiArmorVest className='icon-xs' />{' '}
										<span className='text-[0.6rem]'>
											{char.equipment.armorClass}
										</span>
									</div>
								</div>
							</div>

							<div className='font-cabin text-info flex w-max flex-row items-center text-sm'>
								<GiPotionBall className='icon-info dark:icon-info icon-sm mr-2' />
								<div className='flex flex-col'>
									<span>{char?.status.health?.current}</span>
									<div className='text-info flex flex-row items-center gap-0.5'>
										<GiStarSwirl className='icon-xs' />{' '}
										<span className='text-[0.6rem]'>
											{char.variables.magic}
										</span>
									</div>
								</div>
							</div> */}
						</div>
					)}
				</div>

				{/* ADMIN */}
				<div className='xs:flex hidden flex-col items-end justify-center gap-2'>
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
							<FiEdit className='icon-background xs:icon-sm size-3' />
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
							<FiTrash2 className='delete icon-background xs:icon-sm size-3' />
						</SmallCircleButton>
					)}
				</div>
			</li>
			<CharacterViewDialog char={char} />

			{/* COLLAPSE ---------------------------------------------------------------- */}
			{togglePanel && <CharacterVariablesPanel char={char} />}
		</div>
	);
};

export default CharacterSummaryTile;
