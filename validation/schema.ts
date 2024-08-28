import * as z from 'zod';

import { emailSchema } from './register/schemas/email';
import {
  confirmPasswordSchema,
  passwordSchema,
  changePasswordSchema,
} from './register/schemas/password';

/* Register */
export const registerFormSchema = z
  .object({
    email: emailSchema,
  })
  .and(confirmPasswordSchema);

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

/* Login */
export const loginFormSchema = z
  .object({
    email: emailSchema,
  })
  .and(passwordSchema);

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

/* Change Password */
export const changePasswordFormSchema = changePasswordSchema;

export type ChangePasswordFormSchemaType = z.infer<
  typeof changePasswordFormSchema
>;
