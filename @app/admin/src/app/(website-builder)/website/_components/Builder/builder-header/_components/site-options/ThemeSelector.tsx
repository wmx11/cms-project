'use client';
import useStyles from '@admin/hooks/useStyles';
import {
  ACCENT_VAR,
  BACKGROUND_VAR,
  BORDER_VAR,
  MUTED_VAR,
  PRIMARY_VAR,
  RADIUS_VAR,
  SECONDARY_VAR,
} from '@cms/template-engine/constants';
import themes, {
  BuilderThemes,
  ThemeNames,
  ThemeTypes,
  ThemeVariables,
} from '@cms/template-engine/themes';
import { DropdownMenuCheckboxItem } from '@cms/ui/components/DropdownMenu';
import { FC } from 'react';

interface ThemePreviewProps {
  theme: keyof BuilderThemes;
  type: ThemeTypes;
}

const ThemePreview: FC<ThemePreviewProps> = ({ theme, type }) => {
  const item = themes[theme][type];

  const defaultStyles = {
    borderWidth: '1px',
    borderRadius: item[RADIUS_VAR],
    borderColor: item[BORDER_VAR],
  };

  interface ColorBoxProps {
    background: keyof ThemeVariables;
  }

  const ColorBox: FC<ColorBoxProps> = ({ background }) => {
    return (
      <div
        className="p-1.5"
        style={{
          background: `hsl(${item[background]})`,
          ...defaultStyles,
        }}
      ></div>
    );
  };

  const colorVariables: (keyof ThemeVariables)[] = [
    PRIMARY_VAR,
    SECONDARY_VAR,
    MUTED_VAR,
    ACCENT_VAR,
  ];

  return (
    <div className="flex justify-between items-center gap-4 w-full">
      <div className="flex-grow">{theme}</div>
      <div
        className="flex items-center gap-1 p-1.5"
        style={{
          background: `hsl(${item[BACKGROUND_VAR]})`,
          ...defaultStyles,
        }}
      >
        {colorVariables.map((item, index) => (
          <ColorBox background={item} key={`color_box_${index}`} />
        ))}
      </div>
    </div>
  );
};

const ThemeSelector = () => {
  const { applyTheme, getDocumentTheme, setDocumentTheme, getActiveTheme } =
    useStyles();

  const { type } = getDocumentTheme();
  const activeTheme = getActiveTheme();
  const themesKeys = Object.keys(themes) as ThemeNames[];

  const handleSelect = (name: ThemeNames, type: ThemeTypes) => {
    applyTheme(themes[name], name);
    setDocumentTheme(name, type);
  };

  return themesKeys.map((key) => {
    return (
      <DropdownMenuCheckboxItem
        key={key}
        checked={key === activeTheme}
        onSelect={() => handleSelect(key, type)}
      >
        <ThemePreview theme={key} type={type} />
      </DropdownMenuCheckboxItem>
    );
  });
};

export default ThemeSelector;
