import { useAuth } from '@/store/authContext';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { ActionArray, type NewAction } from '@api/lib/ZodAction';
import { SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2 } from 'rocketicons/fi';

type ActionProps = {
	action: NewAction;
	creatureId: string;
	actions: NewAction[];
	setActions: React.Dispatch<SetStateAction<NewAction[]>>;
};

const ActionCard = ({
	action,
	actions,
	creatureId,
	setActions,
}: ActionProps) => {
	const { user } = useAuth();
	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';

	const actionByName = trpc.actions.getBySearchName.useQuery(
		action.searchName,
		{ enabled: action.searchName !== null },
	);

	const removeAction = trpc.creatures.removeAction.useMutation({
		onSuccess: () => {
			toast.success('Action deleted 🗑️ !');
		},
		onError: error => {
			toast.error('Could not remove action');
			throw new Error(error.message);
		},
	});

	const handleDelete = () => {
		setActions(actions.filter(a => a.searchName !== action?.searchName));
		const actionArray: ActionArray = {
			id: creatureId,
			actions: actions.filter(a => a.searchName !== action?.searchName),
		};
		removeAction.mutate(actionArray);
	};
	const handleEdit = () => {
		console.log('edit');
	};

	if (action && actionByName.data) {
		return (
			<div
				tabIndex={0}
				className='font-cabin group collapse items-center justify-center rounded-lg p-0 text-center text-sm focus:bg-stone-700 focus:shadow-lg sm:w-full md:w-1/2'
			>
				<div className='collapse-title text-md min-h-fit min-w-full rounded-lg bg-stone-700 bg-opacity-0 pe-0 ps-0 pt-2 font-medium transition-opacity hover:animate-pulse hover:bg-opacity-100 group-hover:bg-opacity-100 dark:text-stone-500 hover:dark:text-stone-200 group-focus:dark:text-stone-200 group-focus:dark:opacity-100'>
					<h4 className='w-full text-base font-bold uppercase tracking-wide'>
						{action.name}{' '}
						{action.damages ? (
							<span className='capitalize'>({action.damages})</span>
						) : action.heal ? (
							<span className='capitalize'>({action.heal})</span>
						) : (
							''
						)}{' '}
					</h4>
					<p className='font-grenze w-full text-base italic'>{action.flavor}</p>
				</div>
				<div className={cn('collapse-content w-full pb-0')}>
					<p className='flex flex-col items-center gap-1'>
						<span className='badge badge-sm uppercase'>{action?.action}</span>

						<span className='font-cabin text-md flex flex-row items-center align-baseline font-medium italic dark:text-stone-400'>
							{action?.type} {action?.target !== 'none' && action?.target}
							{action?.target === 'none'
								? 'noone'
								: action?.target === 'single'
									? ' creature'
									: action?.target === 'terrain'
										? 'terrain'
										: action?.target === 'self'
											? ''
											: ' creatures'}{' '}
						</span>

						<span>
							{action.damages ? (
								<span className='font-semibold capitalize'>
									Damages : {action.damages}
								</span>
							) : action.heal ? (
								<span className='font-semibold capitalize'>
									Heal : {action.heal}
								</span>
							) : (
								''
							)}
							<span className='font-semibold capitalize'>
								Range : {action.range}
							</span>
						</span>
					</p>
					<p className='my-2 italic'>{action.description}</p>
					<div className='absolute bottom-2 right-2 flex flex-row justify-end gap-2 pt-2'>
						{isEditor && (
							<div
								className='badge badge-lg badge-accent relative z-10 mt-2 size-6 items-center rounded-full border-0 p-0 shadow-sm shadow-stone-900'
								onClick={handleEdit}
							>
								<FiEdit className='dark:icon-stone-900-sm align-baseline' />
							</div>
						)}
						{user?.role === 'ADMIN' && (
							<div className='badge badge-lg relative z-10 mt-2 size-6 items-center rounded-full border-0 bg-red-500 p-0 shadow-sm shadow-stone-900'>
								<FiTrash2
									className='dark:icon-stone-900-sm align-baseline'
									onClick={handleDelete}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
};

export default ActionCard;
