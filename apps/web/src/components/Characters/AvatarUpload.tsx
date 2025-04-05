import { trpc } from '@/utils/trpc';
import { Character, Image } from '@api/lib/ZodCharacter';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiUploadCloud } from 'rocketicons/fi';

type Props = {
	char: Character;
};

type IKUploadResponse = {
	fileId: string;
	name: string;
	url: string;
	filePath: string;
};

type IKUploadError = {
	message: string;
	statusCode?: number;
};

// IMAGEKIT
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const authEndpoint = import.meta.env.VITE_IMAGEKIT_AUTH_ENDPOINT;
const authenticator = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Request failed with status ${response.status}: ${errorText}`,
			);
		}

		const data = await response.json();
		console.info('Authenticator response:', data);

		// Ensure all required fields are present
		if (!data.signature || !data.expire || !data.token) {
			throw new Error('Invalid authentication response from server');
		}
		// Double-check values are not empty
		console.info('Using signature:', data.signature);
		console.info('Using expire:', data.expire);
		console.info('Using token:', data.token);

		return data;
	} catch (error) {
		console.error('Authentication request failed:', error);
		throw new Error(`Authentication request failed for ImageKit`);
	}
};

const AvatarUpload = ({ char }: Props) => {
	const ikUploadRefTest = useRef<HTMLInputElement | null>(null);
	const [imageObject, setImageObject] = useState<Image>();

	const signedUrl = trpc.imagekit.getSignedUrl.useQuery(
		{ path: imageObject?.path || '' },
		{
			enabled: imageObject?.path != null,
		},
	);
	const updateAvatarUrl = trpc.characters.updateAvatar.useMutation({
		onSuccess: () => {
			setImageObject(prev => ({
				path: prev?.path,
				url: signedUrl.data?.url,
			}));
			toast.success('Avatar updated !');
		},
		onError: error => {
			toast.error(error.message);
			throw new Error(error.message);
		},
	});

	useEffect(() => {
		if (char) {
			char.bio.avatar?.url != null &&
				setImageObject(prev => ({
					url: char.bio.avatar?.url,
					path: prev?.path,
				}));
		}
		setImageObject({ path: null, url: null });
		//console.warn('imageObject.url:', imageObject?.url);
	}, [char]);

	useEffect(() => {
		if (!imageObject || !signedUrl.data) return;
		if (signedUrl.data.url && imageObject.url !== signedUrl.data.url) {
			//console.log('Signed URL:');
			//console.log('signedUrl.data.url:', signedUrl?.data.url);

			//console.log('imageObject.url:', imageObject.url);
			if (signedUrl.data.url !== char.bio.avatar?.url) {
				updateAvatarUrl.mutate({
					id: char.id,
					path: imageObject.path as string,
					url: signedUrl.data?.url as string,
				});

				//console.warn('imageObject.url:', imageObject?.url);
			}
		}
	}, [signedUrl.data]);

	const onError = (err: IKUploadError) => {
		console.log('Error', err);
		toast.error(err.message);
	};

	const onSuccess = async (res: IKUploadResponse) => {
		toast.success('Image uploaded!');
		if (res.filePath && imageObject) {
			setImageObject(prev => ({ url: prev?.url, path: res.filePath })); //triggers query signedUrl
		}
	};

	return (
		<IKContext
			publicKey={publicKey}
			urlEndpoint={urlEndpoint}
			authenticator={authenticator}
			authenticationEndpoint={authEndpoint}
		>
			<div className='z-50 flex w-full items-center justify-center'>
				<div className='avatar avatar-placeholder group flex flex-col items-center justify-center'>
					<div className='bg-tile font-grenze text-primary size-16 rounded-full shadow shadow-sm'>
						{ikUploadRefTest && char.bio.avatar?.url == null ? (
							<button onClick={() => ikUploadRefTest.current?.click()}>
								<span className='text-3xl group-hover:hidden'>
									{char.bio.name.charAt(0)}
								</span>

								<FiUploadCloud className='icon-lg hidden cursor-pointer group-hover:flex' />
							</button>
						) : (
							imageObject != null && (
								<img
									src={
										imageObject.url != null
											? (imageObject.url as string)
											: (char.bio.avatar?.url as string)
									}
								/>
							)
						)}
					</div>
				</div>

				<IKUpload
					fileName='daog-character.png'
					onError={onError}
					onSuccess={onSuccess}
					className='hidden'
					ref={ikUploadRefTest}
				/>
			</div>
		</IKContext>
	);
};

export default AvatarUpload;
