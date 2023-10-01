'use client';
import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Heading from '@cms/ui/components/Heading';
import { Edit, Plus, Trash } from '@cms/ui/components/Icons';
import React from 'react';
import Link from 'next/link';
import routes from '../../utils/routes';

const Homepage = () => {
  return (
    <main>
      <div className="flex items-center justify-between mb-8">
        <Heading className="mb-0">My Websites</Heading>
        <Button
          color="primary"
          endContent={<Plus className="text-xl" />}
          as={Link}
          href={routes.website.create}
        >
          Create New
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array(2)
          .fill(1)
          .map((item, i) => {
            return (
              <Card key={i}>
                <CardBody>
                  <Image
                    src="https://pbs.twimg.com/profile_banners/1497197833119801393/1694856607/1500x500"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </CardBody>
                <CardFooter>
                  <div className="flex items-center justify-between w-full gap-4">
                    <p className="text-sm">Website name</p>
                    <div className="space-x-4">
                      <Button
                        color="warning"
                        size="sm"
                        endContent={<Edit />}
                        as={Link}
                        href={routes.website.edit.replace('$id', '244tgdfdg')}
                      >
                        Edit
                      </Button>
                      <Button color="danger" size="sm" endContent={<Trash />}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </main>
  );
};

export default Homepage;
