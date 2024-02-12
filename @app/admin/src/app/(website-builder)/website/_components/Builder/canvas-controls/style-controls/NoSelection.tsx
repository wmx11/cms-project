import { Card, CardContent, CardHeader } from '@cms/ui/components/Card';
import React from 'react';

const NoSelection = () => {
  return (
    <Card className="text-center mb-4">
      <CardHeader className="p-4">
        <p className="font-bold">No Selection</p>
      </CardHeader>
      <CardContent className="p-4">
        <p>Select an element on the canvas to activate this panel</p>
      </CardContent>
    </Card>
  );
};

export default NoSelection;
