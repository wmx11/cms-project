import prisma from './prisma';

const main = async () => {
  const user = await prisma.user.create({
    data: {},
  });

  const profile = await prisma.profile.create({
    data: {
      user_id: user.id,
    },
  });

  const page = await prisma.page.create({
    data: {
      alias: 'test',
      is_published: true,
      title: 'Test Page',
      description: 'Test description',
      profile_id: profile.id,
    },
  });

  console.log(page);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
