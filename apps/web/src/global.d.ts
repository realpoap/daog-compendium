declare module 'imagekitio-react' {
	import React from 'react';

	export interface IKImageProps
		extends React.ImgHTMLAttributes<HTMLImageElement> {
		path?: string;
		urlEndpoint?: string;
		transformation?: Array<{ [key: string]: string | number }>;
		loading?: 'lazy' | 'eager';
	}

	export interface IKContextProps {
		urlEndpoint: string;
		publicKey: string;
		authenticationEndpoint?: string;
		children: React.ReactNode;
		authenticator?: () => Promise<{
			signature: any;
			expire: any;
			token: any;
		}>;
	}

	export interface IKUploadProps
		extends React.InputHTMLAttributes<HTMLInputElement> {
		fileName?: string;
		onError?: (err: IKUploadError) => void;
		onSuccess?: (res: IKUploadResponse) => void;
		isPrivateFile?: boolean;
		ref?: React.MutableRefObject<HTMLInputElement | null>;
	}

	export const IKImage: React.FC<IKImageProps>;
	export const IKContext: React.FC<IKContextProps>;
	export const IKUpload: React.FC<IKUploadProps>;
}
