import { StylesObject } from '@admin/store/slices/createStylesSlice';
import { BREAKPOINTS_MAP } from '@cms/template-engine/constants';
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
    setStyles,
  } = useBuilderProviderState();

  const getActiveStyles = (
    styleProp: keyof JssStyle,
    unit?: string
  ): string => {
    if (!selectedComonentPath) {
      return '';
    }

    const entry = styles[BREAKPOINTS_MAP[breakpoint]];

    const componentStyles = entry[
      selectedComonentPath as keyof typeof entry
    ] as JssStyle;

    if (!componentStyles) {
      return '';
    }

    const activeStyles = componentStyles[styleProp]?.toString() ?? '';

    if (unit) {
      return activeStyles.replace(unit, '');
    }

    return activeStyles;
  };

  const applyClassNameToComponent = () => {
    const componentClassName = selectedComponent?.props.find(
      (item) => item.name === 'className'
    );

    if (!componentClassName) {
      return;
    }

    componentClassName.value = styleSheet?.classes[selectedComonentPath] || '';
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

  const applyStylesForGeneral = (
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
      stylesCopy = applyStylesForGeneral(props, stylesCopy);
    }
    setStyles(stylesCopy);
    applyClassNameToComponent();
    applyStyleSheetToDocument();
  };

  return {
    applyStyles,
    getActiveStyles,
  };
};

export default useStyles;
