import Title from '@cms/ui/components/Title';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import React from 'react';
import routes from '../../utils/routes';
import { Card, CardBody } from '@nextui-org/card';

const BlogPosts = () => {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <Title className="mb-0">Blog Posts</Title>
        <Button as={Link} href={routes.blog.create} color="primary">
          Create New
        </Button>
      </div>
      <div>
        <Card>
          <CardBody>You currently have no blog posts</CardBody>
        </Card>
      </div>
    </div>
  );
};

export default BlogPosts;
