'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from './ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { useToast } from './ui/use-toast';
import { Input } from '@/components/ui/input';
import {
  updatePasswordFormSchema,
  UpdatePasswordFormSchemaType,
} from '@/validation/schema';

const UpdatePasswordForm = () => {
  const { toast } = useToast();

  const form = useForm<UpdatePasswordFormSchemaType>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async ({
    password,
    confirmPassword,
  }: UpdatePasswordFormSchemaType) => {
    // const response = await changePassword({
    //   password,
    //   confirmPassword,
    // });
    // if (response?.error) {
    //   form.setError('root', {
    //     message: response.message,
    //   });
    // } else {
    //   toast({
    //     title: 'Password changed',
    //     description: 'Your password has been updated.',
    //     className: 'border-green-500',
    //   });
    //   form.reset();
    // }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
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
          {!!form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          )}
          <Button type="submit">Change Password</Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
