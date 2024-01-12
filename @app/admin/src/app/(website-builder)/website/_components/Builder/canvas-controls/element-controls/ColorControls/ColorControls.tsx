'use client';
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
import { FC } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@cms/ui/components/Tabs';
import { useColorPicker } from 'react-best-gradient-color-picker';
import BackgroundImageController from './BackgroundImageController';
import ColorController from './ColorController';
import { ColorControlsProps } from './types';

const ColorControls: FC<ColorControlsProps> = (props) => {
  const { getActiveStyles } = useStyles();

  const currentColorString = getActiveStyles(props.type);

  const { valueToHex } = useColorPicker(currentColorString);

  const hexValue = valueToHex();

  return (
    <div>
      <Label htmlFor={`colorPicker${props.type}`}>
        {props.label || 'Color'}
      </Label>
      <Input
        id={`colorPicker${props.type}`}
        value={hexValue}
        readOnly
        startContent={
          <Popover>
            <PopoverTrigger>
              <Button
                size="icon"
                className="border"
                style={{
                  background:
                    props.type === 'background' ? currentColorString : hexValue,
                }}
              >
                <ColorPicker />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[330px]" side="left">
              <Tabs>
                <TabsList>
                  <TabsTrigger value="color">Colors</TabsTrigger>

                  {props.type === 'background' && (
                    <TabsTrigger value="image">Image</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="color">
                  <ColorController
                    onChange={props.onChange}
                    type={props.type}
                  />
                </TabsContent>

                {props.type === 'background' && (
                  <TabsContent value="image">
                    <BackgroundImageController />
                  </TabsContent>
                )}
              </Tabs>
            </PopoverContent>
          </Popover>
        }
      />
    </div>
  );
};

export default ColorControls;
