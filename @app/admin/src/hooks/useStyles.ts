import { StylesObject } from '@admin/store/slices/createStylesSlice';
import { BREAKPOINTS_MAP } from '@cms/packages/template-engine/constants';
import { JssStyle } from 'jss';
import useBuilderProviderState from './useBuilderProviderState';

const useStyles = () => {
  const {
    styles,
    styleSheet,
    breakpoint,
    selectedComonentPath,
    selectedComponent,
    styleElement,
    selectedElement,
    setStyles,
  } = useBuilderProviderState();

  const getActiveStyles = (styleProp: string, unit?: string): string => {
    if (!selectedComonentPath) {
      return '';
    }

    let activeStyles = '';

    const entry = styles[BREAKPOINTS_MAP[breakpoint]];

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
      return activeStyles?.replace(unit, '');
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
    _stylesCopy: StylesObject
  ) => {
    const stylesCopy = _stylesCopy;

    const stylesCopyBreakpointEntry = stylesCopy[BREAKPOINTS_MAP[breakpoint]];
    (stylesCopyBreakpointEntry[
      selectedComonentPath as keyof typeof stylesCopyBreakpointEntry
    ] as JssStyle) = {
      ...(stylesCopyBreakpointEntry[
        selectedComonentPath as keyof typeof stylesCopyBreakpointEntry
      ] as JssStyle),
      ...stylesObject,
    };

    styleSheet?.replaceRule(
      BREAKPOINTS_MAP[breakpoint],
      stylesCopyBreakpointEntry
    );

    return stylesCopy;
  };

  const applyStylesForDefaultBreakpoint = (
    stylesObject: JssStyle,
    _stylesCopy: StylesObject
  ) => {
    const stylesCopy = _stylesCopy;

    (stylesCopy[selectedComonentPath as keyof typeof stylesCopy] as JssStyle) =
      {
        ...(stylesCopy[
          selectedComonentPath as keyof typeof stylesCopy
        ] as JssStyle),
        ...stylesObject,
      };
    styleSheet?.replaceRule(
      selectedComonentPath,
      stylesCopy[selectedComonentPath as keyof typeof stylesCopy] as JssStyle
    );

    return stylesCopy;
  };

  const applyStyles = (props: JssStyle) => {
    let stylesCopy = { ...styles };
    if (breakpoint) {
      stylesCopy = applyStylesForBreakpoint(props, stylesCopy);
    } else {
      stylesCopy = applyStylesForDefaultBreakpoint(props, stylesCopy);
    }
    setStyles(stylesCopy);
    applyStyleSheetToDocument();
    return applyClassNameToComponent();
  };

  return {
    applyStyles,
    getActiveStyles,
  };
};

export default useStyles;
