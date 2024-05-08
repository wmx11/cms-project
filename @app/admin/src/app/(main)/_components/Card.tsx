'use client';
import cardOptionsMenu from '@admin/components/menus/CardOptions';
import { CardContent, Card as CardWrapper } from '@cms/ui/components/Card';
import { DropdownMenuBuilder } from '@cms/ui/components/DropdownMenu';
import { ElipsisVerticalIcon } from '@cms/ui/components/Icons';
import { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  alias?: string;
  name?: string;
  description?: string;
  templateId?: string;
}

const Card: FC<Props> = ({ children, description, name, templateId }) => {
  const menu = cardOptionsMenu({ templateId });
  
  return (
    <div>
      <CardWrapper className="hover:border-primary relative max-h-[180px] min-h-[180px] overflow-hidden transition-colors">
        <div className="absolute right-0 top-0 z-10">
          <DropdownMenuBuilder menu={menu}>
            <ElipsisVerticalIcon />
          </DropdownMenuBuilder>
        </div>
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
