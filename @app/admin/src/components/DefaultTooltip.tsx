import { Tooltip } from '@nextui-org/react';
import React, { FC, PropsWithChildren } from 'react';

type Props = { content: string } & PropsWithChildren;

const DefaultTooltip: FC<Props> = ({ children, content }) => {
  return (
    <Tooltip showArrow color="secondary" content={content}>
      {children}
    </Tooltip>
  );
};

export default DefaultTooltip;
