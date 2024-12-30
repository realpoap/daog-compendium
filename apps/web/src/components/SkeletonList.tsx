const SkeletonList = () => {
	return (
		<div className='mt-16 flex h-[100dvh] flex-col items-center justify-start gap-4'>
			<div className='skeleton h-16 w-1/3 dark:bg-stone-700'></div>
			<div className='skeleton h-8 w-1/4 dark:bg-stone-700'></div>

			<div className='skeleton mt-4 h-4 w-1/3 dark:bg-stone-700'></div>
			<div className='skeleton h-4 w-1/4 dark:bg-stone-700'></div>
			<div className='skeleton h-16 w-1/3 dark:bg-stone-700'></div>

			<div className='skeleton mt-4 h-4 w-1/3 dark:bg-stone-700'></div>
			<div className='skeleton h-4 w-1/4 dark:bg-stone-700'></div>
			<div className='skeleton h-16 w-1/3 dark:bg-stone-700'></div>

			<div className='skeleton mt-4 h-4 w-1/3 dark:bg-stone-700'></div>
			<div className='skeleton h-4 w-1/4 dark:bg-stone-700'></div>
			<div className='skeleton h-16 w-1/3 dark:bg-stone-700'></div>
		</div>
	);
};

export default SkeletonList;
