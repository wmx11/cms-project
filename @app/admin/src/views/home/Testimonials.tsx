import Title from '@cms/ui/components/Title';
import { Card, CardBody } from '@nextui-org/card';
import Header from '../../components/Header';

const Testimonials = () => {
  return (
    <div>
      <Header>
        <Title className="mb-0">Testimonials</Title>
      </Header>
      <div>
        <Card>
          <CardBody>You currently have no testimonials</CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Testimonials;
