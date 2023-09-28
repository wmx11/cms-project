import { TemplateID } from './types';

const importComponent = async (id: TemplateID, component: string) => {
  if (!component || !id) {
    return null;
  }

  try {
    const importedComponent = await import(
      `../templates/${id}/components/${component}`
    );

    return importedComponent;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default importComponent;
