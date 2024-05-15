import React, { FC } from 'react';
import SlateEditor from './SlateEditor';

interface SlateWrapperProps {
  id: string;
}

const SlateWrapper: FC<SlateWrapperProps> = ({ id }) => {
  return (
    <div id={id}>
      <SlateEditor />
    </div>
  );
};

export default SlateWrapper;
