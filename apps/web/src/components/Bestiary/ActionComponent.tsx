import { type NewAction } from '@api/lib/ZodAction';
import { ActionList } from '@api/lib/ZodCreature';
import { SetStateAction } from 'react';
import ActionCard from './ActionCard';

type ActionComponentProps = {
	actionList: ActionList;
	actions: NewAction[];
	setActions: React.Dispatch<SetStateAction<NewAction[]>>;
	creatureId: string;
	creatureName: string;
};

const ActionComponent = ({
	actionList,
	actions,
	creatureId,
	setActions,
	creatureName,
}: ActionComponentProps) => {
	return (
		<div className='my-4 flex h-fit w-full flex-col items-center justify-start gap-2 px-2'>
			<h3 className='font-grenze text-4xl font-semibold tracking-wider'>
				Actions
			</h3>
			<span className='badge badge-sm uppercase'>{actionList?.main} main</span>

			{actions
				?.filter(a => a.action !== 'epic')
				.map(a => (
					<ActionCard
						key={a.name}
						action={a}
						creatureId={creatureId}
						creatureName={creatureName}
						actions={actions}
						setActions={setActions}
					/>
				))}
			{actions.some(a => a.action === 'epic') && (
				<div className='flex w-full flex-col items-center justify-center gap-1 px-2'>
					<h3 className='font-grenze line mb-1 border-b-2 text-4xl font-semibold tracking-wider'>
						Epics
					</h3>
					<span className='badge badge-sm uppercase'>
						{actionList?.main} epic
					</span>
					{actions
						?.filter(a => a.action === 'epic')
						.map(a => (
							<ActionCard
								key={a.searchName}
								action={a}
								creatureId={creatureId}
								creatureName={creatureName}
								actions={actions}
								setActions={setActions}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default ActionComponent;
