import { trpc } from '@/utils/trpc';
import { LoginUserInput, ZodLogin, ZodUser } from '@api/lib/ZodUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Field, Input } from '../RHFComponents';
import TitleBack from '../TitleBack';

const Login = () => {
	const { history } = useRouter();

	const methods = useForm<LoginUserInput>({
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(ZodLogin)(data, context, options),
			);
			return zodResolver(ZodLogin)(data, context, options);
		},
		shouldFocusError: true,
	});

	const loginUser = trpc.auth.login.useMutation({
		onSuccess: () => {
			toast.success('Welcome back !');
			methods.reset();
			history.back();
		},
		onError: error => {
			toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const onSubmit: SubmitHandler<LoginUserInput> = data => {
		console.log('logging in');
		loginUser.mutate(data);
	};

	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			<TitleBack title={'Log In'} />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='flex w-full flex-col md:w-2/3'
				>
					<Field name='email'>
						<Input
							name='email'
							type='email'
						/>
					</Field>
					<Field name='password'>
						<Input
							name='password'
							type='password'
						/>
					</Field>
					<button
						type='submit'
						disabled={methods.formState.isSubmitting}
						className='bg-accent font-grenze mt-4 w-1/2 self-center rounded-lg px-4 py-2 text-lg font-bold transition-all duration-100 hover:ring-2 hover:ring-stone-200 disabled:bg-stone-500 md:w-1/4'
					>
						{!methods.formState.isSubmitting ? (
							<span className='text-center'>Log In</span>
						) : (
							<span className='loading loading-dots loading-md'></span>
						)}
					</button>
				</form>
			</FormProvider>
		</div>
	);
};

export default Login;
