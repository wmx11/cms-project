'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { DEFAULT_UNIT } from '@cms/packages/template-engine/constants';
import { fontSize } from '@cms/packages/template-engine/variants/variants';
import { ChevronDown } from '@cms/packages/ui/components/Icons';
import InputElement from '../InputElement';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@cms/packages/ui/components/Select';
import ButtonElement from '../ButtonElement';

const FontSizeControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    const shouldRender = applyStyles({
      'font-size': `${value}${DEFAULT_UNIT}`,
    });

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  return (
    <div className="">
      <InputElement
        className="w-full"
        type="number"
        label="Font size"
        value={getActiveStyles('font-size', DEFAULT_UNIT)}
        min={1}
        onChange={handleOnChange}
        endContent={
          <Select
            onValueChange={handleOnChange}
            value={getActiveStyles('font-size', DEFAULT_UNIT)}
          >
            <SelectTrigger className="border-none p-0 max-w-[38px]">
              <ButtonElement>
                <ChevronDown />
              </ButtonElement>
            </SelectTrigger>
            <SelectContent>
              {fontSize.map((item) => (
                <SelectItem value={item.toString()} key={item}>
                  {item.toString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
};

export default FontSizeControls;
