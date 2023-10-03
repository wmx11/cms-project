import React from 'react';
import GoogleButton from './GoogleButton';
import Title from '@cms/ui/components/Title';
import { Card, CardBody, CardFooter } from '@nextui-org/card';

const Authenticate = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex items-center justify-center flex-1 ">
        <div>
          <Title>Start building your brand with Brand Forge</Title>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 bg-zinc-100">
        <div className="">
          <Card>
            <CardBody className="flex flex-col items-center space-y-4">
              <Title>Enter The Brand Forge</Title>
              <GoogleButton />
            </CardBody>
            <CardFooter className="p-4">
              <p>
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
