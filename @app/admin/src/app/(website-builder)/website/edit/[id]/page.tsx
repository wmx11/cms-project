import React from 'react';
import ComponentsDropdown from '../../../../../components/ComponentsDropdown';
import { getComponentsByTemplateId } from '@cms/data/component/getters';
import parseSchema from '@cms/template-engine/parseSchema';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const components = await getComponentsByTemplateId(params.id);

  const template = await parseSchema(
    [
      {
        component: 'Section',
        props: [
          {
            name: 'className',
            type: 'string',
            value: 'bg-purple-200',
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
                            value: 'Test title',
                          },
                          {
                            name: 'className',
                            type: 'string',
                            value: 'mb-0',
                          },
                        ],
                      },
                      {
                        component: 'Subtitle',
                        props: [
                          {
                            name: 'children',
                            type: 'string',
                            value: 'Test subtitle',
                          },
                        ],
                      },
                      {
                        component: 'Button',
                        props: [
                          {
                            name: 'children',
                            type: 'string',
                            value: 'Test button',
                          },
                        ],
                      },
                      {
                        component: 'Button',
                        props: [
                          {
                            name: 'children',
                            type: 'string',
                            value: 'Test button 2',
                          },
                          {
                            name: 'className',
                            type: 'string',
                            value: 'ml-4',
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
      },
    ],
    'landing-page'
  );
  return (
    <div className="relative">
      <div className="bg-zinc-100 min-h-screen p-2">
        <>{template}</>
        <div className="bg-white w-full h-full text-center">
          <ComponentsDropdown items={components} />
        </div>
      </div>
    </div>
  );
};

export default page;
