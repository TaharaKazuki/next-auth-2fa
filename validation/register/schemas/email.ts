import * as z from 'zod';

export const emailSchema = z.object({
  email: z.string().email({ message: 'Email address format is incorrect.' }),
});
