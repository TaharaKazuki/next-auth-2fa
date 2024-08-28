import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { auth } from '@/auth';
import Header from '@/components/header';

type LoggedInLayoutProps = {
  children: ReactNode;
};

export default async function LoggedInLayout({
  children,
}: LoggedInLayoutProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
