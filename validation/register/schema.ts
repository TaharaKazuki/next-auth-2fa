import * as z from 'zod';

import { passwordSchema } from './schemas/password';

export const registerFormSchema = z
  .object({
    email: z.string().email(),
  })
  .and(passwordSchema);

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
