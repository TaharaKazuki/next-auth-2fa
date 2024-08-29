'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { loginWithCredentials } from './actions';
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginFormSchema, LoginFormSchemaType } from '@/validation/schema';

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: LoginFormSchemaType) => {
    const response = await loginWithCredentials({
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      form.setError('root', {
        message: response.message,
      });
    } else {
      router.push('/my-account');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          autoComplete="new-password"
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
                <Button type="submit">Login</Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href={'/register'} className="underline">
              Register
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            Forgot password?{' '}
            <Link href={'/password-reset'} className="underline">
              Reset my password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Login;
