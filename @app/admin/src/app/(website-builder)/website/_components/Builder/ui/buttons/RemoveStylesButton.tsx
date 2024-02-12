'use client';
import React, { FC, PropsWithChildren } from 'react';
import Button from './Button';
import { RemoveStylesIcon } from '@cms/ui/components/Icons';
import useStyles from '@admin/hooks/useStyles';
import DefaultTooltip from '@admin/components/DefaultTooltip';

interface RemoveStylesButtonProps extends PropsWithChildren {
  style?: string;
  tooltip?: string;
}

const RemoveStylesButton: FC<RemoveStylesButtonProps> = ({
  children,
  style,
  tooltip,
}) => {
  const { removeStyles } = useStyles();

  const handleClick = (style?: string) => {
    removeStyles(style);
  };

  const buttonDisplay = children
    ? { icon: <RemoveStylesIcon />, children }
    : { children: <RemoveStylesIcon /> };

  return (
    <DefaultTooltip
      content={tooltip ?? 'Remove all styles from the selected component'}
    >
      <Button
        size="xs"
        variant="outline"
        onClick={() => handleClick(style)}
        {...buttonDisplay}
      />
    </DefaultTooltip>
  );
};

export default RemoveStylesButton;
