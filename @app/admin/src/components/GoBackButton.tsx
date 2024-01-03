'use client';
import { Button } from '@cms/packages/ui/components/Button';
import { ArrowLeft } from '@cms/packages/ui/components/Icons';
import { useRouter } from 'next/navigation';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} size="sm" variant="outline">
      <ArrowLeft className="h-3 w-3 mr-2" /> Go back
    </Button>
  );
};

export default GoBackButton;
