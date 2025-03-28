import { useAuth } from '@/store/authContext';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import {
	Attribute,
	AttributeArray,
	CreatureAttribute,
} from '@api/lib/ZodCreature';
import { SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { FiEdit } from 'rocketicons/fi';
import { SmallCircleButton } from '../Buttons';
import AttributeFormEdit from './utils/AttributeFormEdit';

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
	const { user } = useAuth();
	const [open, setOpen] = useState(false);
	const [defaultAttribute, setDefaultAttribute] = useState<Attribute>();
	const isOwner = user?.role === 'ADMIN';

	const openTooltip = () => {
		setOpen(true);
	};
	const closeTooltip = () => {
		setTimeout(() => {
			setOpen(false);
		}, 1000);
	};

	const deleteAttribute = trpc.creatures.updateAttribute.useMutation({
		onSuccess: () => {
			setAttributes(attributes.filter(a => a.name !== name));
			toast.success('Attribute deleted !');
		},
		onError: error => {
			toast.error('Could not remove attribute');
			throw new Error(error.message);
		},
	});

	const searchAttribute = trpc.attributes.getByName.useQuery(name);
	const searchCreature = trpc.creatures.getById.useQuery(creatureId, {
		enabled: searchAttribute.data !== undefined,
	});

	const updateAttributeOnCreature = trpc.creatures.updateAttribute.useMutation({
		onError: error => {
			if (error.shape)
				toast.error('Something bad happened when updating attributes...');
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		if (searchAttribute.data) {
			setDefaultAttribute(searchAttribute.data);
		}
	}, [searchAttribute.data, updateAttributeOnCreature.isSuccess]);

	useEffect(() => {
		if (searchCreature.data && searchAttribute.data) {
			searchCreature.data.attributes.map(a => {
				if (a.name === name) {
					const prunedArray = attributes.filter(a => a.name !== name);
					const { id, ...attribute } = searchAttribute.data;
					const attributeArray: AttributeArray = {
						id: creatureId,
						attributes: [...prunedArray, attribute],
					};
					updateAttributeOnCreature.mutate(attributeArray);
					setAttributes([...prunedArray, attribute]);
				}
			});
		}
	}, [searchCreature.data]);

	const removeAttribute = (name: string) => {
		if (!edit) return;
		const attributeArray: AttributeArray = {
			id: creatureId,
			attributes: attributes.filter(a => a.name !== name),
		};
		deleteAttribute.mutate(attributeArray);
	};

	return (
		<>
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
						'badge badge-md font-cabin bg-primary cursor-pointer border-none px-4 py-3 font-semibold text-stone-900 shadow-sm',
						{
							'hover:animate-shake': edit,
							'transition-all': edit,
							'duration-75': edit,
							'hover:bg-stone-800': edit,
							'hover:text-red-500': edit,
							'hover:shadow-black': edit,
							'hover:bg-secondary': !edit,
							'hover:font-bold': !edit,
							'hover:text-stone-100': !edit,
						},
					)}
					onClick={() => removeAttribute(name)}
				>
					{name}
				</button>
			</div>
			{isOwner && edit && defaultAttribute && (
				<SmallCircleButton
					color='bg-red-500'
					onClick={e => {
						e.stopPropagation();
						(
							document.getElementById(
								`${defaultAttribute.name}-attribute-form-edit`,
							) as HTMLDialogElement
						).showModal();
					}}
				>
					<FiEdit className='icon-stone-900-sm' />
				</SmallCircleButton>
			)}
			{createPortal(
				<AttributeFormEdit
					creatureId={creatureId}
					attributes={attributes}
					defaultAttribute={defaultAttribute}
					setAttributes={setAttributes}
				/>,
				document.body,
			)}
		</>
	);
};

export default Ability;
