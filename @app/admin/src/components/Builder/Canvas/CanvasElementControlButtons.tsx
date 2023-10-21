import {
  DATA_ACCEPTS_CHILDREN,
  DATA_DESCRIPTION,
  DATA_LABEL,
} from '@cms/template-engine/constants/dataAttributes';
import { Edit, Info, Trash } from '@cms/ui/components/Icons';
import { Button, Tooltip } from '@nextui-org/react';
import { Component } from '@prisma/client';
import { RefObject } from 'react';
import ComponentsDropdown from '../../ComponentsDropdown';

type CanvasElementControlButtonsProps = {
  target: HTMLBaseElement;
  templateComponents: Component[];
  setTriggerRef: (ref: RefObject<HTMLElement>) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleSelect: (key: React.Key, path: string) => void;
};

export const AddElementButton = ({
  templateComponents,
  handleSelect,
  target,
}: {
  target: HTMLBaseElement;
  templateComponents: Component[];
  handleSelect: (key: React.Key, path: string) => void;
}) => {
  return (
    <ComponentsDropdown
      templateComponents={templateComponents}
      onSelect={handleSelect}
      isBuilder
      path={target.id}
      label="Add"
    />
  );
};

export const EditElementButton = ({
  target,
  setTriggerRef,
  setIsOpen,
}: {
  target: HTMLBaseElement;
  setTriggerRef: (ref: RefObject<HTMLElement>) => void;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Button
      color="warning"
      size="sm"
      radius="none"
      data-controls="true"
      startContent={<Edit />}
      onClick={() => {
        setTriggerRef({ current: target });
        setIsOpen(true);
      }}
    >
      Edit
    </Button>
  );
};

export const DeleteElementButton = () => {
  return (
    <Button
      color="danger"
      size="sm"
      radius="none"
      data-controls="true"
      startContent={<Trash />}
    >
      Delete
    </Button>
  );
};
export const ElementInfoButton = ({ target }: { target: HTMLBaseElement }) => {
  return (
    <Tooltip
      showArrow
      placement="bottom"
      color="secondary"
      content={target.getAttribute(DATA_DESCRIPTION) || ''}
    >
      <div className="flex gap-2 items-center">
        <Info />
        <span>{target.getAttribute(DATA_LABEL)}</span>
      </div>
    </Tooltip>
  );
};

const CanvasElementControlButtons = ({
  target,
  setTriggerRef,
  setIsOpen,
  templateComponents,
  handleSelect,
}: CanvasElementControlButtonsProps) => {
  return (
    <div className="relative flex justify-center">
      <span className="rotate-45 bg-violet-900 w-[10px] h-[10px] absolute top-[-7px]"></span>
      <div className="p-2  text-xs bg-violet-900 text-white flex-1">
        <Tooltip
          showArrow
          placement="bottom"
          color="secondary"
          content={target.getAttribute(DATA_DESCRIPTION) || ''}
        >
          <div className="flex gap-2 items-center">
            <Info />
            <span>{target.getAttribute(DATA_LABEL)}</span>
          </div>
        </Tooltip>
      </div>
      {target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'true' && (
        <ComponentsDropdown
          templateComponents={templateComponents}
          onSelect={handleSelect}
          isBuilder
          path={target.id}
          label="Add"
        />
      )}
      <Button
        color="warning"
        size="sm"
        radius="none"
        data-controls="true"
        startContent={<Edit />}
        onClick={() => {
          setTriggerRef({ current: target });
          setIsOpen(true);
        }}
      >
        Edit
      </Button>
      <div className="flex items-center">
        <Button
          color="danger"
          size="sm"
          radius="none"
          data-controls="true"
          startContent={<Trash />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CanvasElementControlButtons;
