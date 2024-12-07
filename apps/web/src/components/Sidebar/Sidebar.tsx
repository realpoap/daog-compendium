import { useState } from 'react';
import { BiMenu } from 'rocketicons/bi';
import Nav from './Nav';

const Sidebar = () => {
	const [open, setOpen] = useState(false);

	const toggleMenu = () => {
		setOpen(prev => !prev);
	};

	return (
		<header className='sticky top-0 z-50 h-1/4'>
			<section className='font-grenze mx-auto flex w-full justify-between bg-stone-100 p-2 shadow-md shadow-stone-900 dark:bg-stone-800'>
				<h1 className='text-2xl font-bold tracking-wider dark:text-stone-100'>
					DAOG Compendium
				</h1>
				<nav
					aria-label='main'
					className={`${open ? 'block' : 'hidden'} space-x-10 text-xl tracking-wide md:block`}
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
				className={`${open ? 'flex' : 'hidden'} animate-open-menu absolute top-0 w-full origin-top flex-col justify-center bg-purple-900 text-5xl text-stone-100`}
			>
				<button className='font-grenze self-end px-6 text-6xl'>&times;</button>
				<nav
					aria-label='mobile'
					className='font-grenze font-semi-bold fixed flex min-h-screen flex-col items-center gap-8 py-8'
				>
					<Nav />
				</nav>
			</section>
		</header>
	);
};

export default Sidebar;
