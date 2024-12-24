import { useAuth } from '@/store/authContext';
import { trpc } from '@/utils/trpc';
import { CreateUserInput, ZodUser } from '@api/lib/ZodUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { dataTagSymbol } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Field, Input } from '../RHFComponents';
import SubmitButton from '../SubmitButton';

const RegisterForm = () => {
	const navigate = useNavigate();
	const { register, isAuthLoading } = useAuth();
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
		<>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit, onError)}
					className='flex w-full flex-col md:max-w-[50vw]'
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
					<Field
						name='confirmPassword'
						label='Confirm Password'
					>
						<Input
							name='confirmPassword'
							type='password'
						/>
					</Field>
					<SubmitButton
						text={'Sign in'}
						isLoading={isAuthLoading}
					/>
				</form>
			</FormProvider>
		</>
	);
};

export default RegisterForm;
