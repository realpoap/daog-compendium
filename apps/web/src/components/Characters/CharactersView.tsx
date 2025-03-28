import { useAuth } from '@/store/authContext';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Campaign } from '@api/lib/ZodCampaign';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiX } from 'rocketicons/bi';
import { FiEdit, FiTrash2 } from 'rocketicons/fi';
import { GiGlassHeart, GiPotionBall, GiTombstone } from 'rocketicons/gi';
import { ActionButton, SmallCircleButton } from '../Buttons';
import Collapsible from '../Collapsible';
import { Option } from '../SpellList/SelectFilter';
import TitleCount from '../TitleCount';
import CampaignNewForm from './Campaigns/CampaignNewForm';
import CharacterNewForm from './CharacterNewForm';

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

		setCampaignOptions(
			campaigns.map(({ name, id }) => ({
				label: name as string,
				value: id as string,
			})),
		);
	}, [user, getAllCampaigns.data, getDMCampaigns.data]);

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
								<div className='flex flex-row items-baseline gap-4'>
									<h4 className='font-grenze text-neutral text-2xl tracking-wide'>
										{k.name}
									</h4>
									{/* {k.createdAt && (
										<span className='font-cabin text-content'>
											started{' '}
											{Math.ceil(
												Math.abs(new Date() - new Date(k.createdAt)) /
													(1000 * 3600 * 24),
											)}{' '}
											day ago
										</span>
									)} */}
									<span className='font-cabin text-content'>Avg lvl :</span>

									<span className='font-cabin text-content'>Set encounter</span>
								</div>

								<ul className='list bg-card rounded-lg shadow-md'>
									{getAllCharacters.data
										?.filter(charac => charac.campaigns === k.id)
										.map(char => (
											<li
												className='list-row text-neutral font-cabin cursor-pointer px-4 py-2'
												key={char.fullname}
											>
												<div className='avatar avatar-placeholder flex flex-col items-center justify-center'>
													<div className='bg-tile font-grenze text-primary size-10 rounded-full'>
														<span className='text-3xl'>
															{char.name.charAt(0)}
														</span>
													</div>
												</div>
												<div className='flex flex-col items-start'>
													<div
														className={cn(
															'text-primary flex flex-row text-base font-semibold',
															{ 'text-neutral': char.isDead },
														)}
													>
														{char.name}
														{char.surname ? `, ${char.surname}` : ''}
														{char.isDead && (
															<GiTombstone className='icon-neutral dark:icon-neutral icon-base mr-2' />
														)}
													</div>
													<div className='flex flex-row gap-2'>
														<div className='text-neutral-content text-sm capitalize'>
															{char.subspecies || ''} {char.species}
														</div>
														<div className='text-neutral-content'>
															Lvl. {char.level}
														</div>
													</div>

													<div className='flex flex-col'>
														<div className='text-neutral-content align-right italic'>
															{campaigns
																.filter(c => c.id === char.campaigns)
																.map(c => (
																	<span key={`campaign-${c.id}`}>
																		in {c.name}
																	</span>
																))}
														</div>
													</div>
													<div className='flex flex-row'>
														<progress
															className='progress progress-primary h-1 w-full md:w-full'
															value={char.experience}
															max={char.level * 100}
														></progress>
													</div>
												</div>
												<div className='flex flex-col justify-center gap-2'>
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
												<div className='flex flex-col items-center justify-start gap-1'>
													{(isEditor || char.creator === user?.id) && (
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
															<FiEdit className='icon-stone-900-sm' />
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
															<FiTrash2 className='icon-background-sm' />
														</SmallCircleButton>
													)}
												</div>
											</li>
										))}
								</ul>
							</div>
						))}
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
