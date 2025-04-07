import { z } from 'zod';
import { NewCharacterSchema } from './ZodCharacter';
// Step 1: Bio
export const CharStep1Schema = NewCharacterSchema.pick({ bio: true });
export type CharStep1Data = z.infer<typeof CharStep1Schema>;

// Step 2: Specifics
export const CharStep2Schema = NewCharacterSchema.pick({ specifics: true });

// Step 3: Path
export const CharStep3Schema = NewCharacterSchema.pick({ path: true });

// Step 4: Profile & Status
export const CharStep4Schema = NewCharacterSchema.pick({
	profile: true,
	status: true,
});

// Step 5: Masteries & Equipment
export const CharStep5Schema = NewCharacterSchema.pick({
	masteries: true,
	equipment: true,
});
