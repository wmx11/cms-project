import { Publish } from '@cms/packages/ui/components/Icons';
import { Button } from '@cms/packages/ui/components/Button';
import React from 'react';

const PublishButton = () => {
  return (
    <Button color="primary" size="sm">
      <Publish className="h-3 w-3 mr-2" /> Publish
    </Button>
  );
};

export default PublishButton;
