import { Card, CardContent, CardHeader } from '@cms/ui/components/Card';

const NoSelection = () => {
  return (
    <Card className="mb-4 text-center">
      <CardHeader className="">
        <p className="text-sm font-bold">No Selection</p>
      </CardHeader>
      <CardContent className="text-dim text-xs">
        <p>Select an element on the canvas to activate this panel.</p>
      </CardContent>
    </Card>
  );
};

export default NoSelection;
