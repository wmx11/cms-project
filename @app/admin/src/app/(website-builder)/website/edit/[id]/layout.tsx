import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import React from 'react';
import BuilderHeader from '../../../../../components/Layout/WebsiteBuilder/BuilderHeader';

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const layout = ({ children, params }: Props) => {
  return (
    <div className="relative">
      <BuilderHeader />
      <div className="grid grid-cols-[1fr,320px]">
        <div className="overflow-auto max-h-screen">{children}</div>
        <div className="border-l-1 border-zinc-200 p-4">
          <div className="space-y-4">
            {params.id}
            <Input
              label="Title"
              variant="bordered"
              description="The website name will be used to identifty and access it. Example: my-new-website."
            />
            <Input
              label="Description"
              variant="bordered"
              description="The website name will be used to identifty and access it. Example: my-new-website."
            />
            <div className="flex justify-between items-center gap-2 ">
              <Button fullWidth color="primary" variant="bordered">
                Update
              </Button>
              <Button fullWidth color="primary" variant="bordered">
                Learn more
              </Button>
            </div>
          </div>

          <div>
            <div>SEO preview</div>
            <div>
              <span>Google</span>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
