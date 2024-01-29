'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Grid } from '@cms/ui/components/Icons';
import { Toggle } from '@cms/ui/components/Toggle';

export const ToggleGridButton = () => {
  const showGrid = useBuilderProviderState((state) => state.showGrid);
  const toggleGrid = useBuilderProviderState((state) => state.toggleGrid);

  return (
    <Toggle variant="outline" pressed={showGrid} onPressedChange={toggleGrid}>
      <Grid />
    </Toggle>
  );
};
