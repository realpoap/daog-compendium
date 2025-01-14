type Props = {
	title: string;
	children: React.ReactNode;
};
const Collapsible = ({ title, children }: Props) => {
	return (
		<div className='mb-4 flex w-full flex-col items-center justify-start'>
			<div className='container w-full pb-0'>
				<details className='group flex w-full flex-col items-center justify-start rounded-sm'>
					<summary className='font-cabin hover:text-primary focus:text-primary m-0 flex w-full cursor-pointer flex-row flex-wrap items-center justify-center gap-1 rounded border-0 p-1 align-middle text-sm font-bold focus:outline-none focus:ring-1 focus:ring-transparent dark:text-stone-500'>
						<div className='text-primary align-middle transition-transform duration-200 group-open:rotate-90'>
							&#9656;
						</div>
						<h3 className='align-middle'>{title}</h3>
					</summary>
					<div className='mx-4 mb-4 flex w-[80dvw] flex-col items-center border-x border-stone-500 px-2 md:mx-10'>
						{children}
					</div>
				</details>
			</div>
		</div>
	);
};

export default Collapsible;
