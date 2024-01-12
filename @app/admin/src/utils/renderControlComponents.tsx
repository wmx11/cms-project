import ButtonElement from '@admin/app/(website-builder)/website/_components/Builder/canvas-controls/ButtonElement';
import InputElement from '@admin/app/(website-builder)/website/_components/Builder/canvas-controls/InputElement';
import { ButtonProps } from '@cms/ui/components/Button';
import React from 'react';

interface GeneralProps {
  label: string;
  icon: React.ReactElement | string;
}

interface InputControlProps extends GeneralProps {
  styleProp: string;
  value: string;
  unit?: string;
  onChange: (value: string) => void;
}

const renderControlComponents = <T extends GeneralProps>(
  data: T[],
  component: (data: T) => React.ReactElement
) => {
  return data.map((item) => component(item));
};

export default renderControlComponents;

export const renderInputControlComponents = <T extends InputControlProps>(
  data: T[]
) => {
  return renderControlComponents(data, (data) => (
    <InputElement
      key={data.label}
      label={data.label}
      type="number"
      endContent={data.icon}
      value={data.value}
      onChange={data.onChange}
    />
  ));
};

interface ButtonControlProps extends GeneralProps {
  variant: ButtonProps['variant'];
  onClick: () => void;
}

export const renderButtonControlComponents = <T extends ButtonControlProps>(
  data: T[]
) => {
  return renderControlComponents(data, (data) => (
    <ButtonElement
      variant={data.variant}
      icon={data.icon}
      onClick={data.onClick}
      key={data.label}
    >
      {data.label}
    </ButtonElement>
  ));
};
