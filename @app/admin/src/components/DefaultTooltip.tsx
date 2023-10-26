import { Tooltip } from '@nextui-org/react';
import React, { FC, PropsWithChildren } from 'react';

type Props = { content: string } & PropsWithChildren;

const DefaultTooltip: FC<Props> = ({ children, content }) => {
  return (
    <Tooltip showArrow color="secondary" content={content} delay={1000}>
      {children}
    </Tooltip>
  );
};

export default DefaultTooltip;
