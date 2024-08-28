import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { auth } from '@/auth';

type LoggedInLayoutProps = {
  children: ReactNode;
};

export default async function LoggedInLayout({
  children,
}: LoggedInLayoutProps) {
  const session = await auth();

  if (!!session?.user?.id) {
    redirect('/my-account');
  }

  return children;
}
