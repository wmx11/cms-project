import { Component, Template } from '@prisma/client';
import { FC } from 'react';
import CreateSiteCardModal from './components/CreateSiteCardModal';

interface Props {
  templates: Template[];
  components: Component[];
}

const Create: FC<Props> = ({ templates, components }) => {
  return (
    <div className="grid grid-cols-5 gap-8">
      <CreateSiteCardModal components={components} />
      <CreateSiteCardModal components={components} />
      <CreateSiteCardModal components={components} />
      <CreateSiteCardModal components={components} />
    </div>
  );
};

export default Create;
