import { Field, InputNumber, Select } from '@/components/RHFComponents';
import { useCharacterForm } from '@/store/characterContext';

const CharFormStep9 = () => {
	const { methods } = useCharacterForm();
	const tree = methods.watch('path.tree');

	return (
		<div>
			<fieldset>
				<Field
					name='path.tree'
					label='Talent tree'
				>
					<Select
						name='path.tree'
						options={['Adroitness', 'Constitution', 'Perception', 'Shroudness']}
						defaultValue=''
					/>
				</Field>
				{tree === 'Adroitness' && (
					<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
						<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
							Adroitness
						</h4>
						<div className='flex flex-row justify-center gap-2'>
							<Field
								name='profile.statsStarting.CEL'
								width='small'
								label='CEL'
							>
								<InputNumber name='profile.statsStarting.CEL' />
							</Field>
							<Field
								name='profile.statsStarting.AGI'
								width='small'
								label='AGI'
							>
								<InputNumber name='profile.statsStarting.AGI' />
							</Field>
							<Field
								name='profile.statsStarting.DEX'
								width='small'
								label='DEX'
							>
								<InputNumber name='profile.statsStarting.DEX' />
							</Field>
						</div>
					</section>
				)}
				{tree === 'Constitution' && (
					<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
						<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
							Constitution
						</h4>
						<div className='flex flex-row justify-center gap-2'>
							<Field
								name='profile.statsStarting.STR'
								width='small'
								label='STR'
							>
								<InputNumber name='profile.statsStarting.STR' />
							</Field>
							<Field
								name='profile.statsStarting.END'
								width='small'
								label='END'
							>
								<InputNumber name='profile.statsStarting.END' />
							</Field>
							<Field
								name='profile.statsStarting.VIT'
								width='small'
								label='VIT'
							>
								<InputNumber name='profile.statsStarting.VIT' />
							</Field>
						</div>
					</section>
				)}
				{tree === 'Perception' && (
					<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
						<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
							Perception
						</h4>
						<div className='flex flex-row justify-center gap-2'>
							<Field
								name='profile.statsStarting.WIL'
								width='small'
								label='WIL'
							>
								<InputNumber name='profile.statsStarting.WIL' />
							</Field>
							<Field
								name='profile.statsStarting.INS'
								width='small'
								label='INS'
							>
								<InputNumber name='profile.statsStarting.INS' />
							</Field>
							<Field
								name='profile.statsStarting.SEN'
								width='small'
								label='SEN'
							>
								<InputNumber name='profile.statsStarting.SEN' />
							</Field>
						</div>
					</section>
				)}
				{tree === 'Shroudness' && (
					<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
						<h4 className='font-grenze text-xl font-semibold tracking-wider text-purple-300'>
							Shroudness
						</h4>
						<div className='flex flex-row justify-center gap-2'>
							<Field
								name='profile.statsStarting.CHA'
								width='small'
								label='CHA'
							>
								<InputNumber name='profile.statsStarting.CHA' />
							</Field>
							<Field
								name='profile.statsStarting.SOC'
								width='small'
								label='SOC'
							>
								<InputNumber name='profile.statsStarting.SOC' />
							</Field>
							<Field
								name='profile.statsStarting.ERU'
								width='small'
								label='ERU'
							>
								<InputNumber name='profile.statsStarting.ERU' />
							</Field>
						</div>
					</section>
				)}
			</fieldset>
		</div>
	);
};

export default CharFormStep9;
