import React from 'react';
import ComponentsDropdown from '../../../../../components/ComponentsDropdown';
import prisma from '@cms/data/prisma';
import parseSchema from '@cms/template-engine/parseSchema';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const components = await prisma.component.findMany();
  const template = await parseSchema(
    [
      {
        component: 'Section',
        props: [
          {
            name: 'className',
            type: 'string',
            value: 'bg-blue-100',
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
