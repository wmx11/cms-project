import { PrismaClient } from '@prisma/client';

const paymentPlan = async () => {
  const prisma = new PrismaClient();

  const test = await prisma.paymentPlan.create({
    data: {
      name: 'early',
      price: null,
      hasAnalytics: true,
      hasCookies: true,
      hasCustomDomain: true,
      showBuiltWith: false,
      maxUploadSize: 100,
      numberOfPages: null,
      numberOfSites: null,
      versionHistoryDuration: 30,
    },
  });

  await prisma.paymentPlan.create({
    data: {
      name: 'free',
      price: 0,
      hasAnalytics: false,
      hasCookies: false,
      hasCustomDomain: false,
      showBuiltWith: true,
      maxUploadSize: 5,
      numberOfPages: 3,
      numberOfSites: 3,
      versionHistoryDuration: 3,
    },
  });
  await prisma.paymentPlan.create({
    data: {
      name: 'basic',
      price: 5,
      hasAnalytics: false,
      hasCookies: false,
      hasCustomDomain: true,
      showBuiltWith: false,
      maxUploadSize: 10,
      numberOfPages: 10,
      numberOfSites: 10,
      versionHistoryDuration: 7,
    },
  });
  await prisma.paymentPlan.create({
    data: {
      name: 'pro',
      price: 19,
      hasAnalytics: true,
      hasCookies: true,
      hasCustomDomain: true,
      showBuiltWith: false,
      maxUploadSize: 30,
      numberOfPages: null,
      numberOfSites: null,
      versionHistoryDuration: 30,
    },
  });
};

(async () => {
  await paymentPlan();
})();
