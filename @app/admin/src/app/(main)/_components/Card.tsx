'use client';
import { CardContent, Card as CardWrapper } from '@cms/ui/components/Card';
import {
  DropdownMenuBuilder,
  MenuProps,
} from '@cms/ui/components/DropdownMenu';
import { ComponentPropsWithoutRef, FC } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
  alias?: string;
  name?: string;
  description?: string;
  menu?: MenuProps[] | null;
}

const Card: FC<Props> = ({ children, description, name, menu }) => {
  return (
    <div>
      <CardWrapper className="hover:border-primary group relative max-h-[180px] min-h-[180px] overflow-hidden transition-colors">
        {menu && (
          <div className="absolute right-1 top-2 z-10 opacity-0 group-hover:opacity-100">
            <DropdownMenuBuilder menu={menu} />
          </div>
        )}
        <CardContent>
          <div className="object-fit absolute inset-0 overflow-hidden bg-zinc-100">
            {children}
          </div>
        </CardContent>
      </CardWrapper>
      <div>{name && <p className="text-sm">{name}</p>}</div>
      <div>
        {description && <p className="text-xs text-zinc-500">{description}</p>}
      </div>
    </div>
  );
};

export default Card;
