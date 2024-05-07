'use client';
import React, { FC, PropsWithChildren, useState } from 'react';
import LayerItem, { LayerItemProps } from './LayerItem';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@cms/ui/components/Collapsible';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from '@cms/ui/components/Icons';

interface LayerGroupProps extends PropsWithChildren, LayerItemProps {}

const LayerGroup: FC<LayerGroupProps> = ({
  id,
  label,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={twMerge('flex items-center w-full', className)}>
        <div className="flex-grow">
          <LayerItem
            id={id}
            label={label}
            className="font-bold bg-secondary"
            startContent={
              <CollapsibleTrigger>
                <ChevronDown
                  className={`transition-transform h-3 w-3 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </CollapsibleTrigger>
            }
          />
        </div>
      </div>
      <CollapsibleContent
        data-accepts-children="true"
        className="relative pl-2 bg-secondary/50"
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default LayerGroup;
