import { Plus } from '@cms/ui/components/Icons';
import Title from '@cms/ui/components/Title';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import Link from 'next/link';
import routes from '../../utils/routes';
import Header from '../../components/Header';
import SlateEditor from '../../components/Editor/SlateEditor';

const BlogPosts = () => {
  return (
    <div>
      <Header>
        <Title className="mb-0">Blog Posts</Title>
        <Button
          as={Link}
          href={routes.blog.create}
          color="primary"
          endContent={<Plus />}
        >
          Create New
        </Button>
      </Header>
      <div>
        <Card>
          <CardBody>You currently have no blog posts</CardBody>
          <SlateEditor />
        </Card>
      </div>
    </div>
  );
};

export default BlogPosts;
