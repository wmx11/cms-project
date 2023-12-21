import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { LayoutBlock, LayoutFlex } from '@cms/ui/components/Icons';
import ButtonElement from '../ButtonElement';
import ControlsWrapper from '../ControlsWrapper';

const LayoutTypeControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles } = useStyles();

  const handleOnChange = (value: Record<string, string>) => {
    applyStyles(value);
    renderTemplate(schema);
  };

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
