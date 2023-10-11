'use client';
import parseSchema from '@cms/template-engine/parseSchema';
import { Schema } from '@cms/template-engine/types';
import { Button } from '@nextui-org/react';
import { useState } from 'react';

type Props = {
  schema?: Schema[];
};

const BuilderCanvas = ({ schema }: Props) => {
  // Stores the JSON schema
  const [websiteSchema, setWebsiteSchema] = useState<Schema[]>(schema || []);
  // Stores the React-rendered schema
  const [template, setTemplate] = useState<Schema[]>([]);

  const handlePress = async () => {
    const toPush: Schema = {
      component: 'Section',
      props: [
        {
          name: 'className',
          type: 'string',
          value: 'bg-white',
        },
        {
          name: 'children',
          type: 'component',
          value: [
            {
              component: 'Container',
              props: [
                {
                  name: 'children',
                  type: 'component',
                  value: [
                    {
                      component: 'Title',
                      props: [
                        {
                          name: 'children',
                          type: 'string',
                          value: 'Test string 2',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    setWebsiteSchema((prevValue) => [...prevValue, toPush]);

    const render = await parseSchema(websiteSchema, 'landing-page');

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
        <Button color="primary" onPress={handlePress}>
          Click me
        </Button>
      </div>
      <div>
        <>{template}</>
      </div>
    </div>
  );
};

export default BuilderCanvas;
