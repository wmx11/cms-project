import { Template } from '@prisma/client';
import CreateWebsiteButton from './components/CreateWebsiteButton';
import PageWithHeader from '../../../components/Layout/PageWithHeader';
import { Card, CardContent, CardFooter } from '@cms/ui/components/Card';

type Props = {
  templates: Template[];
};

const Create = ({ templates }: Props) => {
  if (!templates || !templates.length) {
    return (
      <PageWithHeader title="There are no available templates">
        <></>
      </PageWithHeader>
    );
  }

  return (
    <PageWithHeader title="Create new website">
      <div className="grid grid-cols-4 gap-4">
        {templates.map((template, index) => {
          return (
            <Card key={`template_${index}`}>
              <CardContent>
                <p>{template.name}</p>
                <p>{template.description}</p>
                <p>{template.category}</p>
              </CardContent>
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
