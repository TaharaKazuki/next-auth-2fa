'use client';

import { logout } from '@/app/actions';
import { Button } from './ui/button';

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
