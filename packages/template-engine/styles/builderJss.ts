import { create } from 'jss';
import camelCase from 'jss-plugin-camel-case';
import propSort from 'jss-plugin-props-sort';
import nested from 'jss-plugin-nested';
import preset from 'jss-preset-default';
import globalStyles from 'jss-plugin-global';

const jss = create().setup({
  ...preset(),
  id: { minify: true },
  createGenerateId: () => {
    return (rule, sheet) => `wb-${rule.key}`;
  },
});

jss.use(camelCase(), propSort(), nested(), globalStyles());

export default jss;
