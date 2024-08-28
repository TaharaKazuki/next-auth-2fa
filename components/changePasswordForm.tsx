import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  changePasswordFormSchema,
  ChangePasswordFormSchemaType,
} from '@/validation/schema';

const ChangePasswordForm = () => {
  const form = useForm<ChangePasswordFormSchemaType>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });
  return <div>changePasswordForm</div>;
};

export default ChangePasswordForm;
