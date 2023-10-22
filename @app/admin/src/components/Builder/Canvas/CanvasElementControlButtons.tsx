import {
  DATA_ACCEPTS_CHILDREN,
  DATA_DESCRIPTION,
  DATA_LABEL,
} from '@cms/template-engine/constants/dataAttributes';
import { Draggable, Edit, Info, Trash } from '@cms/ui/components/Icons';
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
    <>
      <div className="relative flex items-center bg-white">
        <div className="p-2 text-xs bg-violet-900 text-white flex-1">
          <Tooltip
            showArrow
            color="foreground"
            delay={500}
            content={target.getAttribute(DATA_DESCRIPTION) || ''}
          >
            <div className="flex gap-2 items-center">
              <Info />
              <span>{target.getAttribute(DATA_LABEL)}</span>
            </div>
          </Tooltip>
        </div>
        {target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'true' && (
          <Tooltip
            showArrow
            color="foreground"
            delay={500}
            content={`Add components inside selection (${target.getAttribute(
              DATA_LABEL
            )})`}
          >
            <div className="border-r-1 border-zinc-200">
              <ComponentsDropdown
                templateComponents={templateComponents}
                onSelect={handleSelect}
                isBuilder
                path={target.id}
                label="Add"
              />
            </div>
          </Tooltip>
        )}
        <Tooltip
          showArrow
          color="foreground"
          delay={500}
          content={`Change component contents and properties`}
        >
          <Button
            className="border-r-1 border-zinc-200"
            size="sm"
            variant="light"
            color="warning"
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
        </Tooltip>
        <Tooltip
          showArrow
          color="foreground"
          delay={500}
          content={`Remove this component (${target.getAttribute(DATA_LABEL)})`}
        >
          <Button
            variant="light"
            color="danger"
            size="sm"
            radius="none"
            data-controls="true"
            startContent={<Trash />}
          >
            Delete
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default CanvasElementControlButtons;
