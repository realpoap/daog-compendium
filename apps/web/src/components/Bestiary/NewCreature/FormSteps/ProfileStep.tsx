import { ActionButton } from '@/components/Buttons';
import Collapsible from '@/components/Collapsible';
import { NewCreature } from '@api/lib/ZodCreature';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'rocketicons/ri';
import { Field, InputNumber } from '../../../RHFComponents/index';

const ProfileStep = ({
	handlePrevious,
	handleNext,
}: {
	handlePrevious: (step: number) => void;
	handleNext: (
		inputs: (keyof NewCreature)[],
		nextStep: number,
	) => Promise<void>;
}) => {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center'>
			<div className='flex flex-col flex-wrap items-center justify-between md:w-full md:flex-row'>
				<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
					<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
						Adroitness
					</h4>
					<div className='flex w-full flex-row justify-center gap-2 px-2'>
						<Field
							name='stats.CEL'
							label='CEL'
						>
							<InputNumber name='stats.CEL' />
						</Field>
						<Field
							name='stats.AGI'
							label='AGI'
						>
							<InputNumber name='stats.AGI' />
						</Field>
						<Field
							name='stats.DEX'
							label='DEX'
						>
							<InputNumber name='stats.DEX' />
						</Field>
					</div>
				</section>
				<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
					<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
						Constitution
					</h4>
					<div className='flex w-full flex-row justify-center gap-2 px-2'>
						<Field
							name='stats.STR'
							label='STR'
						>
							<InputNumber name='stats.STR' />
						</Field>
						<Field
							name='stats.END'
							label='END'
						>
							<InputNumber name='stats.END' />
						</Field>
						<Field
							name='stats.VIT'
							label='VIT'
						>
							<InputNumber name='stats.VIT' />
						</Field>
					</div>
				</section>
				<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
					<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
						Perception
					</h4>
					<div className='flex w-full flex-row justify-center gap-2 px-2'>
						<Field
							name='stats.WIL'
							label='WIL'
						>
							<InputNumber name='stats.WIL' />
						</Field>
						<Field
							name='stats.INS'
							label='INS'
						>
							<InputNumber name='stats.INS' />
						</Field>
						<Field
							name='stats.SEN'
							label='SEN'
						>
							<InputNumber name='stats.SEN' />
						</Field>
					</div>
				</section>
				<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
					<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
						Shroudness
					</h4>
					<div className='flex w-full flex-row justify-center gap-2 px-2'>
						<Field
							name='stats.CHA'
							label='CHA'
						>
							<InputNumber name='stats.CHA' />
						</Field>
						<Field
							name='stats.SOC'
							label='SOC'
						>
							<InputNumber name='stats.SOC' />
						</Field>
						<Field
							name='stats.ERU'
							label='ERU'
						>
							<InputNumber name='stats.ERU' />
						</Field>
					</div>
				</section>
			</div>
			<Collapsible title='add modifiers'>
				<div className='flex w-full flex-wrap items-center justify-center gap-4 pb-0 md:flex-row'>
					<Field
						name='attackBonus'
						label='&#xb1; Attack'
						width='small'
					>
						<InputNumber name='attackBonus' />
					</Field>
					<Field
						name='defenseBonus'
						label='&#xb1; Defense'
						width='small'
					>
						<InputNumber name='defenseBonus' />
					</Field>
					<Field
						name='rangedBonus'
						label='&#xb1; Ranged'
						width='small'
					>
						<InputNumber name='rangedBonus' />
					</Field>
					<Field
						name='perceptionBonus'
						label='&#xb1; Perception'
						width='small'
					>
						<InputNumber name='perceptionBonus' />
					</Field>
					<Field
						name='armor'
						label='&#xb1; Armor'
						width='small'
					>
						<InputNumber name='armor' />
					</Field>
					<Field
						name='discretionBonus'
						label='&#xb1; Discretion'
						width='small'
					>
						<InputNumber name='discretionBonus' />
					</Field>
					<Field
						name='magic'
						label='&#xb1; Magic'
						width='small'
					>
						<InputNumber name='magic' />
					</Field>
					<Field
						name='glory'
						label='&#xb1; Glory'
						width='small'
					>
						<InputNumber name='glory' />
					</Field>
				</div>
			</Collapsible>

			<div className='flex w-full flex-row items-center justify-center gap-4'>
				<ActionButton
					color='primary'
					textColor='stone-800'
					onClick={() => handlePrevious(1)}
				>
					<span className='pr-4 align-middle'>
						<RiArrowDropLeftLine className='icon-stone-800-base' /> Prev
					</span>
				</ActionButton>
				<ActionButton
					color='primary'
					textColor='stone-800'
					onClick={() => handleNext(['stats'], 3)}
				>
					<span className='pl-4 align-middle'>
						Next <RiArrowDropRightLine className='icon-stone-800-base' />
					</span>
				</ActionButton>
			</div>
		</div>
	);
};

export default ProfileStep;
