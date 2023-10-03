import Title from '@cms/ui/components/Title';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import Link from 'next/link';
import routes from '../../utils/routes';

const Websites = () => {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <Title className="mb-0">Websites</Title>
        <Button as={Link} href={routes.website.create} color="primary">
          Create New
        </Button>
      </div>
      <div>
        <Card>
          <CardBody>You currently have no websites</CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Websites;
