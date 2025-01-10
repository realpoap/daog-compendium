type Props = {
	text: string;
	inputs: {
		[k: string]: number;
	};
};

const StatsGroup = ({ text, inputs }: Props) => {
	const values = Object.values(inputs);
	const titles = Object.keys(inputs);
	return (
		<table className='table-xs font-cabin m-0 table w-1/2 border-separate p-0'>
			<thead className='text-center font-bold dark:text-stone-200'>
				{text ? (
					<tr className='mb-0 border border-b-2 border-stone-500 text-center text-sm'>
						<td
							colSpan={3}
							className='font-grenze p-0 tracking-wider text-stone-500'
						>
							{text}
						</td>
					</tr>
				) : null}
				<tr className='text-primary text-sm tracking-wider'>
					{titles.map((t, i) => (
						<th
							className='p-0 px-1'
							key={`${text}-${i}`}
						>
							{t}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				<tr className='text-center'>
					{values.map((v, i) => (
						<th
							className='border-spacing-1 rounded-md px-1 text-base font-light hover:bg-stone-500'
							key={`${text}-${i}`}
						>
							{v}
						</th>
					))}
				</tr>
			</tbody>
		</table>
	);
};

export default StatsGroup;
