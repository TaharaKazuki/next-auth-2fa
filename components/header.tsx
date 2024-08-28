import Link from 'next/link';
import LogoutButton from './logoutButton';

const Header = () => {
  return (
    <nav className="bg-gray-200 flex justify-between p-4 items-center">
      <ul className="flex gap-4">
        <li>
          <Link href={'/my-account'}>My Account</Link>
        </li>
        <li>
          <Link href={'/change-password'}>Change Password</Link>
        </li>
      </ul>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Header;
