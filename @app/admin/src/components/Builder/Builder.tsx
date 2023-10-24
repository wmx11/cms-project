'use client';
import React, { useState } from 'react';
import { TemplateComponents } from '../../types';
import { Schema } from '@cms/template-engine/types';

type Props = {
  schema: Schema[];
  templateId: string;
} & TemplateComponents;

const Builder = () => {
  const [websiteSchema, setWebsiteSchema] = useState();
  return <div>Builder</div>;
};

export default Builder;
