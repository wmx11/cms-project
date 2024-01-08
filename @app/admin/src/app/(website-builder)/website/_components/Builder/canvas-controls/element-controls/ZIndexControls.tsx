'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import InputElement from '../InputElement';

const ZIndexControls = () => {
  const { schema, renderTemplate } = useBuilderProviderState();
  const { applyStyles, getActiveStyles } = useStyles();

  const handleOnChange = (value: string) => {
    const shouldRender = applyStyles({ 'z-index': value });

    if (!shouldRender) {
      return;
    }

    renderTemplate(schema);
  };

  return (
    <InputElement
      type="number"
      label="Z-index"
      value={getActiveStyles('z-index')}
      onChange={handleOnChange}
    />
  );
};

export default ZIndexControls;
