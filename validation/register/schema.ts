import * as z from 'zod';

import { emailSchema } from './schemas/email';
import { passwordSetSchema, passwordSchema } from './schemas/password';

export const registerFormSchema = z
  .object({
    email: emailSchema,
  })
  .and(passwordSetSchema);

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z
  .object({
    email: emailSchema,
  })
  .and(passwordSchema);

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
