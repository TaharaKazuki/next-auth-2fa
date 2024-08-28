import ChangePasswordForm from '@/components/changePasswordForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChangePassword = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
