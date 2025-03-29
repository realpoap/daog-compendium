import { useAuth } from '@/store/authContext';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Campaign } from '@api/lib/ZodCampaign';
import { Character } from '@api/lib/ZodCharacter';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiX } from 'rocketicons/bi';
import { FiTrash2 } from 'rocketicons/fi';
import { ActionButton, SmallCircleButton } from '../Buttons';
import Collapsible from '../Collapsible';
import { Option } from '../SpellList/SelectFilter';
import TitleCount from '../TitleCount';
import CampaignNewForm from './Campaigns/CampaignNewForm';
import CharacterNewForm from './CharacterNewForm';
import CharacterSummaryTile from './CharacterSummaryTile';

const CharactersView = () => {
	const utils = trpc.useUtils();
	const { user } = useAuth();
	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';
	const navigate = useNavigate();

	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [campaignOptions, setCampaignOptions] = useState<Option[]>([]);
	const [panelOpen, setPanelOpen] = useState(false);

	const getAllCharacters = trpc.characters.getAll.useQuery(undefined, {
		enabled: user !== null,
	});

	const getDMCampaigns = trpc.campaigns.getByDMId.useQuery(
		user ? user.id : '',
		{
			enabled: user !== null && user.role === 'EDITOR',
		},
	);

	const getAllCampaigns = trpc.campaigns.getAll.useQuery(undefined, {
		enabled: user !== null && user.role === 'ADMIN',
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
	const updateCharExp = trpc.characters.updateXp.useMutation({
		onSuccess: () => {
			utils.characters.getAll.invalidate();
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

	// SETUP CAMPAIGNS
	useEffect(() => {
		if (
			getDMCampaigns &&
			user !== null &&
			user.role === 'EDITOR' &&
			getDMCampaigns.data
		) {
			setCampaigns(getDMCampaigns.data);
		}
		if (user !== null && user.role === 'ADMIN' && getAllCampaigns.data) {
			setCampaigns(getAllCampaigns.data);
		}
		setAvgCampaignsLevel();
		setCampaignOptions(
			campaigns.map(({ name, id }) => ({
				label: name as string,
				value: id as string,
			})),
		);
	}, [user, getAllCampaigns.data, getDMCampaigns.data]);

	// SET UP AVG LEVELS
	const setAvgCampaignsLevel = () => {
		if (campaigns.length > 0 && getAllCharacters.data) {
			campaigns.map(k => {
				let charLevels: [number] = [0];
				getAllCharacters.data?.map(c => {
					if (c.campaigns === k.id) {
						charLevels.push(c.level);
						!k.maxLevel || k.maxLevel < c.level
							? (k.maxLevel = c.level)
							: (k.maxLevel = k.maxLevel);
						!k.minLevel || k.minLevel > c.level
							? (k.minLevel = c.level)
							: (k.minLevel = k.minLevel);
					}
				});
				k.charNb = charLevels.length - 1;
				k.avgLevel = Math.floor(
					charLevels.reduce(function (a, b) {
						return a + b;
					}, 0) / k.charNb,
				);
				console.warn(k.name, k.avgLevel);
			});
		}
	};

	if (!getAllCharacters.data || getAllCharacters.isLoading)
		return (
			<div className='font-grenze mt-10 flex flex-col items-center justify-center gap-2 px-4'>
				<h3 className='text-4xl'>Collecting resources</h3>
				<span className='font-cabin italic'>
					Please wait while we search for the knowledge within the library ...
				</span>
				<progress className='progress w-56'></progress>
			</div>
		);

	const handleDelete = async (id: string) => {
		await deleteCharacter.mutate(id);
	};

	const handleDeleteCampaign = async (id: string) => {
		await deleteCampaign.mutate(id);
	};

	const handleCampaignChange = async (id: string, campaign: string) => {
		await updateCharCampaign.mutate([id, campaign]);
	};

	const handleXpChange = async (expInput: number, char: Character) => {
		let maxExp = char.level * 100;
		let currentLvl = char.level;
		let newExp = char.experience ? char.experience + expInput : expInput; //-100
		if (newExp >= maxExp) {
			currentLvl += 1;
			newExp = newExp - maxExp;
			toast.success('Level up ! 🎉');
		} else if (char.experience && newExp <= 0) {
			//100 -200
			currentLvl -= 1; // 12
			maxExp = currentLvl * 100; // 1200
			newExp = Math.abs(maxExp + newExp); // 50
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
						{getAllCharacters.data && (
							<TitleCount number={getAllCharacters.data.length} />
						)}
					</h1>

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

					{user && isEditor && (
						<Collapsible title='new character'>
							<CharacterNewForm campaigns={campaignOptions} />
						</Collapsible>
					)}
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
						.filter(a => {
							if (getAllCharacters.data) {
								const activeChar = getAllCharacters?.data.filter(
									o => o.campaigns === a.id,
								);
								return activeChar.length !== 0;
							}
						})
						.map(k => (
							<div
								className='mb-4'
								key={k.id}
							>
								<div className='flex flex-row items-center justify-between gap-4'>
									<div className='flex flex-row items-baseline gap-4'>
										<h4 className='font-grenze text-primary text-2xl tracking-wide'>
											{k.name}
										</h4>
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
											avg lvl : {k.avgLevel}
										</span>
									</div>

									<div className='relative -top-4'>
										{' '}
										<ActionButton
											color='primary'
											textColor='background'
										>
											{' '}
											set encounter{' '}
										</ActionButton>
									</div>
								</div>

								<ul className='list bg-card rounded-lg shadow-md'>
									{getAllCharacters.data
										?.filter(charac => charac.campaigns === k.id)
										.map(char => (
											<CharacterSummaryTile
												key={char.fullname}
												handleDelete={handleDelete}
												user={user}
												char={char}
												campaignOptions={campaignOptions}
												updateCampaign={handleCampaignChange}
												updateXp={handleXpChange}
											/>
										))}
								</ul>
							</div>
						))}
					<div className='mb-4'>
						<div className='mb-2 flex flex-row items-center justify-between gap-4'>
							<h4 className='font-grenze text-neutral-content text-2xl tracking-wide'>
								Unassigned
							</h4>
						</div>

						{getAllCharacters.data
							.filter(a => {
								if (campaigns) {
									return !campaigns.some(c => c.id === a.campaigns);
								}
							})
							.map(char => (
								<ul
									className='list bg-card rounded-lg shadow-md'
									key={char.id}
								>
									<CharacterSummaryTile
										key={char.fullname}
										handleDelete={handleDelete}
										user={user}
										char={char}
										updateCampaign={handleCampaignChange}
										campaignOptions={campaignOptions}
										updateXp={handleXpChange}
									/>
									{/* <div className='ml-2 flex flex-row gap-2'>
										<select
											aria-placeholder='Assign to campaign'
											defaultValue='Assign to campaign'
											className='input-sm text-error text-md text-secondary caret-secondary dark:text-primary dark:caret-primary peer-default:dark:text-neutral dark:bg-card min-h-fit w-fit rounded-md px-2 py-0 shadow-sm'
											onChange={e =>
												handleCampaignChange(char.id, e.target.value)
											}
										>
											<option
												selected
												disabled
											>
												Assign to campaign
											</option>
											{campaignOptions.map(option => (
												<option
													className='bg-card'
													value={option.value}
												>
													{option.label}
												</option>
											))}
										</select>
									</div> */}
								</ul>
							))}
					</div>
				</div>
			</div>

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

							{user?.role === 'ADMIN' && (
								<SmallCircleButton
									color='bg-error'
									onClick={() => handleDeleteCampaign(camp.id)}
								>
									<FiTrash2 className='dark:icon-background-sm align-baseline' />
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
