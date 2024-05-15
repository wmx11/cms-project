import { produce } from 'immer';
import { BreakpointsMap } from '../constants';
import { StylesObject, StylesObjectWithBreakpoints } from '../styles/jssStyles';

interface RemoveStylesProps {
  path: string;
  stylesObject: StylesObjectWithBreakpoints;
  breakpoints: BreakpointsMap;
  rule?: string;
}

const removeStyles = (props: RemoveStylesProps) => {
  if (!props.path) {
    return console.error('[removeStyles]: No path not provided.');
  }

  if (!props.stylesObject) {
    return console.error('[removeStyles]: Styles object not provided.');
  }

  if (!props.breakpoints) {
    return console.error('[removeStyles]: Breakpoints not provided.');
  }

  const { stylesObject, breakpoints, path, rule } = props;

  const updatedBreakpoints: (keyof StylesObjectWithBreakpoints)[] = [];

  const updatedStyles = produce(stylesObject, (draft) => {
    for (const breakpoint of Object.values(breakpoints)) {
      let entry = stylesObject[breakpoint];

      if (!entry[path as keyof typeof entry]) {
        continue;
      }

      entry = draft[breakpoint];

      updatedBreakpoints.push(breakpoint);

      if (rule) {
        const entryWithRule = entry[path as keyof typeof entry] as StylesObject;

        if (!entryWithRule) {
          continue;
        }

        // Delete just the specified rule
        delete entryWithRule[rule as keyof StylesObject];
      } else {
        // Delete all the rules for the selector (path)
        delete entry[path as keyof typeof entry];
      }
    }
  });

  return { updatedStyles, updatedBreakpoints };
};

export default removeStyles;
