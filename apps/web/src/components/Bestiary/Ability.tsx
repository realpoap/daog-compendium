import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { AttributeArray, CreatureAttribute } from '@api/lib/ZodCreature';
import { SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

type AbilityProps = {
	name: string;
	description: string;
	edit: boolean;
	creatureId: string;
	attributes: CreatureAttribute[];
	setAttributes: React.Dispatch<SetStateAction<CreatureAttribute[]>>;
};

const Ability = ({
	name,
	edit,
	creatureId,
	description,
	attributes,
	setAttributes,
}: AbilityProps) => {
	const [open, setOpen] = useState(false);

	const openTooltip = () => {
		setOpen(true);
	};
	const closeTooltip = () => {
		setTimeout(() => {
			setOpen(false);
		}, 1000);
	};

	const deleteAttribute = trpc.creatures.removeAttribute.useMutation({
		onSuccess: () => {
			setAttributes(attributes.filter(a => a.name !== name));
			toast.success('Attribute deleted 🗑️ !');
		},
		onError: error => {
			toast.error('Could not remove attribute');
			throw new Error(error.message);
		},
	});

	const removeAttribute = (name: string) => {
		const attributeArray: AttributeArray = {
			id: creatureId,
			attributes: attributes.filter(a => a.name !== name),
		};
		deleteAttribute.mutate(attributeArray);
	};

	return (
		<div
			className={`tooltip tooltip-bottom hover:tooltip-open ${open ? 'tooltip-open' : ''}`}
			data-tip={description}
			//tooltip-content in v5 daisyui
		>
			<button
				onMouseDown={openTooltip}
				onMouseUp={closeTooltip}
				onTouchStart={openTooltip}
				onTouchEnd={closeTooltip}
				className={cn(
					'badge badge-md font-cabin cursor-pointer border-none bg-purple-300 px-4 py-3 font-semibold shadow-sm',
					{
						'hover:animate-shake': edit,
						'transition-all': edit,
						'duration-75': edit,
						'hover:bg-stone-800': edit,
						'hover:text-red-500': edit,
						'hover:shadow-black': edit,
						'hover:bg-purple-500': !edit,
						'hover:font-bold': !edit,
						'hover:text-purple-300': !edit,
					},
				)}
				onClick={() => removeAttribute(name)}
			>
				{name}
			</button>
		</div>
	);
};

export default Ability;
