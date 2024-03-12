import Card from '@admin/app/(main)/_components/Card';
import db from '@cms/db';
import { withUser } from '@cms/packages/data/user/getters';


const Homepage = async () => {
  const sites = await withUser(async (user) => {
    return await db.site.findMany({
      where: {
        user_id: user?.id,
      },
      select: {
        is_published: true,
        alias: true,
        id: true,
      },
    });
  });
  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default Homepage;
