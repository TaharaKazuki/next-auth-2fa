import * as z from 'zod';

/*
 * password標準のvalidationルール
 */
const validatePassword = (
  password: string,
  fieldName: string,
  ctx: z.RefinementCtx
) => {
  if (password.length < 5) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: [fieldName],
      message: 'Password must be at least 5 characters long',
    });
  }
};

/*
 * 確認用のpasswordと一致しているかのルール
 */
const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
  ctx: z.RefinementCtx
) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    });
  }
};

/*
 * 現在のpasswordと一致してないかのルール
 */
const validatePasswordNoMatch = (
  currentPassword: string,
  password: string,
  ctx: z.RefinementCtx
) => {
  if (currentPassword === password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['currentPassword'],
      message: 'Please change from your current password.',
    });
  }
};

export const confirmPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    validatePassword(data.password, 'password', ctx);
    validatePassword(data.confirmPassword, 'confirmPassword', ctx);
    validatePasswordMatch(data.password, data.confirmPassword, ctx);
  });

export const passwordSchema = z
  .object({
    password: z.string(),
  })
  .superRefine((data, ctx) => {
    validatePassword(data.password, 'password', ctx);
  });

export const currentPasswordSchema = z
  .object({
    currentPassword: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    validatePassword(data.currentPassword, 'currentPassword', ctx);
    validatePassword(data.password, 'password', ctx);
    validatePassword(data.confirmPassword, 'confirmPassword', ctx);
    validatePasswordNoMatch(data.currentPassword, data.password, ctx);
    validatePasswordMatch(data.password, data.confirmPassword, ctx);
  });
