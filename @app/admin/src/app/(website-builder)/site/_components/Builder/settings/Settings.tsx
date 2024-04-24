import React, { FC } from 'react';
import Metadata from './Metadata';
import { BuilderSidebarProps } from '../BuilderPage';

const Settings: FC<BuilderSidebarProps> = async (props) => {
  return (
    <>
      <Metadata {...props} />
    </>
  );
};

export default Settings;
