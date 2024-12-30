type Props = {
	title?: string;
	stats: string[];
	value: number[];
};

const StatTrio = ({ title, stats, value }: Props) => {
	return (
		<table>
			<h3>{title}</h3>
			<thead>
				<tr>
					<td>{stats[0]}</td>
					<td>{stats[1]}</td>
					<td>{stats[2]}</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{value[0]}</td>
					<td>{value[1]}</td>
					<td>{value[2]}</td>
				</tr>
			</tbody>
		</table>
	);
};

export default StatTrio;
