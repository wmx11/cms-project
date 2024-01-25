'use client';
import useStyles from '@admin/hooks/useStyles';
import InputElement from '../InputElement';

const initialTransformState = {
  blur: null,
};

const TransformControls = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles('filter');

  const state = {
    ...initialTransformState,
    ...(activeStyles ? activeStyles?.filter : {}),
  };

  // Rotate
  // Translate Y X Z

  const handleChange = (type: keyof typeof state, value: string) => {
    const newValue = { [type]: parseFloat(value) };
    console.log(activeStyles?.filter);
    applyStyles({ filter: `blur(${parseFloat(value)}px)` });
  };

  return (
    <div>
      <p>Tranform Controls</p>

      <InputElement
        type="text"
        label="Rotate"
        value={state?.blur || ''}
        onChange={(value) => handleChange('blur', value)}
      />
    </div>
  );
};

export default TransformControls;
