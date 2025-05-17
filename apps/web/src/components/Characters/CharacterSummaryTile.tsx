import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { Character } from '@api/lib/ZodCharacter';
import { UserWithoutPass } from '@api/lib/ZodUser';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FiEdit, FiMaximize, FiPlusCircle, FiTrash2 } from 'rocketicons/fi';
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
import TagBadge from '../TagBadge';
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
	updateOwner: (
		charId: string,
		userId: string,
		campaign: string,
	) => Promise<void>;
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
	const [currentExp, setCurrentExp] = useState(char.profile.experience ?? 0);

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

				<div className='xs:flex-row flex flex-col items-start justify-start'>
					<div className='flex w-full flex-col items-start'>
						{/* NAME */}
						<div
							className={cn(
								'text-primary xs:flex-row xs:items-baseline xs:gap-2 flex w-full flex-col items-start text-base font-semibold',
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
						<div className='xs:flex-row flex w-full flex-col items-start justify-between'>
							{/* EXPERIENCE */}
							<div className='xs:w-1/2 flex w-full flex-row items-end justify-start gap-2'>
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
											className='input-xs border-1 text-primary w-10 rounded-sm text-center'
											type='number'
											id={`exp-${char.id}`}
										></input>

										<button
											onClick={() => {
												const input = document.querySelector(
													`#exp-${char.id}`,
												) as HTMLInputElement;

												setCurrentExp(currentExp + input.valueAsNumber);
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
									<div className='xs:flex-row xs:items-baseline flex w-full flex-row items-start gap-1'>
										<span className='text-neutral-content w-content text-xs'>
											Wandering in{' '}
										</span>
										{user?.id !== char.bio.owner && user?.role === 'VIEWER' && (
											<span className='text-neutral-content w-content text-xs'>
												{campaignOptions &&
													campaignOptions.find(
														campaign => campaign.value === char.bio.campaign,
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
					</div>
				</div>
				{/* HEALTH */}

				<div className='xs:flex xs:flex-col w-content hidden items-end justify-center gap-2'>
					{(user?.id === char.bio.owner || user?.role !== 'VIEWER') && (
						<>
							<div className='font-cabin text-error flex w-max flex-row'>
								<GiGlassHeart className='icon-error dark:icon-error icon-base mr-2' />{' '}
								{char?.status.health?.current}
							</div>

							<div className='font-cabin text-info flex flex-row'>
								<GiPotionBall className='icon-info dark:icon-info icon-base mr-2' />{' '}
								{char?.status.spirit?.current}
							</div>
						</>
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
			<dialog
				id={`modal-char-${char.id}`}
				className='modal bg-card'
			>
				<div className='modal-box bg-card'>
					<h3 className='text-lg font-bold'>Attributes</h3>
					<div className='space-x-1'>
						{char.path?.attributes?.map(att => (
							<TagBadge
								key={att.name}
								text={att.name}
								tooltip={att.description ?? ''}
								button={false}
							/>
						))}
					</div>
					<h3 className='text-lg font-bold'>Skills</h3>
					<div className='overflow-x-auto'>
						<table className='table-xs table'>
							<thead>
								<tr>
									<th>Name</th>
									<th>Lvl</th>
									<th>Points</th>
									<th>Mastery</th>
								</tr>
							</thead>
							<tbody>
								{char.path?.skills?.map(skill => (
									<tr
										key={skill.id}
										className='hover:bg-neutral'
									>
										<th>{skill.name}</th>
										<th>{skill.playerLevel}</th>
										<th>
											{skill.playerPoints}/{(skill.playerLevel ?? 0) + 1}
										</th>
										<th>{skill.mastery}</th>
									</tr>
								))}
							</tbody>
						</table>

						<h3 className='text-lg font-bold'>Items</h3>
						{char.equipment.items?.map(item => (
							<li key={item.id}>
								{item.quantity}x {item.name}
							</li>
						))}
						<h3 className='text-lg font-bold'>Components</h3>
						{char.equipment.components?.map(item => (
							<li key={item.id}>
								{item.quantity}x {item.name}
							</li>
						))}
						<p className='text-neutral py-4'>
							Press ESC key or click the button below to close
						</p>
					</div>
					<form
						method='dialog'
						className='modal-backdrop'
					>
						<button>close</button>
					</form>
				</div>
			</dialog>
			<div
				className={cn(
					'collapse-content group hidden grid-cols-5 gap-4 font-bold',
					{
						'grayscale-50 opacity-50': char.bio.isDead,
					},
				)}
			>
				{[
					{
						icon: GiThunderSkull,
						value: char.profile.variables.initiative,
						name: 'initiative',
					},
					// { icon: GiWingfoot, value: char.profile.speed?.running },
					{
						icon: GiBullseye,
						value: char.profile.variables.ranged,
						name: 'Ranged',
					},
					{
						icon: GiSwordWound,
						value: char.profile.variables.attack,
						name: 'Attack',
					},
					{
						icon: GiCheckedShield,
						value: char.profile.variables.defense,
						name: 'Defense',
					},
					{
						icon: GiArmorVest,
						value: char.equipment.armorClass,
						name: 'Armor Class',
					},
					{
						icon: GiSemiClosedEye,
						value: char.profile.variables.perception,
						name: 'Perception',
					},
					{
						icon: GiHood,
						value: char.profile.variables.discretion,
						name: 'Discretion',
					},
					{
						icon: GiCampfire,
						value: char.profile.variables.survival,
						name: 'Survival',
					},
					{
						icon: GiMagnifyingGlass,
						value: char.profile.variables.enigms,
						name: 'Investigation',
					},
					{
						icon: GiHood,
						value: char.profile.variables.speech,
						name: 'Speech',
					},
					{
						icon: GiSwapBag,
						value: char.profile.variables.trade,
						name: 'Trade',
					},
					{
						icon: GiDominoMask,
						value: char.profile.variables.performance,
						name: 'Performance',
					},
					{
						icon: GiSly,
						value: char.profile.variables.intimidation,
						name: 'Intimidation',
					},
					{
						icon: GiCursedStar,
						value: char.profile.variables.magic,
						name: 'Magic',
					},
					{
						icon: GiGhost,
						value: char.profile.variables.bravery,
						name: 'Bravery',
					},
				].map(({ icon: Icon, value, name }, index) => (
					<div
						className='tooltip'
						key={index}
					>
						<div className='tooltip-content z-50'>
							<span className='font-cabin text-normal text-sm'>
								{capitalizeFirstLetter(name)}
							</span>
						</div>
						<div className='font-cabin bg-tile text-neutral-content flex w-full flex-row items-center justify-center rounded-sm p-1'>
							<Icon className='icon-background dark:icon-neutral-content mr-1 size-[1rem] flex-shrink-0' />
							<span>{value}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CharacterSummaryTile;
