import { Plus } from '@cms/ui/components/Icons';
import Title from '@cms/ui/components/Title';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import Link from 'next/link';
import routes from '../../utils/routes';
import Header from '../../components/Header';

const Websites = () => {
  return (
    <div>
      <Header>
        <Title className="mb-0" textAlign="center">
          Websites
        </Title>
        <Button
          as={Link}
          href={routes.website.create}
          color="primary"
          endContent={<Plus />}
        >
          Create New
        </Button>
      </Header>
      <div>
        <Card>
          <CardBody>You currently have no websites</CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Websites;
