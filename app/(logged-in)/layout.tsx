import Link from 'next/link';
import { ReactNode } from 'react';
import Header from '@/components/header';

type LoggedInLayoutProps = {
  children: ReactNode;
};

export default function LoggedInLayout({ children }: LoggedInLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center">{children}</div>
    </div>
  );
}
