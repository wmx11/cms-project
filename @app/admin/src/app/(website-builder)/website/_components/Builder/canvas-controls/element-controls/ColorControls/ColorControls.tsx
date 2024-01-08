'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { Button } from '@cms/ui/components/Button';
import { ColorPicker } from '@cms/ui/components/Icons';
import { Input } from '@cms/ui/components/Input';
import { Label } from '@cms/ui/components/Label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@cms/ui/components/Popover';
import { FC, useState } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@cms/ui/components/Tabs';
import ColorPickerComponent from 'react-best-gradient-color-picker';

interface ColorControlsProps {
  type: 'color' | 'background';
  label?: string;
}

const ColorControls: FC<ColorControlsProps> = (props) => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();
  const [colorString, setColorString] = useState(getActiveStyles(props.type));

  const handleChange = (value: string) => {
    const shouldRender = applyStyles({ [props.type]: value });

    setColorString(value);

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  return (
    <div>
      <Label htmlFor={`colorPicker${props.type}`}>
        {props.label || 'Color'}
      </Label>
      <Input
        id={`colorPicker${props.type}`}
        value={colorString}
        startContent={
          <Popover>
            <PopoverTrigger>
              <Button
                size="icon"
                className="border"
                style={{ background: colorString }}
              >
                <ColorPicker />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[100px]]">
              <Tabs>
                <TabsList>
                  <TabsTrigger value="color">Colors</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                </TabsList>
                <TabsContent value="color"></TabsContent>
                <TabsContent value="image">
                  <div>Fill, fit, crop, tile</div>
                </TabsContent>
              </Tabs>
              <div className="mb-4">
                <ColorPickerComponent
                  value={colorString}
                  onChange={handleChange}
                  className=""
                />
              </div>
            </PopoverContent>
          </Popover>
        }
      />
    </div>
  );
};

export default ColorControls;
