'use server';

import * as z from 'zod';

import { passwordSchema } from '@/validation/register/schemas/password';

type RegisterUser = {
  email: string;
  password: string;
  confirmPassword: string;
};
export const registerUser = async ({
  email,
  password,
  confirmPassword,
}: RegisterUser) => {
  const newUserSchema = z
    .object({
      email: z.string().email(),
    })
    .and(passwordSchema);

  const newUserValidation = newUserSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0].message ?? 'An error occurred',
    };
  }
};
