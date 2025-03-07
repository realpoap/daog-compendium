import { Field, InputNumber } from './RHFComponents';

const StatsForm = () => {
	return (
		<div className='flex w-full flex-col flex-wrap items-center justify-center md:flex-row md:justify-start'>
			<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
				<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
					Adroitness
				</h4>
				<div className='flex w-full flex-row justify-center gap-2 px-2'>
					<Field
						name='constraints.CEL'
						label='CEL'
						width='digit'
					>
						<InputNumber name='constraints.CEL' />
					</Field>
					<Field
						name='constraints.AGI'
						label='AGI'
						width='digit'
					>
						<InputNumber name='constraints.AGI' />
					</Field>
					<Field
						name='constraints.DEX'
						label='DEX'
						width='digit'
					>
						<InputNumber name='constraints.DEX' />
					</Field>
				</div>
			</section>
			<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
				<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
					Constitution
				</h4>
				<div className='flex w-full flex-row justify-center gap-2 px-2'>
					<Field
						name='constraints.STR'
						label='STR'
						width='digit'
					>
						<InputNumber name='constraints.STR' />
					</Field>
					<Field
						name='constraints.END'
						label='END'
						width='digit'
					>
						<InputNumber name='constraints.END' />
					</Field>
					<Field
						name='constraints.VIT'
						label='VIT'
						width='digit'
					>
						<InputNumber name='constraints.VIT' />
					</Field>
				</div>
			</section>
			<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
				<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
					Perception
				</h4>
				<div className='flex w-full flex-row justify-center gap-2 px-2'>
					<Field
						name='constraints.WIL'
						label='WIL'
						width='digit'
					>
						<InputNumber name='constraints.WIL' />
					</Field>
					<Field
						name='constraints.INS'
						label='INS'
						width='digit'
					>
						<InputNumber name='constraints.INS' />
					</Field>
					<Field
						name='constraints.SEN'
						label='SEN'
						width='digit'
					>
						<InputNumber name='constraints.SEN' />
					</Field>
				</div>
			</section>
			<section className='container mb-6 flex flex-col items-center justify-center md:w-1/2'>
				<h4 className='font-grenze text-primary text-xl font-semibold tracking-wider'>
					Shroudness
				</h4>
				<div className='flex w-full flex-row justify-center gap-2 px-2'>
					<Field
						name='constraints.CHA'
						label='CHA'
						width='digit'
					>
						<InputNumber name='constraints.CHA' />
					</Field>
					<Field
						name='constraints.SOC'
						label='SOC'
						width='digit'
					>
						<InputNumber name='constraints.SOC' />
					</Field>
					<Field
						name='constraints.ERU'
						label='ERU'
						width='digit'
					>
						<InputNumber name='constraints.ERU' />
					</Field>
				</div>
			</section>
		</div>
	);
};

export default StatsForm;
