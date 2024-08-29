'use server';

import { auth } from '@/auth';
import { changePasswordSchema } from '@/validation/register/schemas/password';

type ChangePasswordArgsType = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export const changePassword = async ({
  currentPassword,
  password,
  confirmPassword,
}: ChangePasswordArgsType) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: true,
      message: 'You must be logged in to change your password',
    };
  }

  const passwordValidation = changePasswordSchema.safeParse({
    currentPassword,
    password,
    confirmPassword,
  });

  if (passwordValidation.error) {
    return {
      error: true,
      message:
        passwordValidation.error.issues[0].message ?? 'An error occurred',
    };
  }
};
