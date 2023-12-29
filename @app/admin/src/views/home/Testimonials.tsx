import Title from '@cms/packages/ui/components/Title';
import { Card, CardContent } from '@cms/packages/ui/components/Card';
import Header from '../../components/Header';

const Testimonials = () => {
  return (
    <div>
      <Header>
        <Title className="mb-0">Testimonials</Title>
      </Header>
      <div>
        <Card>
          <CardContent>You currently have no testimonials</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Testimonials;
