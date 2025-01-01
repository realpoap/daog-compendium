import { type NewAction } from '@api/lib/ZodAction';
import { SetStateAction } from 'react';
import ActionCard from './ActionCard';

type ActionComponentProps = {
	actions: NewAction[];
	setActions: React.Dispatch<SetStateAction<NewAction[]>>;
	creatureId: string;
};

const ActionComponent = ({
	actions,
	creatureId,
	setActions,
}: ActionComponentProps) => {
	return (
		<div className='flex w-1/2 flex-col items-center justify-center gap-1 px-2'>
			<h3 className='font-grenze line mb-1 border-b-2 text-4xl font-semibold tracking-wider'>
				Actions
			</h3>
			{actions
				?.filter(a => a.action !== 'epic')
				.map(a => (
					<ActionCard
						key={a.name}
						action={a}
						creatureId={creatureId}
						actions={actions}
						setActions={setActions}
					/>
				))}
			{actions.some(a => a.action === 'epic') && (
				<div className='flex w-full flex-col items-center justify-center gap-1 px-2'>
					<h3 className='font-grenze line mb-1 border-b-2 text-4xl font-semibold tracking-wider'>
						Epics
					</h3>
					{actions
						?.filter(a => a.action === 'epic')
						.map(a => (
							<ActionCard
								key={a.name}
								action={a}
								creatureId={creatureId}
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
