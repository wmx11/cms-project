'use client';
import { Button } from '@nextui-org/button';
import React from 'react';
import { ArrowLeft } from '@cms/ui/components/Icons';
import { useRouter } from 'next/navigation';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button
      startContent={<ArrowLeft />}
      onPress={() => router.back()}
      color="primary"
      variant="flat"
      size="sm"
    >
      Go back
    </Button>
  );
};

export default GoBackButton;
