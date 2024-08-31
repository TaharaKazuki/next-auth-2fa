import { eq } from 'drizzle-orm';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UpdatePasswordForm from '@/components/updatePasswordForm';
import db from '@/db/drizzle';
import { passwordResetTokens } from '@/db/passwordResetTokens';

type UpdatePasswordPropsType = {
  searchParams: {
    token?: string;
  };
};

const UpdatePassword = async ({ searchParams }: UpdatePasswordPropsType) => {
  let tokenIsValid = false;

  const { token } = searchParams;

  if (token) {
    const [passwordResetToken] = await db
      .select({
        token: passwordResetTokens.token,
        tokenExpiry: passwordResetTokens.tokenExpiry,
      })
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    if (passwordResetToken) {
      const now = Date.now();

      if (
        passwordResetToken.tokenExpiry instanceof Date &&
        now < passwordResetToken.tokenExpiry.getTime()
      ) {
        tokenIsValid = true;
      }
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {tokenIsValid
              ? 'Update password'
              : 'Your password reset link is invalid or has expired'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tokenIsValid ? (
            <UpdatePasswordForm token={token ?? ''} />
          ) : (
            <Link className="underline" href={'/password-reset'}>
              Request another password reset link
            </Link>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdatePassword;
