import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@cms/packages/ui/components/Tooltip';
import { FC, PropsWithChildren } from 'react';

interface DefaultTooltipProps extends PropsWithChildren {
  content: string;
}

const DefaultTooltip: FC<DefaultTooltipProps> = ({ children, content }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DefaultTooltip;
