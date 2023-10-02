import Title from '@cms/ui/components/Title';
import { Card, CardBody } from '@nextui-org/card';

const Testimonials = () => {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <Title className='mb-0'>My Testimonials</Title>
      </div>
      <div>
        <Card>
          <CardBody className="text-center">
            You currently have no testimonials
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Testimonials;
