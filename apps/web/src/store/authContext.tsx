import { useProvideAuth } from '@/hooks/useProvideAuthx';
import {
	CreateUserInput,
	LoginUserInput,
	UserWithoutPass,
} from '@api/lib/ZodUser';
import React, { createContext, useContext } from 'react';

type AuthContextType = {
	user: UserWithoutPass | null;
	accessToken: string;
	authErrors: string;
	isAuthLoading: boolean;
	register: (input: CreateUserInput) => void;
	login: (input: LoginUserInput) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

type AuthContextProps = {
	children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProps) => {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
//custom hook for consuming the Context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthContextProvider');
	}
	return context;
};
