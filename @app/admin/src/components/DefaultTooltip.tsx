import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@cms/packages/ui/components/Tooltip';
import { FC, PropsWithChildren } from 'react';

interface DefaultTooltipProps extends PropsWithChildren {
  content: string;
}

const DefaultTooltip: FC<DefaultTooltipProps> = ({ children, content }) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default DefaultTooltip;
