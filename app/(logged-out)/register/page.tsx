'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { registerUser } from './actions';
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
import {
  registerFormSchema,
  RegisterFormSchemaType,
} from '@/validation/schema';

const Register = () => {
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: RegisterFormSchemaType) => {
    const response = await registerUser({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    if (response?.error) {
      form.setError('email', {
        message: response.message,
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      {form.formState.isSubmitSuccessful ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>You account has been created</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/login">Login to your account</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Register for a new account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                          <Input {...field} type="email" autoComplete="email" />
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

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Confirm</FormLabel>
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
                  <Button type="submit">
                    {form.formState.isSubmitting ? 'Submitting...' : 'Register'}
                  </Button>
                </fieldset>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div className="text-sm text-muted-foreground">
              Already have an account{' '}
              <Link href={'/login'} className="underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  );
};

export default Register;
