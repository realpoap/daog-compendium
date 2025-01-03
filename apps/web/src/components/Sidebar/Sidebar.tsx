import { useAuth } from '@/store/authContext';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { BiLogIn, BiLogOut, BiMenu } from 'rocketicons/bi';
import daogLogo from '../../data/daog-app.png';

import Nav from './Nav';

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	const { user, logout } = useAuth();
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
		<header className='sticky top-0 z-50 h-1/4'>
			<section className='font-grenze mx-auto flex w-full items-center justify-between gap-4 bg-stone-100 p-2 shadow-md shadow-stone-900 dark:bg-stone-800'>
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
						{<span className='hidden md:flex'>DAOG</span>}
					</Link>
				</h1>
				{user && (
					<p className='font-cabin w-1/2 pt-1 text-center align-baseline italic text-stone-500 md:w-[20dvw]'>
						logged in as {capitalizeFirstLetter(user.name)}
					</p>
				)}
				<nav
					aria-label='main'
					className={`${open ? 'block' : 'hidden'} relative -left-[10dvw] mx-auto space-x-10 text-xl tracking-wide md:block`}
				>
					<Nav />
				</nav>
				<button
					id='hamburger-button'
					onClick={toggleMenu}
					className='cursor-pointer'
				>
					<BiMenu className='icon-stone-900 dark:icon-stone-100 icon-2xl' />
				</button>
			</section>
			<section
				onClick={toggleMenu}
				id='mobile-menu'
				className={`${open ? 'flex' : 'hidden'} fixed top-0 h-screen w-screen origin-top flex-col justify-center overflow-hidden overflow-y-scroll overscroll-y-none bg-purple-900 text-5xl text-stone-100`}
			>
				<button className='font-grenze fixed top-2 self-end px-6 text-6xl'>
					&times;
				</button>
				<nav
					aria-label='mobile'
					className='font-grenze font-semi-bold z-50 flex h-screen flex-1 flex-col items-center justify-center gap-6 py-8'
				>
					<Nav />
					{user && (
						<button
							id='logout-button'
							onClick={logout}
							className='cursor-pointer'
						>
							<BiLogOut className='icon-stone-900 dark:icon-stone-100 icon-2xl' />
						</button>
					)}
					{!user && (
						<button
							id='login-button'
							onClick={goToHome}
							className='cursor-pointer'
						>
							<BiLogIn className='icon-stone-900 dark:icon-stone-100 icon-2xl' />
						</button>
					)}
				</nav>
			</section>
		</header>
	);
};

export default Sidebar;
