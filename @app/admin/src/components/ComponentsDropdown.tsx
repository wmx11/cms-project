'use client';
import { Plus } from '@cms/packages/ui/components/Icons';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Component } from '@prisma/client';
import React from 'react';

type Props = {
  path?: string;
  label?: string;
  isCompact?: boolean;
  startContent?: JSX.Element;
  templateComponents: Component[];
  onSelect: (key: React.Key, path: string) => void;
};

const ComponentsDropdown = ({
  templateComponents,
  onSelect,
  isCompact,
  startContent,
  path,
  label = 'Add component',
}: Props) => {
  const getComponentsToRender = () => {
    if (!path) {
      return templateComponents.filter((item) => item.category === 'layout');
    }

    return templateComponents;
  };
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            color={isCompact ? 'secondary' : 'primary'}
            variant={isCompact ? 'light' : 'solid'}
            radius={isCompact ? 'none' : 'md'}
            size={isCompact ? 'sm' : 'md'}
            data-controls="true"
            startContent={startContent ? startContent : <Plus />}
          >
            {label}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          items={getComponentsToRender()}
          onAction={(key) => onSelect(key, path || '')}
        >
          {(item) => {
            const component = item as Component;
            return (
              <DropdownItem
                description={component.description}
                key={component.id}
              >
                {component.component}
              </DropdownItem>
            );
          }}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default ComponentsDropdown;
