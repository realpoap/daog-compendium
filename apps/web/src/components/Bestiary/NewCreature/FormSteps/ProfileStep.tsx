import { ActionButton } from '@/components/Buttons';
import Collapsible from '@/components/Collapsible';
import { cn } from '@/utils/classNames';
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
		<div className='flex w-full flex-col items-center justify-center'>
			<div className='flex flex-col flex-wrap items-center justify-between px-[2vw] md:w-full md:flex-row'>
				<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
					<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
						Adroitness
					</h4>
					<div className='flex flex-row justify-center gap-2'>
						<Field
							name='stats.CEL'
							width='small'
							label='CEL'
						>
							<InputNumber name='stats.CEL' />
						</Field>
						<Field
							name='stats.AGI'
							width='small'
							label='AGI'
						>
							<InputNumber name='stats.AGI' />
						</Field>
						<Field
							name='stats.DEX'
							width='small'
							label='DEX'
						>
							<InputNumber name='stats.DEX' />
						</Field>
					</div>
				</section>
				<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
					<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
						Constitution
					</h4>
					<div className='flex flex-row justify-center gap-2'>
						<Field
							name='stats.STR'
							width='small'
							label='STR'
						>
							<InputNumber name='stats.STR' />
						</Field>
						<Field
							name='stats.END'
							width='small'
							label='END'
						>
							<InputNumber name='stats.END' />
						</Field>
						<Field
							name='stats.VIT'
							width='small'
							label='VIT'
						>
							<InputNumber name='stats.VIT' />
						</Field>
					</div>
				</section>
				<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
					<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
						Perception
					</h4>
					<div className='flex flex-row justify-center gap-2'>
						<Field
							name='stats.WIL'
							width='small'
							label='WIL'
						>
							<InputNumber name='stats.WIL' />
						</Field>
						<Field
							name='stats.INS'
							width='small'
							label='INS'
						>
							<InputNumber name='stats.INS' />
						</Field>
						<Field
							name='stats.SEN'
							width='small'
							label='SEN'
						>
							<InputNumber name='stats.SEN' />
						</Field>
					</div>
				</section>
				<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
					<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
						Shroudness
					</h4>
					<div className='flex flex-row justify-center gap-2'>
						<Field
							name='stats.CHA'
							width='small'
							label='CHA'
						>
							<InputNumber name='stats.CHA' />
						</Field>
						<Field
							name='stats.SOC'
							width='small'
							label='SOC'
						>
							<InputNumber name='stats.SOC' />
						</Field>
						<Field
							name='stats.ERU'
							width='small'
							label='ERU'
						>
							<InputNumber name='stats.ERU' />
						</Field>
					</div>
				</section>
			</div>
			<Collapsible title='add modifiers'>
				<Field
					name='attackBonus'
					label='&#xb1; Attack'
					width='tiny'
				>
					<InputNumber name='attackBonus' />
				</Field>
				<Field
					name='defenseBonus'
					label='&#xb1; Defense'
					width='tiny'
				>
					<InputNumber name='defenseBonus' />
				</Field>
				<Field
					name='rangedBonus'
					label='&#xb1; Ranged'
					width='tiny'
				>
					<InputNumber name='rangedBonus' />
				</Field>
				<Field
					name='perceptionBonus'
					label='&#xb1; Perception'
					width='tiny'
				>
					<InputNumber name='perceptionBonus' />
				</Field>
				<Field
					name='armor'
					label='&#xb1; Armor'
					width='tiny'
				>
					<InputNumber name='armor' />
				</Field>
				<Field
					name='discretionBonus'
					label='&#xb1; Discretion'
					width='tiny'
				>
					<InputNumber name='discretionBonus' />
				</Field>
				<Field
					name='magic'
					label='&#xb1; Magic'
					width='tiny'
				>
					<InputNumber name='magic' />
				</Field>
				<Field
					name='glory'
					label='&#xb1; Glory'
					width='tiny'
				>
					<InputNumber name='glory' />
				</Field>
			</Collapsible>

			<div className='flex w-full flex-row items-center justify-center gap-4'>
				<ActionButton
					color='purple-500'
					textColor='stone-800'
					onClick={() => handlePrevious(1)}
				>
					<span className='pr-4 align-middle'>
						<RiArrowDropLeftLine className='icon-stone-800-base' /> Prev
					</span>
				</ActionButton>
				<ActionButton
					color='purple-500'
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
