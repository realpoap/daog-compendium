import { NewCharacter } from '@api/lib/ZodCharacter';
import { createContext, useContext, useState } from 'react';

type Context = {
	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
	formData: Partial<NewCharacter>;
	setFormData: React.Dispatch<React.SetStateAction<Partial<NewCharacter>>>;
};

export const CharacterFormContext = createContext<Context | undefined>(
	undefined,
);

export const CharacterFormContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [formData, setFormData] = useState<Partial<NewCharacter>>({});
	const [currentStep, setCurrentStep] = useState<number>(0);

	return (
		<CharacterFormContext.Provider
			value={{
				currentStep,
				setCurrentStep,
				formData,
				setFormData,
			}}
		>
			{children}
		</CharacterFormContext.Provider>
	);
};

//custom hook for consuming the Context
export const useCharacterForm = () => {
	const context = useContext(CharacterFormContext);
	if (!context) {
		throw new Error(
			'useCharacterForm must be used within an CharacterFormContextProvider',
		);
	}
	return context;
};
