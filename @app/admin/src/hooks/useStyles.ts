import {
  StylesObjectWithBreakpoints,
  initialStyles,
} from '@admin/store/slices/createStylesSlice';
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
    selectedElement,
    setStyles,
    setSelectedComponentPath,
    renderTemplate,
  } = useBuilderProviderState();

  const getActiveStyles = <T extends JssStyle>(
    styleProp: keyof T,
    _selectedComonentPath?: string
  ): T | null => {
    const componentPath = _selectedComonentPath || selectedComonentPath;

    if (!componentPath) {
      return null;
    }

    const activeStyles = {} as T;

    const activeBreakpont = BREAKPOINTS_MAP[breakpoint];

    const entry = styles[activeBreakpont];

    const componentStyles = entry[
      componentPath as keyof typeof entry
    ] as JssStyle;

    if (!componentStyles && selectedElement) {
      const computedStyle = window.getComputedStyle(selectedElement);

      Object.assign(activeStyles, {
        [styleProp]: computedStyle[
          styleProp as keyof typeof computedStyle
        ] as string,
      });

      return activeStyles;
    }

    if (componentStyles) {
      Object.assign(activeStyles, {
        [styleProp]: componentStyles[styleProp as keyof JssStyle] || null,
      });

      return activeStyles;
    }

    return activeStyles;
  };

  const applyClassNameToComponent = (_selectedComonentPath?: string) => {
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

  const applyStylesForBreakpoint = (
    stylesObject: JssStyle,
    _stylesCopy: StylesObjectWithBreakpoints,
    _selectedComonentPath?: string
  ) => {
    const stylesCopy = _stylesCopy;

    const entry = stylesCopy[BREAKPOINTS_MAP[breakpoint]];

    const componentPath = _selectedComonentPath || selectedComonentPath;

    (entry[componentPath as keyof typeof entry] as JssStyle) = {
      ...(entry[componentPath as keyof typeof entry] as JssStyle),
      ...stylesObject,
    };

    styleSheet?.replaceRule(BREAKPOINTS_MAP[breakpoint], entry);

    return stylesCopy;
  };

  const applyStyles = (props: JssStyle, _selectedComonentPath?: string) => {
    const stylesCopy = applyStylesForBreakpoint(
      props,
      styles,
      _selectedComonentPath
    );

    setStyles(stylesCopy);

    const shouldRender = applyClassNameToComponent();

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  const removeStyles = () => {};

  const purgeStyles = () => {
    setStyles(initialStyles);
  };

  return {
    applyStyles,
    getActiveStyles,
    purgeStyles,
  };
};

export default useStyles;
