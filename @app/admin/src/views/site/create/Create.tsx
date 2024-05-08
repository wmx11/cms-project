import { Component, Template } from '@prisma/client';
import { FC } from 'react';
import CreateSiteCardModal from './components/CreateSiteCardModal';
import GridWrapper from '@admin/components/layout/GridWrapper';

interface Props {
  templates: Template[];
  components: Component[];
}

const Create: FC<Props> = ({ templates, components }) => {
  return (
    <GridWrapper>
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
    </GridWrapper>
  );
};

export default Create;
