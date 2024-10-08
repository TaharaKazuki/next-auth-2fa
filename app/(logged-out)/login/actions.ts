'use server';

import { signIn } from '@/auth';
import { emailSchema } from '@/validation/register/schemas/email';
import { passwordSchema } from '@/validation/register/schemas/password';

type LoginWithCredentialsPropsType = {
  email: string;
  password: string;
};

export const loginWithCredentials = async ({
  email,
  password,
}: LoginWithCredentialsPropsType) => {
  const loginSchema = emailSchema.and(passwordSchema);

  const loginValidation = loginSchema.safeParse({
    email,
    password,
  });

  if (!loginValidation.success) {
    return {
      error: true,
      message: loginValidation.error.issues[0].message ?? 'An error occurred',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (e) {
    return {
      error: true,
      message: 'Incorrect email or password',
    };
  }
};
