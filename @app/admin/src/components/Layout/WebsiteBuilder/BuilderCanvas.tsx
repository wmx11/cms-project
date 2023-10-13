'use client';
import parseSchema from '@cms/template-engine/parseSchema';
import { Schema } from '@cms/template-engine/types';
import { Button } from '@nextui-org/react';
import { Component } from '@prisma/client';
import { useState } from 'react';
import ComponentsDropdown from '../../ComponentsDropdown';

type Props = {
  schema?: Schema[];
  templateAlias: string;
  templateComponents: Component[];
};

const BuilderCanvas = ({
  schema,
  templateAlias,
  templateComponents,
}: Props) => {
  // Stores the JSON schema
  const [websiteSchema, setWebsiteSchema] = useState<Schema[]>(schema || []);
  // Stores the React-rendered schema
  const [template, setTemplate] = useState<Schema[]>([]);

  console.log(template);

  const handleSelect = async (componentId: string) => {
    const selectedComponent = templateComponents.find(
      (item) => item.id === componentId
    );

    if (!selectedComponent || !selectedComponent?.schema) {
      return;
    }

    const componentSchema = JSON.parse(
      (selectedComponent?.schema as string) || '[]'
    );

    const schemaArray = websiteSchema;

    schemaArray.push(componentSchema);

    setWebsiteSchema(schemaArray);

    const render = await parseSchema(schemaArray, templateAlias);

    setTemplate(render);
  };

  // useEffect(() => {
  //   parseSchema(websiteSchema, 'landing-page').then((render) => {
  //     setTemplate(render);
  //   });
  // }, []);

  return (
    <div className="bg-zinc-100 min-h-screen max-h-screen p-2 overflow-auto">
      <div className="p-4 border border-dashed border-blue-300 text-center hover:border-blue-500 transition-colors">
        <Button color="primary" onPress={handleSelect}>
          Click me
        </Button>
        <ComponentsDropdown
          templateComponents={templateComponents}
          onSelect={handleSelect}
        />
      </div>
      <div>
        <>
          {template.map((block, index) => (
            <>{block}</>
          ))}
        </>
      </div>
    </div>
  );
};

export default BuilderCanvas;
