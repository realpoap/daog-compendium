import TagBadge from '@/components/TagBadge';
import { Item } from '@api/lib/ZodItem';

type Props = {
	item: Item;
};

const PropertiesBlock = ({ item }: Props) => {
	return (
		<div className='flex flex-col'>
			<div className='flex flex-col gap-2'>
				{item.itemType === 'weapon' && (
					<div className='flex flex-col'>
						{item.rangeType === 'close' && (
							<span>Type : {item.weaponType}</span>
						)}
						{item.rangeType !== 'close' && (
							<span>
								Range : {item.rangeType}{' '}
								{item.range && <span>({item.range})</span>}
							</span>
						)}
						<span>
							Damages : {item.damages} <span>Deals critical damages !</span>
						</span>
						<div className='flex flex-row gap-2'>
							Damage types :
							{item.inflictType &&
								item?.inflictType.map(r => (
									<TagBadge
										button={false}
										key={`inflict-${r}`}
										text={r}
									/>
								))}
						</div>
					</div>
				)}
				{(item.itemType === 'armor' || item.itemType === 'shield') && (
					<div className='flex flex-col'>
						<div className='flex flex-col'>
							<span>Armor : {item.armorClass}</span>
							<span>
								Protection : {item.protection}{' '}
								<span>Resist critical damages !</span>
							</span>
							<span>
								Durability : {item.durability} /{' '}
								{item.maxDurability ?? item.durability}
							</span>

							{item.magicProtection && (
								<span>Magic resistance : {item.magicProtection}</span>
							)}
						</div>
						<div className='flex flex-row gap-2'>
							Resistant to :
							{item.resistType &&
								item.resistType.map(r => (
									<TagBadge
										button={false}
										key={`resist-${r}`}
										text={r}
									/>
								))}
						</div>
					</div>
				)}
				<div className='flex flex-row items-baseline gap-1'>
					Constraints :{' '}
					{item.constraints &&
						Object.entries(item.constraints).map(
							([k, v]) =>
								v !== 0 && (
									<TagBadge
										text={`${k} ${v}`}
										key={`${item.id}-${k}`}
										button={false}
									/>
								),
						)}
				</div>
				{item.properties && (
					<div>
						<span>Properties : {item.properties}</span>
						<div className='divider divider-neutral'></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PropertiesBlock;
