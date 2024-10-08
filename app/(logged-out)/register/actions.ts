'use server';

import { hash } from 'bcryptjs';

import db from '@/db/drizzle';
import { users } from '@/db/usersSchema';
import { emailSchema } from '@/validation/register/schemas/email';
import { confirmPasswordSchema } from '@/validation/register/schemas/password';

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
  try {
    const newUserSchema = emailSchema.and(confirmPasswordSchema);

    const newUserValidation = newUserSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!newUserValidation.success) {
      return {
        error: true,
        message:
          newUserValidation.error.issues[0].message ?? 'An error occurred',
      };
    }
    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      email,
      password: hashedPassword,
    });
  } catch (e: any) {
    if (e.code === '23505') {
      return {
        error: true,
        message: 'An account is already registered with that email address',
      };
    }

    return {
      error: true,
      message: 'An error occurred',
    };
  }
};
