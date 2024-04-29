import { FC } from 'react';
import { BuilderSidebarProps } from '../BuilderPage';
import Metadata from './Metadata';

const Settings: FC<BuilderSidebarProps> = async (props) => {
  return (
    <>
      <Metadata {...props} />
    </>
  );
};

export default Settings;
