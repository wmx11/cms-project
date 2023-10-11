'use client';
import { Button } from '@nextui-org/button';
import { signIn } from 'next-auth/react';
import React from 'react';

const GoogleButton = () => {
  return (
    <Button
      color="primary"
      size="lg"
      fullWidth={true}
      onClick={() => signIn('google')}
    >
      Google
    </Button>
  );
};

export default GoogleButton;
