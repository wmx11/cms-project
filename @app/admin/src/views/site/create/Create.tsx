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

      {templates?.map((template, index) => {
        return (
          <CreateSiteCardModal
            key={`template_card_${index}`}
            templateName={template.name}
            templateDescription={template.description || ''}
            templateId={template.id}
            templateImage={template.image || ''}
            components={components}
          />
        );
      })}
    </div>
  );
};

export default Create;
