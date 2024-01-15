import { StylesObjectWithBreakpoints } from '@admin/store/slices/createStylesSlice';
import { BREAKPOINTS_MAP } from '@cms/packages/template-engine/constants';
import { JssStyle } from 'jss';
import useBuilderProviderState from './useBuilderProviderState';

const useStyles = () => {
  const {
    schema,
    styles,
    styleSheet,
    breakpoint,
    selectedComonentPath,
    selectedComponent,
    styleElement,
    selectedElement,
    setStyles,
    renderTemplate,
  } = useBuilderProviderState();

  const getActiveStyles = (styleProp: string, unit?: string): string => {
    if (!selectedComonentPath) {
      return '';
    }

    const activeBreakpont = BREAKPOINTS_MAP[breakpoint];
    const entry = styles[activeBreakpont];

    let activeStyles = '';

    const componentStyles = entry[
      selectedComonentPath as keyof typeof entry
    ] as JssStyle;

    if (!componentStyles && selectedElement) {
      const computedStyle = window.getComputedStyle(selectedElement);
      activeStyles = computedStyle[
        styleProp as keyof typeof computedStyle
      ] as string;
    }

    if (componentStyles) {
      activeStyles =
        componentStyles[styleProp as keyof JssStyle]?.toString() ?? '';
    }

    if (unit) {
      activeStyles = activeStyles?.replace(unit, '');
    }

    return activeStyles;
  };

  const applyClassNameToComponent = () => {
    const componentClassName = selectedComponent?.props.find(
      (item) => item.name === 'className'
    );

    if (!componentClassName) {
      return false;
    }

    const className = styleSheet?.classes[selectedComonentPath];

    if (!className) {
      return false;
    }

    if (!componentClassName.value.toString().includes(className)) {
      componentClassName.value = componentClassName.value
        .toString()
        .concat(' ', className);
      return true;
    }

    return false;
  };

  const applyStyleSheetToDocument = () => {
    if (!styleElement) {
      return;
    }

    styleElement.innerHTML = styleSheet?.toString() || '';
  };

  const applyStylesForBreakpoint = (
    stylesObject: JssStyle,
    _stylesCopy: StylesObjectWithBreakpoints
  ) => {
    const stylesCopy = _stylesCopy;

    const entry = stylesCopy[BREAKPOINTS_MAP[breakpoint]];

    (entry[selectedComonentPath as keyof typeof entry] as JssStyle) = {
      ...(entry[selectedComonentPath as keyof typeof entry] as JssStyle),
      ...stylesObject,
    };

    styleSheet?.replaceRule(BREAKPOINTS_MAP[breakpoint], entry);

    return stylesCopy;
  };

  const applyStyles = (props: JssStyle) => {
    const stylesCopy = applyStylesForBreakpoint(props, styles);

    setStyles(stylesCopy);

    applyStyleSheetToDocument();

    const shouldRender = applyClassNameToComponent();

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  return {
    applyStyles,
    getActiveStyles,
  };
};

export default useStyles;
