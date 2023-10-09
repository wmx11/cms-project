'use client';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import React from 'react';

const ComponentsDropdown = ({ items }) => {
  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Button color="primary">Add Component</Button>
      </DropdownTrigger>
      <DropdownMenu items={items}>
        {(item) => (
          <DropdownItem description={item.description} key={item.id}>
            {item.component}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ComponentsDropdown;
