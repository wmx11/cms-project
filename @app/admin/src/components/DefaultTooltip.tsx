import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@cms/packages/ui/components/Tooltip';
import { FC, PropsWithChildren } from 'react';

type Props = { content: string } & PropsWithChildren;

const DefaultTooltip: FC<Props> = ({ children, content }) => {
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
