import { Character, Masteries } from '@api/lib/ZodCharacter';
import TagBadge from '../TagBadge';
type Props = {
	char: Character;
};
const CharacterViewDialog = ({ char }: Props) => {
	return (
		<dialog
			id={`modal-char-${char.id}`}
			className='modal bg-card w-full'
		>
			<div className='modal-box bg-card h-[95%] w-full overflow-hidden'>
				<div className='tabs tabs-sm tabs-lift w-full'>
					<input
						type='radio'
						name='character-view_nav'
						className='tab'
						aria-label='Attributes'
					/>
					<div className='tab-content my-4'>
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
					</div>

					<input
						type='radio'
						name='character-view_nav'
						className='tab'
						aria-label='Skills'
						defaultChecked
					/>
					<div className='tab-content my-4'>
						<h3 className='text-lg font-bold'>Masteries</h3>
						<div className='grid grid-cols-6'>
							{char.masteries &&
								Object.keys(char.masteries).map(variable => (
									<div
										key={variable}
										className='text-xs'
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
						</div>
					</div>

					<input
						type='radio'
						name='character-view_nav'
						className='tab'
						aria-label='Inventory'
					/>
					<div className='tab-content my-4'>
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
					</div>
				</div>

				<p className='text-neutral py-4'>
					Press ESC key or click the button below to close
				</p>
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
