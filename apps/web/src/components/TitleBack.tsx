const TitleBack = ({ title }: { title: string }) => {
	return (
		<>
			<button
				className='badge font-cabin mt-1 align-middle text-base uppercase text-stone-500 hover:text-stone-200'
				onClick={() => history.go(-1)}
			>
				<span className='text-2xl'>&#8249;</span> Back
			</button>
			<div className='container sticky top-10 z-10 flex h-fit flex-col items-center bg-gradient-to-b from-stone-100 from-80% dark:from-stone-800'>
				<h1 className='font-grenze sticky mx-auto my-4 text-center text-6xl font-bold tracking-wide text-purple-900 md:mt-8 dark:text-purple-400'>
					{title}
				</h1>
			</div>
		</>
	);
};

export default TitleBack;
