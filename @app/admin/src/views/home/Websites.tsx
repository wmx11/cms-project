import { Button } from '@cms/packages/ui/components/Button';
import { Card, CardContent } from '@cms/packages/ui/components/Card';
import { Plus } from '@cms/packages/ui/components/Icons';
import Title from '@cms/packages/ui/components/Title';
import Link from 'next/link';
import Header from '../../components/Header';
import routes from '../../utils/routes';

const Websites = () => {
  return (
    <div>
      <Header>
        <Title className="mb-0" textAlign="center">
          Websites
        </Title>
        <Button asChild>
          <Link href={routes.website.create}>
            <Plus className="h-3 w-3 mr-2" />
            Create New
          </Link>
        </Button>
      </Header>
      <div>
        <Card>
          <CardContent>You currently have no websites</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Websites;
