const generateRoutes = (baseRouteName: string) => {
  const defaultPath = `/${baseRouteName}`;
  return {
    create: `${defaultPath}/create`,
    default: defaultPath,
    edit: `${defaultPath}/edit/$id`,
  };
};

const routes = {
  website: generateRoutes('website'),
  blog: generateRoutes('blog'),
  testimonials: generateRoutes('testimonials'),
  templates: generateRoutes('templates'),
};

export default routes;
