'use client';
import updateSiteComponentSetAction from '@admin/app/(website-builder)/site/_actions/updateSiteComponentSetAction';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { DropdownMenuCheckboxItem } from '@cms/ui/components/DropdownMenu';
import { useParams } from 'next/navigation';

const ComponentSetSelector = () => {
  const params = useParams<{ id: string }>();
  
  const componentsList = useBuilderProviderState(
    (state) => state.componentsList
  );

  const componentAlias = useBuilderProviderState(
    (state) => state.componentAlias
  );

  const setComponentAlias = useBuilderProviderState(
    (state) => state.setComponentAlias
  );

  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

  const handleOnClick = async (alias: string, componentId: string) => {
    await updateSiteComponentSetAction({ id: params.id, componentId });
    setComponentAlias(alias);
    renderTemplate();
  };

  return componentsList?.map((item) => {
    return (
      <DropdownMenuCheckboxItem
        key={item.id}
        checked={item.alias === componentAlias}
        onClick={() => handleOnClick(item.alias, item.id)}
      >
        {item.name}
      </DropdownMenuCheckboxItem>
    );
  });
};

export default ComponentSetSelector;
