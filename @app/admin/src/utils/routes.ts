const WEBSITE = 'website';
const BLOG = 'blog';
const TESTIMONIAL = 'testimonial';

const EDIT = 'edit';
const CREATE = 'create';

const generateRoutes = (baseRouteName: string) => {
  const defaultPath = `/${baseRouteName}`;
  return {
    create: `${defaultPath}/${CREATE}`,
    default: defaultPath,
    edit: `${defaultPath}/${EDIT}/$id`,
  };
};

const routes = {
  website: generateRoutes(WEBSITE),
  blog: generateRoutes(BLOG),
  testimonials: generateRoutes(TESTIMONIAL),
};

export default routes;
