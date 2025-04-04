import { useAuth } from '@/store/authContext';
import { trpc } from '@/utils/trpc';
import { NewCampaign, NewCampaignSchema } from '@api/lib/ZodCampaign';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SubmitButton } from '../../Buttons';
import { Field, Input } from '../../RHFComponents';

const CampaignNewForm = () => {
	const user = useAuth();
	const utils = trpc.useUtils();
	const createCampaign = trpc.campaigns.create.useMutation({
		onSuccess: () => {
			utils.campaigns.getAll.refetch();
			methods.reset();
			toast.success('Campaign created !');
		},
		onError: error => {
			if (error.data?.code === 'UNAUTHORIZED') {
				toast.error('You must be logged in');
			} else toast.error('Something bad happened...');
			throw new Error(error.message);
		},
	});

	const methods = useForm<NewCampaign>({
		mode: 'onChange',
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(NewCampaignSchema)(data, context, options),
			);
			return zodResolver(NewCampaignSchema)(data, context, options);
		},
		shouldFocusError: true,
	});

	useEffect(() => {
		user.user?.id && methods.setValue('creator', user.user?.id);
		user.user?.id && methods.setValue('dm', user.user?.id);
	}, [methods.formState]);

	const onSubmit = async (data: NewCampaign) => {
		await createCampaign.mutate(data);
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className='flex w-full flex-col'
			>
				<Field name='name'>
					<Input
						name='name'
						type='text'
					/>
				</Field>

				<SubmitButton
					isLoading={methods.formState.isSubmitting}
					color='accent'
					textColor='background'
					text='Create'
				/>
			</form>
		</FormProvider>
	);
};

export default CampaignNewForm;
