'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import StyleControls from './canvas-controls/StyleControls';

const BuilderSidebar = () => {
  const { styles, selectedComponent } = useBuilderProviderState();

  return (
    <>
      <div className="bg-white p-4">
        <code>
          <pre>{JSON.stringify(styles, null, 2)}</pre>
        </code>

        {selectedComponent && <StyleControls />}
      </div>
    </>
  );
};

export default BuilderSidebar;
