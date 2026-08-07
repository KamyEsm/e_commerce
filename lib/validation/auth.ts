import {toEnglishDigits} from "@/actions/otherAction"
import z from "zod"

export const emailSchema = z.email('The entered email is invalid.');

export const phoneSchema = z
    .string()
    .transform(toEnglishDigits)
    .pipe(z.string().regex(/^(?:(?:(?:\+?98)|(?:0098)|0)?9\d{9})$/, 'The entered mobile number is invalid.'));

export const signUpFormSchema = z.object({
    name: z
        .string()
        .min(2, 'The name must be at least 2 characters long.')
        .max(50, 'The name must not exceed 50 characters.'),

    contact: z.union([emailSchema, phoneSchema], {
        error: () => ({ message: 'Please enter a valid email address or mobile number.' }),
    }),

    password: z
        .string()
        .min(8, 'The password must be at least 8 characters long.')
        .max(64, 'The password must not exceed 64 characters.')
        .regex(/[a-z]/, 'The password must contain at least one lowercase English letter.')
        .regex(/[A-Z]/, 'The password must contain at least one uppercase English letter.')
        .regex(/\d/, 'The password must contain at least one number.')
        .regex(/[@$!%*?&#]/, 'The password must contain at least one special character (such as @, #, or $).')
});

export const SessionPayloadSchema = z.object({
    userId: z.int(),
    role: z.enum(['admin', 'user']).default('user'),
    name: z.string().optional(),
    expiresAt: z.date(),
})

export type SessionPayload = z.infer<typeof SessionPayloadSchema>