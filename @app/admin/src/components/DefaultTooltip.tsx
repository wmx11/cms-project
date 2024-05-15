import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
} from '@cms/packages/ui/components/Tooltip';
import { ICON_STYLES, TooltipIcon } from '@cms/ui/components/Icons';
import { FC, PropsWithChildren } from 'react';

interface DefaultTooltipProps extends PropsWithChildren {
  content: string;
  withIcon?: boolean;
}

const DefaultTooltip: FC<DefaultTooltipProps> = ({
  children,
  content,
  withIcon,
}) => {
  const Slot = withIcon ? (
    <div className="flex flex-row-reverse items-center gap-1">
      <TooltipIcon className={ICON_STYLES} />
      <span>{children}</span>
    </div>
  ) : (
    children
  );

  return (
    <Tooltip>
      <TooltipTrigger>
        <>{Slot}</>
      </TooltipTrigger>
      <TooltipContent className="max-w-[250px]">
        <TooltipArrow />
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default DefaultTooltip;
