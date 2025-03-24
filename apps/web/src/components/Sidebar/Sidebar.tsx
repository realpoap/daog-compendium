import { useAuth } from '@/store/authContext';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { BiLogIn, BiLogOut, BiMenu, BiX } from 'rocketicons/bi';
import daogLogo from '../../data/daog-app.png';

import useNetworkStatus from '@/hooks/useNetworkStatus';
import { cn } from '@/utils/classNames';
import Nav from './Nav';

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	const { user, logout } = useAuth();
	const { isOnline } = useNetworkStatus();
	const navigate = useNavigate();

	const toggleMenu = () => {
		if (open) {
			document.getElementsByTagName('body')[0].classList.remove('fixed');
		} else {
			document.getElementsByTagName('body')[0].classList.add('fixed');
		}
		setOpen(prev => !prev);
	};

	const goToHome = () => {
		navigate({
			to: '/',
		});
	};

	return (
		<header className='sticky top-0 z-50 h-fit'>
			<section className='font-grenze dark:bg-card mx-auto flex w-full flex-row items-center justify-between gap-4 bg-stone-100 p-2 shadow-md shadow-stone-900'>
				<div className='w-content flex flex-row items-center justify-start gap-2'>
					<h1 className='text-2xl font-bold tracking-wider dark:text-stone-100'>
						<Link
							to='/'
							className='flex flex-row gap-2'
						>
							<img
								src={daogLogo}
								alt='daog-logo'
								className='size-8'
							/>
							{<span className='hover:text-primary hidden md:flex'>DAOG</span>}
						</Link>
					</h1>
					<span
						className={cn(`status border-none`, {
							'status-warning': !isOnline,
							'status-accent': isOnline,
							'status-neutral': user !== null,
						})}
					></span>
					{/* <label className='toggle text-base-content'>
						<input
							type='checkbox'
							value='synthwave'
							className='theme-controller'
						/>
						<FiSun />
						<FiMoon />
					</label> */}
				</div>

				<nav
					aria-label='main'
					className={`${open ? 'font-grenze block' : 'font-cabin hidden'} *:hover:text-primary mx-auto w-fit space-x-8 text-lg md:block`}
				>
					<Nav />
				</nav>
				<button
					id='hamburger-button'
					onClick={toggleMenu}
					className='cursor-pointer'
				>
					<BiMenu className='icon-background dark:icon-content icon-2xl' />
				</button>
			</section>

			<section
				onClick={toggleMenu}
				id='mobile-menu'
				className={`${open ? 'flex' : 'hidden'} bg-primary text-content from-secondary fixed top-0 z-30 h-screen w-screen flex-col justify-center overflow-hidden overflow-y-scroll overscroll-y-none bg-gradient-to-t from-[-70%] text-5xl`}
			>
				<button className='font-grenze absolute top-2 z-50 cursor-pointer self-end px-4 hover:opacity-80'>
					<BiX className='icon-background dark:icon-content icon-7xl cursor-pointer' />
				</button>
				<nav
					aria-label='mobile'
					className='font-grenze font-semi-bold z-40 flex h-screen flex-1 flex-col items-center justify-center gap-8 *:hover:opacity-80'
				>
					<Nav />
					{user && (
						<button
							id='logout-button'
							onClick={logout}
							className='cursor-pointer'
						>
							<BiLogOut className='icon-background dark:icon-content icon-4xl hover:opacity-80' />
						</button>
					)}
					{!user && (
						<button
							id='login-button'
							onClick={goToHome}
							className='cursor-pointer'
						>
							<BiLogIn className='icon-background dark:icon-content icon-4xl hover:opacity-80' />
						</button>
					)}
				</nav>
			</section>
		</header>
	);
};

export default Sidebar;
