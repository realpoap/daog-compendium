import { useAuth } from '@/store/authContext';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Campaign } from '@api/lib/ZodCampaign';
import { Character } from '@api/lib/ZodCharacter';
import { UserWithoutPass } from '@api/lib/ZodUser';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiX } from 'rocketicons/bi';
import { FiPower, FiTrash2 } from 'rocketicons/fi';
import { ActionButton, SmallCircleButton } from '../Buttons';
import Collapsible from '../Collapsible';
import { Option } from '../SpellList/SelectFilter';
import TitleCount from '../TitleCount';
import Login from '../User/Login';
import CampaignNewForm from './Campaigns/CampaignNewForm';
import CharacterNewForm from './CharacterNewForm';
import CharacterSummaryTile from './CharacterSummaryTile';

const CharactersView = () => {
	const utils = trpc.useUtils();
	const { user } = useAuth();
	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';
	const navigate = useNavigate();

	const [users, setUsers] = useState<UserWithoutPass[]>([]);
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [characters, setCharacters] = useState<Character[]>([]);
	const [campaignOptions, setCampaignOptions] = useState<Option[]>([]);
	const [userOptions, setUserOptions] = useState<Option[]>([]);
	const [panelOpen, setPanelOpen] = useState(false);

	const getUserList = trpc.users.getAll.useQuery(undefined);

	const getAllCharacters = trpc.characters.getAll.useQuery(undefined, {
		enabled: user !== null,
	});
	const getPlayerCampaigns = trpc.campaigns.getByPlayer.useQuery(
		user ? user.id : '',
		{
			enabled: user !== null && user.role !== 'ADMIN' && user.role !== 'EDITOR',
		},
	);
	const getDMCampaigns = trpc.campaigns.getByDMId.useQuery(
		user ? user.id : '',
		{
			enabled: user !== null && user.role === 'EDITOR',
		},
	);
	const getAllCampaigns = trpc.campaigns.getAll.useQuery(undefined, {
		enabled: user !== null && user.role === 'ADMIN',
	});
	const toggleActiveCampaign = trpc.campaigns.toggleActive.useMutation({
		onSuccess: () => {
			utils.campaigns.getAll.refetch();
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});
	const updateCharCampaign = trpc.characters.updateCampaign.useMutation({
		onSuccess: () => {
			utils.characters.getAll.invalidate();
			toast.success('Assigned to campaign !');
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});
	const updateCharOwner = trpc.characters.updateOwner.useMutation({
		onSuccess: () => {
			utils.characters.getAll.invalidate();
			toast.success('Assigned to player !');
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});
	const updateCharExp = trpc.characters.updateXp.useMutation({
		onSuccess: () => {
			toast.success('Experience updated !');
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});
	const updateCampPlayers = trpc.campaigns.updatePlayers.useMutation({
		onSuccess: () => {
			utils.campaigns.getByPlayer.invalidate();
			toast.success('Experience updated !');
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});
	const deleteCharacter = trpc.characters.delete.useMutation({
		onSuccess: () => {
			utils.characters.getAll.invalidate();
			toast.success('Character deleted !');
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});
	const deleteCampaign = trpc.campaigns.delete.useMutation({
		onSuccess: () => {
			utils.campaigns.getAll.invalidate();
			toast.success('Campaign deleted !');
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		if (getUserList.data) setUsers(getUserList.data);
		setUserOptions(
			users.map(({ name, id }) => ({
				label: name as string,
				value: id as string,
			})),
		);
	}, [getUserList.data, user]);

	// SETUP CAMPAIGNS
	useEffect(() => {
		//add viewer characters
		if (user && getPlayerCampaigns.data) {
			setCampaigns(getPlayerCampaigns.data);
		} else if (
			getDMCampaigns &&
			user &&
			user.role === 'EDITOR' &&
			getDMCampaigns.data
		) {
			setCampaigns(getDMCampaigns.data);
		} else if (user && user.role === 'ADMIN' && getAllCampaigns.data) {
			setCampaigns(getAllCampaigns.data);
		}

		setAvgCampaignsLevel();
		setCampaignOptions(
			campaigns.map(({ name, id }) => ({
				label: name as string,
				value: id as string,
			})),
		);
	}, [
		user,
		getAllCampaigns.data,
		getDMCampaigns.data,
		getAllCharacters.data,
		getPlayerCampaigns.data,
		characters,
	]);

	// SETUP CHARACTERS
	useEffect(() => {
		if (getAllCharacters.data) setCharacters(getAllCharacters.data);
		setAvgCampaignsLevel();
	}, [getAllCharacters.data]);

	// SET UP AVG LEVELS
	const setAvgCampaignsLevel = () => {
		if (campaigns.length > 0 && characters) {
			campaigns.map(campaign => {
				let charLevels: [number] = [0];
				characters
					.filter(character => character.bio.campaign === campaign.id)
					.map(c => {
						charLevels.push(c.profile.level);
						console.log(charLevels);
						!campaign.maxLevel || campaign.maxLevel < c.profile.level
							? (campaign.maxLevel = c.profile.level)
							: (campaign.maxLevel = campaign.maxLevel);
						!campaign.minLevel || campaign.minLevel > c.profile.level
							? (campaign.minLevel = c.profile.level)
							: (campaign.minLevel = campaign.minLevel);
					});
				campaign.charNb = charLevels.length - 1;
				campaign.avgLevel = Math.ceil(
					charLevels.reduce(function (a, b) {
						return a + b;
					}, 0) / campaign.charNb,
				);

				console.warn(campaign.name, campaign.charNb, campaign.avgLevel);
			});
		}
	};

	const handleDelete = async (id: string) => {
		await deleteCharacter.mutate(id);
	};

	const handleDeleteCampaign = async (id: string) => {
		await deleteCampaign.mutate(id);
		getAllCharacters.data
			?.filter(character => character.bio.campaign === id)
			.map(async c => {
				await updateCharCampaign.mutate({ id: c.id, campaignId: '' });
			});
	};

	const handleCampaignChange = async (
		id: string,
		campaign: string,
		owner: string,
	) => {
		await updateCharCampaign.mutate({ id: id, campaignId: campaign });
		// update list of players in campaign
		const campaignTargeted = campaigns.find(c => c.id.toString() === campaign);
		if (campaignTargeted) {
			const players = campaignTargeted?.players;
			players?.push(owner);
			updateCampPlayers.mutate({ id: campaign, players: players });
		}
	};
	const handleOwnerChange = async (
		id: string,
		user: string,
		campaign: string,
	) => {
		await updateCharOwner.mutate({ id: id, userId: user });
		// update list of players in campaign
		const campaignTargeted = campaigns.find(c => c.id === campaign);
		if (campaignTargeted) {
			const players = campaignTargeted?.players;
			players?.push(user);
			updateCampPlayers.mutate({ id: campaign, players: players });
		}
	};

	const handleXpChange = async (expInput: number, char: Character) => {
		let maxExp = char.profile.level * 100;
		let currentLvl = char.profile.level;
		let newExp = char.profile.experience
			? char.profile.experience + expInput
			: expInput; //-100
		if (newExp >= maxExp) {
			currentLvl += 1;
			newExp = newExp - maxExp;
			toast.success('Level up ! 🎉');
		} else if (char.profile.experience && newExp <= 0) {
			currentLvl -= 1;
			maxExp = currentLvl * 100;
			newExp = Math.abs(maxExp + newExp);
			toast.error('Down 1 level ! 👇');
		}
		await updateCharExp.mutate({
			id: char.id,
			experience: newExp,
			level: currentLvl,
		});
	};

	const getDaysFrom = (start: Date) => {
		const now = new Date();
		const date = now.getTime() - new Date(start).getTime();
		return Math.ceil(Math.abs(date / (1000 * 3600 * 24)));
	};

	if (!user) {
		return (
			<div>
				<Login />
			</div>
		);
	}

	if (!characters)
		return (
			<div className='font-grenze mt-10 flex flex-col items-center justify-center gap-2 px-4'>
				<h3 className='text-4xl'>Collecting resources</h3>
				<span className='font-cabin italic'>
					Please wait while we search for the knowledge within the library ...
				</span>
				<progress className='progress w-56'></progress>
			</div>
		);

	return (
		<div className='relative h-full w-full'>
			<div
				className={cn(
					'mt-sm transition-full absolute flex h-full w-full flex-col items-center justify-start px-2 duration-300',
					{
						'md:left-0 md:w-full': !panelOpen,
						'md:left-1/3 md:w-2/3': panelOpen,
					},
				)}
				onClick={() => setPanelOpen(false)}
			>
				<div className='dark:from-background container sticky top-8 z-10 flex h-fit min-h-[25dvh] w-full flex-col items-center bg-gradient-to-b from-stone-100 from-80% pb-8'>
					<h1 className='font-grenze dark:text-primary text-secondary sticky top-4 z-10 mx-auto mt-4 text-center text-6xl font-bold tracking-wide md:mt-8'>
						Characters
						{characters && <TitleCount number={characters.length} />}
					</h1>
					<div className='iems-center flex flex-col gap-0'>
						<ActionButton
							color='primary'
							textColor='background'
							onClick={e => {
								e.stopPropagation();
								setPanelOpen(prev => !prev);
							}}
						>
							Campaigns
						</ActionButton>

						{user && (
							<>
								<ActionButton
									color='accent'
									textColor='background'
									onClick={() => {
										(
											document.getElementById(
												'add-char-modal',
											) as HTMLDialogElement
										).showModal();
									}}
								>
									Add Character
								</ActionButton>

								<CharacterNewForm campaigns={campaignOptions} />
							</>
						)}
					</div>
				</div>
				<div
					className={cn(
						'z-0 mt-8 flex h-full w-full flex-col justify-start transition-all duration-300 md:w-3/4',
						{
							'md:w-full': panelOpen,
						},
					)}
				>
					{campaigns
						.filter(campaign => campaign.active)
						.map(k => (
							<div
								className='mb-4 flex flex-col items-center'
								key={k.id}
							>
								<div className='flex w-full flex-col items-center md:flex-row md:justify-between md:gap-4'>
									<div className='flex w-full flex-col items-start md:flex-row md:items-baseline md:gap-4'>
										<h4 className='font-grenze text-primary text-2xl tracking-wide'>
											{k.name}
										</h4>

										<div className='flex flex-row gap-2'>
											{k.createdAt && (
												<span className='font-cabin text-neutral-content italic'>
													started{' '}
													{getDaysFrom(k.createdAt) > 1
														? `${getDaysFrom(k.createdAt)} days ago`
														: `${getDaysFrom(k.createdAt)} day ago`}
												</span>
											)}
											<span className='font-cabin text-neutral-content'>-</span>
											<span className='font-cabin text-neutral-content'>
												nb : {k.charNb}
											</span>
											<span className='font-cabin text-neutral-content'>
												avg lvl : {k.avgLevel || 0}
											</span>
										</div>
									</div>
								</div>

								<ul className='list flex w-full flex-col'>
									{characters
										.filter(character => character.bio.campaign !== '')
										.filter(
											character => character.bio.campaign === k.id.toString(),
										)
										.map(char => (
											<CharacterSummaryTile
												key={char.id}
												handleDelete={handleDelete}
												user={user}
												char={char}
												dm={k.dm}
												campaignOptions={campaignOptions}
												userOptions={userOptions}
												updateCampaign={handleCampaignChange}
												updateOwner={handleOwnerChange}
												updateXp={handleXpChange}
											/>
										))}
								</ul>
								{user?.id === k.dm ||
									(user?.role === 'ADMIN' && (
										<div className=''>
											<ActionButton
												color='primary'
												textColor='background'
											>
												set encounter
											</ActionButton>
										</div>
									))}
							</div>
						))}
					{/* UNASSIGNED ---------------------------------------------------------------------- */}
					<div className='mb-4'>
						<div className='mb-2 flex flex-row items-center justify-between gap-4'>
							<h4 className='font-grenze text-neutral-content text-2xl tracking-wide'>
								Unassigned
							</h4>
						</div>

						{characters
							.filter(character => {
								if (character.bio.owner === user.id || user.role === 'ADMIN')
									return true;
							})
							.filter(character => character.bio.campaign === '')
							.map(char => (
								<ul
									className='list flex flex-col gap-4'
									key={char.id}
								>
									<CharacterSummaryTile
										key={char.fullname}
										handleDelete={handleDelete}
										user={user}
										char={char}
										updateCampaign={handleCampaignChange}
										updateOwner={handleOwnerChange}
										campaignOptions={campaignOptions}
										userOptions={userOptions}
										updateXp={handleXpChange}
									/>
								</ul>
							))}
					</div>
				</div>
			</div>
			{/* CAMPAIGNS PANEL -------------------------------------------------------------------------------- */}
			<div
				className={cn(
					'sidebar bg-card fixed bottom-0 left-0 top-12 z-20 w-5/6 px-4 shadow shadow-lg shadow-stone-900 transition-transform duration-500 md:w-1/3',
					{
						'opacity-0 max-sm:hidden md:-left-1/3': !panelOpen,
						'visible opacity-100 md:-left-1/3 md:translate-x-full': panelOpen,
					},
				)}
			>
				<h1 className='font-grenze dark:text-primary text-secondary sticky z-10 my-4 flex flex-row justify-between text-center text-2xl font-bold tracking-wide md:mt-8'>
					Campaigns
					<button
						className='font-grenze absolute right-0 top-0 z-50 cursor-pointer self-end'
						onClick={() => setPanelOpen(false)}
					>
						<BiX className='icon-background dark:icon-neutral hover:icon-neutral-content icon-3xl cursor-pointer' />
					</button>
				</h1>
				<ul className='list font-cabin gap-1'>
					{campaigns.map(camp => (
						<li
							key={camp.id}
							className='list-col text-content flex flex-row items-center gap-2 text-sm'
						>
							<span
								className={cn('status', {
									'status-accent': camp.active,
									'status-neutral': !camp.active,
								})}
							></span>
							{capitalizeFirstLetter(camp.name)}
							{(user?.role === 'ADMIN' || user?.id === camp.dm) && (
								<button
									onClick={() =>
										toggleActiveCampaign.mutate({
											id: camp.id,
											active: !camp.active,
										})
									}
								>
									<FiPower
										className={cn(`icon-sm cursor-pointer`, {
											'icon-accent': camp.active,
											'icon-neutral': !camp.active,
										})}
									/>
								</button>
							)}
							{user?.role === 'ADMIN' && (
								<SmallCircleButton
									color='bg-error'
									onClick={() => handleDeleteCampaign(camp.id)}
								>
									<FiTrash2 className='dark:icon-background sixe-3 md:icon-sm align-baseline' />
								</SmallCircleButton>
							)}
						</li>
					))}
				</ul>
				{user && isEditor && (
					<Collapsible title='new campaign'>
						<CampaignNewForm />
					</Collapsible>
				)}
			</div>
		</div>
	);
};

export default CharactersView;
