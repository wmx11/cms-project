import { Button } from '@cms/ui/components/Button';
import { Card, CardContent } from '@cms/ui/components/Card';
import { Plus } from '@cms/ui/components/Icons';
import Title from '@cms/ui/components/Title';
import Link from 'next/link';
import Header from '../../components/Header';
import routes from '../../utils/routes';

const BlogPosts = () => {
  return (
    <div>
      <Header>
        <Title className="mb-0">Blog Posts</Title>
        <Button asChild>
          <Link href={routes.blog.create}>
            <Plus className="h-3 w-3 mr-2" />
            Create New
          </Link>
        </Button>
      </Header>
      <div>
        <Card>
          <CardContent>You currently have no blog posts</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPosts;
