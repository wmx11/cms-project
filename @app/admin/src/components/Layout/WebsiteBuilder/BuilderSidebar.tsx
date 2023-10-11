import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import React from 'react';

const BuilderSidebar = () => {
  return (
    <div className="border-l-1 border-zinc-200 p-4">
      <div className="space-y-4">
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
  );
};

export default BuilderSidebar;
