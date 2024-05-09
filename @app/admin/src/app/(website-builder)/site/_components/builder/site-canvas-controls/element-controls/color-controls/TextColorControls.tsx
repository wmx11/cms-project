'use client';
import React from 'react';
import ColorControls from '.';
import useStyles from '@admin/hooks/useStyles';

const TextColorControls = () => {
  const { applyStyles } = useStyles();

  const handleChange = (value: string) => {
    applyStyles({ color: value });
  };

  return (
    <ColorControls onChange={handleChange} label="Text color" type="color" />
  );
};

export default TextColorControls;
