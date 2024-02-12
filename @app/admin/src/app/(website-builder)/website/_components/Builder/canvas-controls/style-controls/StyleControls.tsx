'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import Content from './Content';
import Header from './Header';
import NoSelection from './NoSelection';

const StyleControls = () => {
  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );

  if (!selectedComponent) {
    return <NoSelection />;
  }

  return (
    <div>
      <Header />
      <Content />
    </div>
  );
};

export default StyleControls;
