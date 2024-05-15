/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import GoogleButton from './components/GoogleButton';
import Title from '@cms/packages/ui/components/Title';
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from '@cms/ui/components/Card';

const Authenticate = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center ">
        <div>
          <Title>Start building with Tiglee</Title>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-zinc-100">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Enter Tiglee - Your Crucible For Sites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <GoogleButton />
            </CardContent>
            <CardFooter>
              <p className="text-sm">
                By creating an account, I agree to Brand Forge's terms of
                service and privacy policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
