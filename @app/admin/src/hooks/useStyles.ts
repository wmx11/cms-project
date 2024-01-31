import {
  StylesObjectWithBreakpoints,
  initialStyles,
} from '@admin/store/slices/createStylesSlice';
import {
  BREAKPOINTS_MAP,
  BUILDER_DATA_THEME_NAME,
  BUILDER_DATA_THEME_TYPE,
  BUILDER_STYLES_META_TAG_SELECTOR,
  THEME_NAME_VAR,
} from '@cms/packages/template-engine/constants';
import { JssStyle } from 'jss';
import useBuilderProviderState from './useBuilderProviderState';
import {
  BuilderThemes,
  ThemeNames,
  ThemeTypes,
} from '@cms/template-engine/themes';

const useStyles = () => {
  const schema = useBuilderProviderState((state) => state.schema);

  const styles = useBuilderProviderState((state) => state.styles);

  const styleSheet = useBuilderProviderState((state) => state.styleSheet);

  const breakpoint = useBuilderProviderState((state) => state.breakpoint);

  const selectedComonentPath = useBuilderProviderState(
    (state) => state.selectedComonentPath
  );

  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );

  const setStyles = useBuilderProviderState((state) => state.setStyles);

  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

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

    styleSheet?.replaceRule(BREAKPOINTS_MAP[breakpoint], entry as JssStyle);

    return stylesCopy;
  };

  type GetDocumentThemeReturnTypes = {
    name: ThemeNames | null;
    type: ThemeTypes;
  };

  const getDocumentTheme = (): GetDocumentThemeReturnTypes => {
    if (typeof document === 'undefined') {
      return {
        name: null,
        type: 'light',
      };
    }

    const themeName = document.querySelector(`[${BUILDER_DATA_THEME_NAME}]`);
    const themeType = document.querySelector(`[${BUILDER_DATA_THEME_TYPE}]`);

    return {
      name: themeName?.getAttribute(
        BUILDER_DATA_THEME_NAME
      ) as ThemeNames | null,
      type:
        (themeType?.getAttribute(
          BUILDER_DATA_THEME_TYPE
        ) as GetDocumentThemeReturnTypes['type']) || 'light',
    };
  };

  const getActiveTheme = (): ThemeNames | null => {
    if (!styles.hasOwnProperty('@global')) {
      return null;
    }

    if (!styles['@global']?.hasOwnProperty(':root')) {
      return null;
    }

    if (!styles['@global'][':root']?.hasOwnProperty(THEME_NAME_VAR)) {
      return null;
    }

    return styles['@global'][':root'][THEME_NAME_VAR] as ThemeNames;
  };

  const setDocumentTheme = (name: string, type: string) => {
    const themeName = document.querySelector(`[${BUILDER_DATA_THEME_NAME}]`);
    const themeType = document.querySelector(`[${BUILDER_DATA_THEME_TYPE}]`);
    themeName?.setAttribute(BUILDER_DATA_THEME_NAME, name);
    themeType?.setAttribute(BUILDER_DATA_THEME_TYPE, type);
  };

  const applyTheme = (
    theme: BuilderThemes[keyof BuilderThemes],
    name: ThemeNames
  ) => {
    const stylesCopy = { ...styles };

    if (!stylesCopy.hasOwnProperty('@global')) {
      Object.assign(stylesCopy, {
        '@global': {
          ':root': { [THEME_NAME_VAR]: name },
          [`[${BUILDER_DATA_THEME_TYPE}="dark"]`]: {},
        },
      });
    }

    stylesCopy['@global'][':root'] = {
      ...stylesCopy['@global'][':root'],
      [THEME_NAME_VAR]: name,
      ...theme.light,
    };

    stylesCopy['@global'][`[${BUILDER_DATA_THEME_TYPE}="dark"]`] = {
      ...theme.dark,
    };

    styleSheet?.replaceRule('@global', {
      ':root': { ...stylesCopy['@global'][':root'] },
      [`[${BUILDER_DATA_THEME_TYPE}="dark"]`]: {
        ...stylesCopy['@global'][`[${BUILDER_DATA_THEME_TYPE}="dark"]`],
      },
    });

    const stylesElement = document.querySelector(
      `[${BUILDER_STYLES_META_TAG_SELECTOR}]`
    );

    if (stylesElement && styleSheet) {
      stylesElement.innerHTML = styleSheet.toString();
    }

    setStyles(stylesCopy);
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
    applyTheme,
    getActiveTheme,
    getDocumentTheme,
    setDocumentTheme,
  };
};

export default useStyles;
