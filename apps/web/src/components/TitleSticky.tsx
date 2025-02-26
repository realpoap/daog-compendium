const TitleSticky = ({ title }: { title: string }) => {
	return (
		<div className='container sticky top-10 z-10 flex h-fit flex-col items-center bg-gradient-to-b from-stone-100 from-80% dark:from-stone-800'>
			<h1 className='font-grenze text-primary sticky mx-auto my-4 text-center text-4xl font-bold tracking-wide md:mt-8 md:text-6xl'>
				{title}
			</h1>
		</div>
	);
};

export default TitleSticky;
