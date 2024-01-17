'use client';
import useStyles from '@admin/hooks/useStyles';
import {
  BorderRadiusTopLeft,
  BorderWidth,
  Cog,
  ICON_STYLES,
} from '@cms/ui/components/Icons';
import { Input } from '@cms/ui/components/Input';
import ControlsPopover from '../ControlsPopover';
import InputElement from '../InputElement';
import ColorControls from './ColorControls';

const BorderControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  // Border width
  // Border color
  // Border type
  // Border position
  // Border radius

  const controls = (
    <ControlsPopover icon={<Cog />}>
      <div className="border-b text-sm mb-2">Border controls</div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 w-full">
          <InputElement
            type="number"
            label="Border radius"
            value=""
            endContent={<BorderRadiusTopLeft className={ICON_STYLES} />}
            onChange={() => {}}
          />
        </div>
        <div className="flex-1 w-full">
          <InputElement
            type="number"
            label="Border thickness"
            value=""
            endContent={<BorderWidth className={ICON_STYLES} />}
            onChange={() => {}}
          />
        </div>
        <div className="flex-grow">
          <ColorControls
            onChange={(value) => {}}
            label="Border color"
            type="border-color"
          />
        </div>
      </div>
    </ControlsPopover>
  );

  return (
    <div className="flex gap-2 items-end">
      <div>{controls}</div>
      <div className="flex-1">
        <Input readOnly label="Border" defaultValue={''} />
      </div>
    </div>
  );
};

export default BorderControls;
