import { cn } from '@/utils/classNames';
import { NewCreature } from '@api/lib/ZodCreature';
import { SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { Field, InputNumber } from '../RHFComponents/index';

const ProfileStep = ({
	setStep,
}: {
	setStep: React.Dispatch<SetStateAction<number>>;
}) => {
	return (
		<div className='flex w-full flex-col items-center justify-center'>
			<div className='flex flex-col flex-wrap items-center justify-between gap-4 px-[4vw] md:flex-row'>
				<section className='container flex flex-col items-center justify-center md:w-5/12'>
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
				<section className='container flex flex-col items-center justify-center md:w-5/12'>
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
				<section className='container flex flex-col items-center justify-center md:w-5/12'>
					<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
						Perception
					</h4>
					<div className='flex flex-row justify-center gap-2'>
						<Field
							name='stats.COU'
							width='small'
							label='COU'
						>
							<InputNumber name='stats.COU' />
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
				<section className='container flex flex-col items-center justify-center md:w-5/12'>
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
							<InputNumber name='stasts.SOC' />
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
			<div
				className='collapse mt-4'
				tabIndex={0}
			>
				<input
					type='checkbox'
					className='peer min-h-2'
				/>
				<div className='collapse-title font-noto m-0 ml-[5vw] mt-2 min-h-2 py-0 text-xs text-purple-400'>
					+ modifiers
				</div>
				<div
					className={cn(
						'collapse-content peer-checked:collapse-open flex w-full flex-wrap items-center justify-center gap-4 pb-0 pr-0 md:flex-row',
					)}
				>
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
				</div>
			</div>

			<div className='flex w-full flex-row items-center justify-center gap-4'>
				<button
					className='font-grenze m-y-2 mt-8 flex w-1/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					onClick={() => setStep(1)}
				>
					Prev &#10094;
				</button>
				<button
					className='font-grenze m-y-2 mt-8 flex w-1/3 flex-col items-center justify-center self-center rounded-lg bg-purple-500 px-4 py-2 text-xl font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500'
					onClick={() => setStep(3)}
				>
					Next &#10095;
				</button>
			</div>
		</div>
	);
};

export default ProfileStep;
