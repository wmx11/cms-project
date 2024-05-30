/* eslint-disable react/no-unescaped-entities */
import AlphaBadge from '@admin/components/AlphaBadge';
import Title from '@cms/packages/ui/components/Title';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@cms/ui/components/Card';
import GoogleButton from './_components/GoogleButton';

const Authenticate = () => {
  return (
    <div className="mesh-gradient flex min-h-screen flex-col-reverse md:flex-row">
      <div className="flex flex-1 items-center justify-center p-2">
        <div className="max-w-[620px]">
          <Title order={1} className="text-7xl">
            Build pages faster{' '}
            <span>
              with{' '}
              <span className="inline-flex items-center justify-start gap-2">
                Tiglee <AlphaBadge />
              </span>
            </span>
          </Title>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white/50 p-2 backdrop-blur-md">
        <div>
          <Card className="w-full min-w-[320px] max-w-[620px]">
            <CardHeader>
              <CardTitle className="flex items-start gap-2">Welcome!</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <GoogleButton />
            </CardContent>
            <CardFooter>
              <p className="text-dim text-sm">
                By creating an account, you agree to Tiglee's Privacy Policy and
                Terms of Service.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
