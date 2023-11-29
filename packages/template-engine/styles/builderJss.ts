import { create } from 'jss';
import camelCase from 'jss-plugin-camel-case';
import preset from 'jss-preset-default';

const jss = create().setup(preset());

jss.use(camelCase());

export default jss;
