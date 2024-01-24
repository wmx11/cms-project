'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Grid } from '@cms/ui/components/Icons';
import { Toggle } from '@cms/ui/components/Toggle';

export const ToggleGridButton = () => {
  const { showGrid, setShowGrid } = useBuilderProviderState();

  return (
    <Toggle variant="outline" pressed={showGrid} onPressedChange={setShowGrid}>
      <Grid />
    </Toggle>
  );
};