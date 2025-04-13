import { NewCharacter, NewCharacterSchema } from '@api/lib/ZodCharacter';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

type Context = {
	methods: UseFormReturn<NewCharacter>;
	currentStep: number;
	nextStep: () => void;
	prevStep: () => void;
	setStep: (step: number) => void;
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
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<Partial<NewCharacter>>({});

	const methods = useForm<NewCharacter>({
		//defaultValues: defaultValuesCharacter,
		mode: 'onChange',
		shouldFocusError: true,
		resolver: async (data, context, options) => {
			// you can debug your validation schema here
			console.log('formData', data);
			console.log(
				'validation result',
				await zodResolver(NewCharacterSchema)(data, context, options),
			);
			return zodResolver(NewCharacterSchema)(data, context, options);
		},
	});

	const nextStep = useCallback(() => setCurrentStep(prev => prev + 1), []);
	const prevStep = useCallback(() => setCurrentStep(prev => prev - 1), []);
	const setStep = useCallback((step: number) => setCurrentStep(step), []);

	const value = useMemo(
		() => ({
			methods,
			currentStep,
			nextStep,
			prevStep,
			setStep,
			formData,
			setFormData,
		}),
		[currentStep, methods, formData],
	);

	return (
		<CharacterFormContext.Provider value={value}>
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
