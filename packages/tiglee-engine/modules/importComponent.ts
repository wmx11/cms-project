const importComponent = async (alias: string, component: string) => {
  if (!component || !alias) {
    return null;
  }

  try {
    const importedComponent = await import(
      /* webpackExclude: /\README\.md$/ */
      `../../tiglee-components/${alias}/components/${component}`
    );

    return importedComponent;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default importComponent;
