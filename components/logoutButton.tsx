'use client';

import { Button } from './ui/button';
import { logout } from '@/app/actions';

const LogoutButton = () => {
  return (
    <Button
      size="sm"
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
