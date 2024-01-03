import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { LayoutBlock, LayoutFlex } from '@cms/packages/ui/components/Icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemWithDescription,
  SelectTrigger,
  SelectValue,
} from '@cms/ui/components/Select';
import ButtonElement from '../ButtonElement';
import ControlsWrapper from '../ControlsWrapper';

const LayoutTypeControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: Record<string, string>) => {
    applyStyles(value);
    renderTemplate(schema);
  };

  return (
    <Select
      value={getActiveStyles('--layout-type')}
      onValueChange={(value) => {
        handleOnChange(JSON.parse(value));
        console.log(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Element Layout Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='{ "--layout-type": "block", "display": "block" }'>
          <SelectItemWithDescription
            label="Block"
            description="The selected element will be displayed as a block"
          />
        </SelectItem>
        <SelectItem value='{ "--layout-type": "inline", "display": "inline" }'>
          <SelectItemWithDescription
            label="Inline"
            description="The selected element will be displayed as an inline element"
          />
        </SelectItem>
        <SelectItem value='{ "--layout-type": "flex-row", "display": "flex", "flex-direction": "row" }'>
          <SelectItemWithDescription
            label="Flex Row"
            description="The selected element will have its children displayed in a line"
          />
        </SelectItem>
        <SelectItem value='{ "--layout-type": "flex-column", "display": "flex", "flex-direction": "colummn" }'>
          <SelectItemWithDescription
            label="Flex Column"
            description="Something"
          />
        </SelectItem>
        <SelectItem value='{ "--layout-type": "flex-row-reverse", "display": "flex", "flex-direction": "row-reverse" }'>
          <SelectItemWithDescription
            label="Flex Row Reverse"
            description="Something"
          />
        </SelectItem>
        <SelectItem value='{ "--layout-type": "flex-column-reverse", "display": "flex", "flex-direction": "column-reverse" }'>
          <SelectItemWithDescription
            label="Flex Column Reverse"
            description="Something"
          />
        </SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <ControlsWrapper>
      <ButtonElement
        icon={<LayoutBlock />}
        onClick={() => handleOnChange({ display: 'block' })}
      >
        Block
      </ButtonElement>
      <ButtonElement onClick={() => handleOnChange({ display: 'inline' })}>
        Inline
      </ButtonElement>
      <ButtonElement
        icon={<LayoutFlex />}
        onClick={() =>
          handleOnChange({ display: 'flex', 'flex-direction': 'row' })
        }
      >
        Flex Row
      </ButtonElement>
      <ButtonElement
        onClick={() =>
          handleOnChange({ display: 'flex', 'flex-direction': 'column' })
        }
      >
        Flex Col
      </ButtonElement>
      <ButtonElement
        onClick={() =>
          handleOnChange({ display: 'flex', 'flex-direction': 'row-reverse' })
        }
      >
        Flex Flex Row Reverse
      </ButtonElement>
      <ButtonElement
        onClick={() =>
          handleOnChange({
            display: 'flex',
            'flex-direction': 'column-reverse',
          })
        }
      >
        Flex Flex Col Reverse
      </ButtonElement>
    </ControlsWrapper>
  );
};

export default LayoutTypeControls;
