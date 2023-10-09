import { Card, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Template } from '@prisma/client';
import CreateWebsiteButton from './CreateWebsiteButton';

type Props = {
  templates: Template[];
};

const Create = ({ templates }: Props) => {
  if (!templates || !templates.length) {
    return <>There are no available templates</>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((template, index) => {
        return (
          <Card key={`template_${index}`}>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover "
              src={template.image as string}
            />
            <CardFooter>
              <div></div>
              <CreateWebsiteButton templateId={template.id} />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Create;
