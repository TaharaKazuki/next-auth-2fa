'use server';

type UpdatePasswordPropsType = {
  token: string;
  password: string;
  confirmPassword: string;
};

export const updatePassword = async ({
  token,
  password,
  confirmPassword,
}: UpdatePasswordPropsType) => {};
