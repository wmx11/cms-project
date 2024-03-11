const generateRoutes = (baseRouteName: string) => {
  const defaultPath = `/${baseRouteName}`;
  return {
    create: `${defaultPath}/create`,
    default: defaultPath,
    edit: `${defaultPath}/edit/$id`,
  };
};

const routes = {
  site: generateRoutes('site'),
  accounts: '/accounts',
};

export default routes;
