import { SmallCircleButton } from '@/components/Buttons';
import { useAuth } from '@/store/authContext';
import { capitalizeFirstLetter } from '@/utils/capitalize';
import { trpc } from '@/utils/trpc';
import { Item } from '@api/lib/zod-prisma';
import { Component } from '@api/lib/ZodComponent';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiUserPlus } from 'rocketicons/fi';

type Props = {
	item: Item | Component;
};

const EquipBlock = ({ item }: Props) => {
	const { user } = useAuth();

	const [selectedUser, setSelectedUser] = useState<string>('');
	const [characterList, setCharacterList] =
		useState<{ id: string; fullname: string }[]>();

	const getCharacterList = trpc.characters.getPlayerCharacters.useQuery(
		user && user?.characters.length !== 0 ? user.characters : [],
		{ enabled: user != null },
	);

	const updateItems = trpc.characters.updateItems.useMutation({
		onSuccess: data => {
			toast.success(`Item added to ${data?.bio.name}!`);
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});

	const updateComponents = trpc.characters.updateComponents.useMutation({
		onSuccess: data => {
			toast.success(`Component added to ${data?.bio.name}!`);
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		if (getCharacterList.data) setCharacterList(getCharacterList.data);
	}, [getCharacterList.data]);

	const handleAddItem = (
		userId: string | undefined,
		itemName: string,
		itemId: string,
	) => {
		const itemObject = {
			id: itemId,
			name: itemName,
			quantity: 1,
		};
		if (userId == null) return;
		if ('itemType' in item)
			updateItems.mutate({ id: userId, item: itemObject });
		if ('componentType' in item)
			updateComponents.mutate({ id: userId, item: itemObject });
	};
	return (
		<>
			{user && characterList && (
				<div className='flex flex-row gap-4'>
					<select
						aria-placeholder='Assign to character'
						value={selectedUser}
						onChange={e => setSelectedUser(e.target.value)}
						className='font-cabin dark:text-primary dark:caret-primary peer-default:dark:text-neutral dark:bg-card w-content xs:w-fit min-h-fit rounded-md py-0 text-sm text-xs shadow-sm'
					>
						<option
							disabled
							value=''
						>
							Select a character
						</option>
						{characterList.map(option => (
							<option
								className='bg-card font-cabin'
								value={option.id}
								key={option.id}
							>
								{capitalizeFirstLetter(option.fullname)}
							</option>
						))}
					</select>
					<SmallCircleButton
						disabled={!selectedUser}
						onClick={() => handleAddItem(selectedUser, item?.name[0], item?.id)}
					>
						<FiUserPlus className='icon-background xs:icon-sm size-3' />
					</SmallCircleButton>
				</div>
			)}
		</>
	);
};

export default EquipBlock;
