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
					<tr className='border-neutral border-1 mb-0 text-center text-sm'>
						<td
							colSpan={3}
							className='font-grenze text-neutral p-0 text-base tracking-wider'
						>
							{text}
						</td>
					</tr>
				) : null}
				<tr className='text-primary text-sm'>
					{titles.map((t, i) => (
						<th
							className='p-0 px-0'
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
							className='hover:bg-tile border-spacing-1 rounded-md px-1 text-base font-light'
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
