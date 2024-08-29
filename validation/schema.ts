import * as z from 'zod';

import { emailSchema } from './register/schemas/email';
import {
  confirmPasswordSchema,
  passwordSchema,
  changePasswordSchema,
} from './register/schemas/password';

/* Register */
export const registerFormSchema = emailSchema.and(confirmPasswordSchema);

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

/* Login */
export const loginFormSchema = emailSchema.and(passwordSchema);

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

/* Change Password */
export const changePasswordFormSchema = changePasswordSchema;

export type ChangePasswordFormSchemaType = z.infer<
  typeof changePasswordFormSchema
>;

/*  Reset Password of email schema */
export const resetPasswordFormSchema = emailSchema;

export type ResetPasswordFormSchemaType = z.infer<typeof emailSchema>;
