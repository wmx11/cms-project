'use client';
import useStyles from '@admin/hooks/useStyles';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@cms/ui/components/Select';
import themes from '@cms/template-engine/themes';
import React from 'react';

const ThemeSelector = () => {
  const { applyTheme } = useStyles();

  return (
    <Select onValueChange={(key) => applyTheme(themes[key].light)}>
      <SelectTrigger></SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {Object.keys(themes).map((key) => {
            const item = themes[key];
            return (
              <SelectItem value={key} key={key}>
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1 w-[50px]">{key.replace(/-/g, ' ')}</div>
                  <div
                    className="flex items-center gap-2 p-1.5"
                    style={{
                      background: `hsl(${item.light['--tg-background']})`,
                      borderWidth: '1px',
                      borderRadius: item.light['--tg-radius'],
                      borderColor: item.light['--tg-border'],
                    }}
                  >
                    <div
                      className="p-1.5"
                      style={{
                        background: `hsl(${item.light['--tg-primary']})`,
                        borderWidth: '1px',
                        borderRadius: item.light['--tg-radius'],
                        borderColor: item.light['--tg-border'],
                      }}
                    ></div>
                    <div
                      className="p-1.5"
                      style={{
                        background: `hsl(${item.light['--tg-secondary']})`,
                        borderWidth: '1px',
                        borderRadius: item.light['--tg-radius'],
                        borderColor: item.light['--tg-border'],
                      }}
                    ></div>
                    <div
                      className="p-1.5"
                      style={{
                        background: `hsl(${item.light['--tg-muted']})`,
                        borderWidth: '1px',
                        borderRadius: item.light['--tg-radius'],
                        borderColor: item.light['--tg-border'],
                      }}
                    ></div>
                    <div
                      className="p-1.5"
                      style={{
                        background: `hsl(${item.light['--tg-accent']})`,
                        borderWidth: '1px',
                        borderRadius: item.light['--tg-radius'],
                        borderColor: item.light['--tg-border'],
                      }}
                    ></div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ThemeSelector;
