import React from 'react';
import { getTemplates } from '@cms/data/template/getters';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';

const page = async () => {
  const templates = await getTemplates();

  if (!templates.length) {
    return <div>There are no templates to choose from.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((template, index) => {
        return (
          <Card className="h-[420px]" key={index}>
            {/* <CardHeader className=" z-10 top-1 flex-col !items-start ">
              <p className="font-bold">{template.name}</p>
              <p>{template.description}</p>
            </CardHeader> */}
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover "
              src={template.image as string}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">{template.name}</p>
                <p className="text-black text-tiny">Get notified.</p>
              </div>
              <Button className="text-tiny" color="primary">
                Notify Me
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default page;
