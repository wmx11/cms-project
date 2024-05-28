import { CardContent, Card as CardWrapper } from '@cms/ui/components/Card';
import {
  DropdownMenuBuilder,
  MenuProps,
} from '@cms/ui/components/DropdownMenu';
import { ComponentPropsWithoutRef, FC } from 'react';
import { format } from 'date-fns';

interface Props extends ComponentPropsWithoutRef<'div'> {
  title?: string;
  description?: string;
  menu?: MenuProps[] | null;
  date?: Date;
  dateLabel?: string;
}

const Card: FC<Props> = ({
  children,
  description,
  title,
  menu,
  date,
  dateLabel,
}) => {
  return (
    <div className="space-y-2">
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
      <div>
        <div>{title && <p className="text-sm">{title}</p>}</div>
        <div>
          {description && <p className="text-dim text-xs">{description}</p>}
        </div>
        <div>
          {date && (
            <p className="text-dim text-xs">
              {dateLabel} {format(date, 'yyyy-mm-dd hh:mm')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
