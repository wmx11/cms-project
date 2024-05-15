const makeRoutes = (baseRouteName: string) => {
  const defaultPath = `/${baseRouteName}`;
  return {
    create: `${defaultPath}/create`,
    default: defaultPath,
    edit: `${defaultPath}/edit/$id`,
  };
};

const routes = {
  site: makeRoutes('site'),
  accounts: '/accounts',
};

export default routes;
