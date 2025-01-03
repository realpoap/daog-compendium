import { useAuth } from '@/store/authContext';
import { cn } from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { ActionArray, type NewAction } from '@api/lib/ZodAction';
import { SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2 } from 'rocketicons/fi';
import { SmallCircleButton } from '../Buttons';
import ActionFormEdit from './utils/ActionFormEdit';

type ActionProps = {
	action: NewAction;
	creatureId: string;
	creatureName: string;
	actions: NewAction[];
	setActions: React.Dispatch<SetStateAction<NewAction[]>>;
};

const ActionCard = ({
	action,
	actions,
	creatureId,
	creatureName,
	setActions,
}: ActionProps) => {
	const { user } = useAuth();
	const isEditor = user?.role === 'ADMIN' || user?.role === 'EDITOR';

	const actionByName = trpc.actions.getBySearchName.useQuery(
		action.searchName,
		{ enabled: action.searchName !== null },
	);

	const removeAction = trpc.creatures.updateAction.useMutation({
		onSuccess: () => {
			setActions(actions.filter(a => a.searchName !== action?.searchName));
			toast.success('Action deleted 🗑️ !');
		},
		onError: error => {
			toast.error('Could not remove action');
			throw new Error(error.message);
		},
	});

	const handleDelete = () => {
		const actionArray: ActionArray = {
			id: creatureId,
			actions: actions.filter(a => a.searchName !== action?.searchName),
		};
		removeAction.mutate(actionArray);
	};
	const handleEdit = () => {
		(
			document.getElementById(
				`${action.searchName}-action-form-edit`,
			) as HTMLDialogElement
		).showModal();
	};

	if (action && actionByName.data) {
		return (
			<>
				<div
					id={`${action.searchName}-collapse`}
					tabIndex={0}
					className={cn(
						'font-cabin group pointer-events-auto collapse items-center justify-center overflow-visible rounded-lg p-0 text-center text-sm opacity-100 transition-colors duration-1000 ease-out hover:bg-stone-700 focus:bg-stone-700 focus:shadow-lg md:w-1/2',
					)}
				>
					<div
						className={cn(
							'collapse-title text-md pointer-events-none min-h-fit rounded-lg py-0 pe-0 ps-0 font-medium transition-opacity dark:text-stone-200 group-focus:dark:text-stone-200',
						)}
					>
						<h4 className='w-full px-8 pt-1 text-base font-bold uppercase tracking-wide'>
							{action.name}{' '}
							{action.damages ? (
								<span className='capitalize'>({action.damages})</span>
							) : action.heal ? (
								<span className='capitalize'>({action.heal})</span>
							) : (
								''
							)}{' '}
						</h4>

						{action.flavor && (
							<p className='font-grenze w-full pb-1 align-middle text-sm italic tracking-wide'>
								{action.flavor}
							</p>
						)}
					</div>
					<div className={cn('collapse-content pointer-events-none p-0')}>
						<p className='mt-1 flex flex-col items-center gap-1'>
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
							</span>
							<span className='font-semibold capitalize'>
								Range : {action.range}
							</span>
						</p>
						{action?.description && (
							<p className='my-2 text-justify italic'>{action.description}</p>
						)}
						<div
							className={`pointer-events-auto absolute right-1 top-2 z-10 flex flex-col justify-end gap-1`}
						>
							{isEditor && (
								<SmallCircleButton onClick={handleEdit}>
									<FiEdit className='dark:icon-stone-900-sm align-baseline' />
								</SmallCircleButton>
							)}
							{user?.role === 'ADMIN' && (
								<SmallCircleButton
									color='bg-red-500'
									onClick={handleDelete}
								>
									<FiTrash2 className='dark:icon-stone-900-sm align-baseline' />
								</SmallCircleButton>
							)}
						</div>
					</div>
					{createPortal(
						<ActionFormEdit
							creatureId={creatureId}
							creatureName={creatureName}
							actions={actions}
							setActions={setActions}
							defaultAction={action}
						/>,
						document.body,
					)}
				</div>
			</>
		);
	}
};

export default ActionCard;
