import { z } from 'zod';

export const RoleSchema = z.enum(['VIEWER', 'EDITOR', 'ADMIN']);

export const UserSchema = z.object({
	role: RoleSchema,
	id: z.string(),
	email: z.string(),
	name: z.string(),
	password: z.string(),
	isOwner: z.boolean(),
	createdAt: z.coerce.date(),
	characters: z.string().array(),
	campaigns: z.string().array(),
});

export type User = z.infer<typeof UserSchema>;

export const ZodUser = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.email('This is not a valid email.'),
		name: z
			.string({ required_error: 'Name is required' })
			.min(3, 'Your name must be at least 3 characters long'),
		password: z
			.string({ required_error: 'You must choose a password' })
			.min(8, 'Password must be at least 8 characters long')
			.max(32, 'Password must be less than 32 characters'),
		confirmPassword: z
			.string({ required_error: 'You must confirm your password' })
			.min(8, 'Password must be at least 8 characters long')
			.max(32, 'Password must be less than 32 characters'),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match',
	});

export const ZodLogin = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.email('Invalid email or password'),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, 'Invalid email or password'),
});

export type CreateUserInput = z.infer<typeof ZodUser>;
export type LoginUserInput = z.infer<typeof ZodLogin>;
export const UserWithoutPassSchema = UserSchema.omit({ password: true });
export type UserWithoutPass = z.infer<typeof UserWithoutPassSchema>;
