const SkeletonList = () => {
	return (
		<div className='mt-16 flex h-full w-full flex-col items-center justify-start gap-4'>
			<div className='skeleton dark:bg-card h-16 w-1/3'></div>
			<div className='skeleton dark:bg-card h-8 w-1/4'></div>

			<div className='skeleton dark:bg-card mt-4 h-4 w-1/3'></div>
			<div className='skeleton dark:bg-card h-4 w-1/4'></div>
			<div className='skeleton dark:bg-card h-16 w-1/3'></div>

			<div className='skeleton dark:bg-card mt-4 h-4 w-1/3'></div>
			<div className='skeleton dark:bg-card h-4 w-1/4'></div>
			<div className='skeleton dark:bg-card h-16 w-1/3'></div>

			<div className='skeleton dark:bg-card mt-4 h-4 w-1/3'></div>
			<div className='skeleton dark:bg-card h-4 w-1/4'></div>
			<div className='skeleton dark:bg-card h-16 w-1/3'></div>
		</div>
	);
};

export default SkeletonList;
