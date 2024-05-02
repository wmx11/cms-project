'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  DATA_LAYER_ITEM,
  DATA_TARGET_ID,
} from '@cms/packages/tiglee-engine/constants';
import generatePath from '@cms/packages/tiglee-engine/modules/generatePath';
import { Schema } from '@cms/packages/tiglee-engine/types';
import { useEffect } from 'react';
import LayerGroup from './LayerGroup';
import LayerItem from './LayerItem';

const Layers = () => {
  const schema = useBuilderProviderState((state) => state.schema);

  const selectedComonentPath = useBuilderProviderState(
    (state) => state.selectedComonentPath
  );

  useEffect(() => {
    const layerItem = document.querySelector(
      `[${DATA_LAYER_ITEM}][${DATA_TARGET_ID}="${selectedComonentPath}"]`
    );

    if (layerItem) {
      layerItem.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedComonentPath]);

  if (!schema) {
    return null;
  }

  interface RenderLayersProps {
    schema: Schema[];
    isChild: boolean;
    path: string | null;
  }

  const renderLayers = () => {
    const render = ({ isChild, path, schema }: RenderLayersProps) => {
      const layers = [];

      for (const [index, item] of schema?.entries()) {
        const children = item.props.find((item) => item.type === 'component');

        const _path = generatePath(path || '', index, item);

        const label =
          item?.displayName ||
          (item.props
            .find((item) => item.name === 'children' && item.type === 'string')
            ?.value?.toString()
            .substring(0, 50) as string) ||
          item.component;

        if (children) {
          const childrenArray = render({
            schema: children.value as Schema[],
            isChild: true,
            path: _path,
          });

          const layerGroup = (
            <LayerGroup
              label={label}
              id={_path}
              className={isChild ? 'pl-2' : 'border-b'}
            >
              {childrenArray}
            </LayerGroup>
          );

          layers.push(layerGroup);
        } else {
          const layerItem = (
            <LayerItem label={label} id={_path} className="pl-8"></LayerItem>
          );

          layers.push(layerItem);
        }
      }

      return layers;
    };

    return render({ schema: schema, isChild: false, path: null });
  };

  const layers = renderLayers();

  return <div>{layers}</div>;
};

export default Layers;
