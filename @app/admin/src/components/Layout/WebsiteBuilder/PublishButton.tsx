import { Publish } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/button';
import React from 'react';

const PublishButton = () => {
  return (
    <Button color="primary" endContent={<Publish />}>
      Publish
    </Button>
  );
};

export default PublishButton;
