import { CardContent, Card as CardWrapper } from '@cms/ui/components/Card';
import { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  alias?: string;
  name?: string;
  description?: string;
}

const Card: FC<Props> = ({ children, description, name }) => {
  return (
    <div className="space-y-2">
      <div>
        <CardWrapper className="hover:border-primary relative max-h-[180px] min-h-[180px] overflow-hidden transition-colors">
          <CardContent>
            <div className="object-fit absolute inset-0 overflow-hidden bg-zinc-100">
              {children}
            </div>
          </CardContent>
        </CardWrapper>
        <div>{name && <p className="text-sm">{name}</p>}</div>
        <div>
          {description && (
            <p className="text-xs text-zinc-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
