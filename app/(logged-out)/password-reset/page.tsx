'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  resetPasswordFormSchema,
  type ResetPasswordFormSchemaType,
} from '@/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { passwordReset } from './actions';

const PasswordReset = () => {
  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: decodeURIComponent(searchParams.get('email') ?? ''),
    },
  });

  const handleSubmit = async ({ email }: { email: string }) => {
    console.info('email', email);
    await passwordReset(email);
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      {form.formState.isSubmitSuccessful ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Email Sent</CardTitle>
          </CardHeader>
          <CardContent>
            If you have an account with us you will receive a password reset
            email at{' '}
            <span className="font-semibold">{`"${form.getValues(
              'email'
            )}"`}</span>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Password Reset</CardTitle>
            <CardDescription>
              Enter your email address to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
                <fieldset
                  disabled={form.formState.isSubmitting}
                  className="flex flex-col gap-2"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            autoComplete="email"
                            formNoValidate
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!!form.formState.errors.root?.message && (
                    <FormMessage>
                      {form.formState.errors.root.message}
                    </FormMessage>
                  )}
                  <Button type="submit">Submit</Button>
                </fieldset>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div className="text-sm text-muted-foreground">
              Remember your password?{' '}
              <Link href={'/login'} className="underline">
                Login
              </Link>
            </div>

            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href={'/register'} className="underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  );
};

export default PasswordReset;
