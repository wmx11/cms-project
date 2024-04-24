'use client';
import { Input } from '@cms/ui/components/Input';
import BrowserTab from '@admin/components/BrowserTab';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import updateSiteMetadataAction from '../../../_actions/updateSiteMetadataAction';
import { BuilderSidebarProps } from '../BuilderPage';
import { Textarea } from '../ui/Textarea';
import SubmitButton from './SubmitButton';

const Metadata: FC<BuilderSidebarProps> = (props) => {
  const params = useParams<{ id: string }>();
  const [title, setTitle] = useState(props.title || '');
  const [description, setDescription] = useState(props.description || '');

  return (
    <form action={updateSiteMetadataAction.bind(null, params.id)}>
      <div className="space-y-4">
        <div>
          <Input
            name="title"
            label="Site title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <BrowserTab className="mt-2">{title}</BrowserTab>
        </div>

        <div>
          <Textarea
            name="description"
            label="Site description"
            value={props.description || ''}
            showLength
          />
        </div>
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
};

export default Metadata;
