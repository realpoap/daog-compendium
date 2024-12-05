import { useState } from "react";
import { BiMenu } from "rocketicons/bi";
import Nav from "./Nav";

const Sidebar = () => {
	const [open, setOpen] = useState(false);

	const toggleMenu = () => {
console.log('toggle');
		setOpen((prev) => !prev);
		console.log(open);
		
	}
	return (
		<header className='sticky top-0 h-1/4 z-50'>
        <section className='w-full  bg-stone-100  dark:bg-stone-800 shadow-md mx-auto p-2 flex justify-between font-grenze'>
          <h1 className=' font-bold text-2xl dark:text-stone-100 tracking-wider'>DAOG Compendium</h1>
      			<nav aria-label="main" className={`${open ? 'block' : 'hidden'} md:block space-x-10 text-xl tracking-wide`}>
							<Nav/>
						</nav>
					<button 
					id="hamburger-button"
					onClick={toggleMenu}
					className="cursor-pointer" >
						<BiMenu className="icon-stone-900 dark:icon-stone-100 icon-2xl"/>
					</button>
		    </section>
				<section onClick={toggleMenu} id="mobile-menu" className={`${open ? 'flex' : 'hidden'} absolute top-0 bg-purple-900 w-full text-5xl text-stone-100 flex-col justify-center origin-top animate-open-menu`}>
					<button className="text-6xl self-end px-6 font-grenze" >&times;</button>
					<nav aria-label="mobile" className="flex flex-col min-h-screen items-center py-8 gap-8 font-grenze font-semi-bold">
						<Nav/>
					</nav>
				</section>
    </header>
	);
}

export default Sidebar;
