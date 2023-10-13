'use client';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import React from 'react';
import { Component } from '@prisma/client';

type Props = {
  templateComponents: Component[];
  onSelect?: () => void;
};

const ComponentsDropdown = ({ templateComponents, onSelect }: Props) => {
  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Button color="primary">Add Component</Button>
      </DropdownTrigger>
      <DropdownMenu items={templateComponents} onAction={onSelect}>
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
  );
};

export default ComponentsDropdown;
