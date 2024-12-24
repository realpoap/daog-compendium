import { useAuth } from '@/store/authContext';
import { LoginUserInput, ZodLogin } from '@api/lib/ZodUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Field, Input } from '../RHFComponents';
import SubmitButton from '../SubmitButton';

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

	const onSubmit: SubmitHandler<LoginUserInput> = data => {
		login(data);
		methods.reset();
		console.log('redirecting');
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
					<SubmitButton
						text='Log in'
						isLoading={isAuthLoading}
					/>
				</form>
			</FormProvider>
		</>
	);
};

export default LoginForm;
