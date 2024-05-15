'use client';
import { Button } from '@cms/ui/components/Button';
import { GoogleIcon } from '@cms/ui/components/Icons';
import { signIn } from 'next-auth/react';
import React from 'react';

const GoogleButton = () => {
  return (
    <Button
      color="primary"
      className="relative w-full"
      onClick={() => signIn('google')}
    >
      <GoogleIcon className="absolute left-0 ml-4 mr-4" />
      <span>Sign In With Google</span>
    </Button>
  );
};

export default GoogleButton;
