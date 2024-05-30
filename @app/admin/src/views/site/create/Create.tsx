import { Component, Template } from '@prisma/client';
import { FC } from 'react';
import CardModal from './_components/create-site/CardModal';
import GridWrapper from '@admin/components/layout/GridWrapper';

interface Props {
  templates: Template[];
  components: Component[];
}

const Create: FC<Props> = ({ templates, components }) => {
  return (
    <GridWrapper>
      <CardModal components={components} />
      {templates?.map((template, index) => {
        return (
          <CardModal
            key={`template_card_${index}`}
            {...template}
            title={template.name}
            templateId={template.id}
            components={components}
          />
        );
      })}
    </GridWrapper>
  );
};

export default Create;
