import { useAuth } from '@/store/authContext';
import { trpc } from '@/utils/trpc';
import { CreateUserInput, ZodUser } from '@api/lib/ZodUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { dataTagSymbol } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Field, Input } from '../RHFComponents';
import TitleBack from '../TitleBack';

const Register = () => {
	const navigate = useNavigate();
	const { register } = useAuth();
	const methods = useForm<CreateUserInput>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(ZodUser)(data, context, options),
			);
			return zodResolver(ZodUser)(data, context, options);
		},
		shouldFocusError: true,
	});

	const onSubmit: SubmitHandler<CreateUserInput> = data => {
		console.log('clicked');

		register(data);
		methods.reset();
		navigate({
			to: '/',
		});
	};

	const onError = () => {
		console.log(methods.formState.errors);
	};

	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			<TitleBack title={'Sign In'} />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit, onError)}
					className='flex w-full flex-col md:w-2/3'
				>
					<Field name='email'>
						<Input
							name='email'
							type='email'
						/>
					</Field>
					<Field name='name'>
						<Input
							name='name'
							type='text'
						/>
					</Field>
					<Field name='password'>
						<Input
							name='password'
							type='password'
						/>
					</Field>
					<Field name='confirmPassword'>
						<Input
							name='confirmPassword'
							type='password'
						/>
					</Field>
					<button
						type='submit'
						disabled={methods.formState.isSubmitting}
						className='bg-accent font-grenze mt-4 w-1/2 self-center rounded-lg px-4 py-2 text-lg font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500 md:w-1/4'
					>
						{!methods.formState.isSubmitting ? (
							<span className='text-center'>Sign In</span>
						) : (
							<span className='loading loading-dots loading-md'></span>
						)}
					</button>
				</form>
			</FormProvider>
		</div>
	);
};

export default Register;
