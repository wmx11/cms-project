import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Template } from '@prisma/client';
import CreateWebsiteButton from './components/CreateWebsiteButton';
import PageWithHeader from '../../../components/Layout/PageWithHeader';

type Props = {
  templates: Template[];
};

const Create = ({ templates }: Props) => {
  if (!templates || !templates.length) {
    return <>There are no available templates</>;
  }

  return (
    <PageWithHeader title="Create new website">
      <div className="grid grid-cols-4 gap-4">
        {templates.map((template, index) => {
          return (
            <Card key={`template_${index}`}>
              <CardBody>
                <p>{template.name}</p>
                <p>{template.description}</p>
                <p>{template.category}</p>
              </CardBody>
              <CardFooter>
                <CreateWebsiteButton templateId={template.id} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </PageWithHeader>
  );
};

export default Create;
