import { Character, Masteries } from '@api/lib/ZodCharacter';
import TagBadge from '../TagBadge';
type Props = {
	char: Character;
};
const CharacterViewDialog = ({ char }: Props) => {
	return (
		<dialog
			id={`modal-char-${char.id}`}
			className='modal bg-card'
		>
			<div className='modal-box bg-card'>
				<h3 className='text-lg font-bold'>Attributes</h3>
				<div className='space-x-1'>
					{char.path?.attributes?.map(att => (
						<TagBadge
							key={att.name}
							text={att.name}
							tooltip={att.description ?? ''}
							button={false}
						/>
					))}
				</div>

				<h3 className='text-lg font-bold'>Masteries</h3>
				<div className='flex flex-col'>
					{char.masteries &&
						Object.keys(char.masteries).map(variable => (
							<div
								key={variable}
								className='flex flex-row'
							>
								<span>{variable}:</span>
								<span>
									{char.masteries[variable as keyof Masteries].current}
								</span>
							</div>
						))}
				</div>
				<h3 className='text-lg font-bold'>Skills</h3>
				<div className='overflow-x-auto'>
					<table className='table-xs table'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Lvl</th>
								<th>Points</th>
								<th>Mastery</th>
							</tr>
						</thead>
						<tbody>
							{char.path?.skills?.map(skill => (
								<tr
									key={skill.id}
									className='hover:bg-neutral'
								>
									<th>{skill.name}</th>
									<th>{skill.playerLevel}</th>
									<th>
										{skill.playerPoints}/{(skill.playerLevel ?? 0) + 1}
									</th>
									<th>{skill.mastery}</th>
								</tr>
							))}
						</tbody>
					</table>

					<h3 className='text-lg font-bold'>Items</h3>
					{char.equipment.items?.map(item => (
						<li key={item.id}>
							{item.quantity}x {item.name}
						</li>
					))}
					<h3 className='text-lg font-bold'>Components</h3>
					{char.equipment.components?.map(item => (
						<li key={item.id}>
							{item.quantity}x {item.name}
						</li>
					))}
					<p className='text-neutral py-4'>
						Press ESC key or click the button below to close
					</p>
				</div>
			</div>
			<form
				method='dialog'
				className='modal-backdrop'
			>
				<button>close</button>
			</form>
		</dialog>
	);
};

export default CharacterViewDialog;
