import { useAuth } from '@/store/authContext';
import { LoginUserInput, ZodLogin } from '@api/lib/ZodUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SubmitButton } from '../Buttons';
import { Field, Input } from '../RHFComponents';

const LoginForm = () => {
	const navigate = useNavigate();
	const { login, isAuthLoading } = useAuth();
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

	const onSubmit: SubmitHandler<LoginUserInput> = async data => {
		await login(data);
		methods.reset();
		navigate({
			to: '/',
		});
	};
	return (
		<>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='flex w-full flex-col md:max-w-[50vw]'
				>
					<Field
						name='email'
						id='email-login'
					>
						<Input
							name='email'
							type='email'
						/>
					</Field>
					<Field
						name='password'
						id='password-login'
					>
						<Input
							name='password'
							type='password'
						/>
					</Field>
					<SubmitButton
						text='Log in'
						isLoading={isAuthLoading}
						color='accent'
						textColor='stone-800'
					/>
				</form>
			</FormProvider>
		</>
	);
};

export default LoginForm;
