'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import { DATA_LAYER_ITEM, LAYOUT_TYPE } from '@cms/template-engine/constants';
import generatePath from '@cms/template-engine/modules/generatePath';
import removeComponent from '@cms/template-engine/modules/removeComponent';
import { Schema } from '@cms/template-engine/types';
import { Button } from '@cms/ui/components/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@cms/ui/components/Collapsible';
import { ChevronDown, Eye, EyeSlash, Trash } from '@cms/ui/components/Icons';
import React, {
  FC,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface LayerItemProps {
  label: string;
  id: string;
  className?: string;
  startContent?: React.ReactElement;
}

const LayerItem: FC<LayerItemProps> = ({
  id,
  startContent,
  label,
  className,
}) => {
  const {
    schema,
    selectedComonentPath,
    setSelectedComponentPath,
    setSelectedComponent,
    setSelectedElement,
    renderTemplate,
  } = useBuilderProviderState();

  const { applyStyles, getActiveStyles } = useStyles();

  const visibilityStyles = getActiveStyles('display', id);

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    const eventTarget = e.target as HTMLElement;

    if (!eventTarget.hasAttribute(DATA_LAYER_ITEM)) {
      return;
    }

    const target = document.getElementById(id);
    setSelectedComponentPath(id);
    setSelectedComponent(id);
    setSelectedElement(target);
    target?.focus();
    target?.scrollIntoView({ block: 'center' });
  };

  const handleDelete = () => {
    const newSchema = removeComponent({ schema, path: id });

    if (!newSchema) {
      return null;
    }

    renderTemplate(newSchema);
  };

  const handleVisibility = () => {
    const activeStyles = getActiveStyles('display', id);
    const activeLayoutType = getActiveStyles<{ [LAYOUT_TYPE]: string }>(
      LAYOUT_TYPE,
      id
    );
    applyStyles(
      {
        display:
          activeStyles?.display !== 'none'
            ? 'none'
            : activeLayoutType?.[LAYOUT_TYPE] || 'block',
      },
      id
    );
  };

  const handleHover = (type: 'add' | 'remove') => (e: MouseEvent) => {
    const target = e.currentTarget;

    const grid = document.querySelector(
      `[data-canvas-overlay-highlight="hover"][data-target-id="${target.getAttribute(
        'data-target-id'
      )}"]`
    );

    grid?.classList[type]('border-2', 'border-violet-900');
  };

  return (
    <div
      draggable
      data-target-id={id}
      data-layer-item={id}
      onMouseDown={handleOnClick}
      onMouseOver={handleHover('add')}
      onMouseLeave={handleHover('remove')}
      className={twMerge(
        'flex text-xs items-center justify-between border border-transparent group hover:border-violet-900 px-2 h-[38px] relative',
        className,
        selectedComonentPath === id && 'border-violet-900 bg-violet-200/50'
      )}
    >
      <div data-layer-item className="flex gap-2 items-center z-10">
        <div>{startContent}</div>
        <div data-layer-item className="flex-1 w-full h-full">
          <div
            data-layer-item
            className="truncate overflow-hidden max-w-[140px]"
          >
            {label}
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          'space-x-2 hidden group-hover:block',
          selectedComonentPath === id && 'block'
        )}
      >
        <Button variant="outline" size="xs" onClick={handleDelete}>
          <Trash />
        </Button>
        <Button variant="outline" size="xs" onClick={handleVisibility}>
          {visibilityStyles?.display === 'none' ? <EyeSlash /> : <Eye />}
        </Button>
      </div>
    </div>
  );
};

interface LayerGroupProps extends PropsWithChildren, LayerItemProps {}

const LayerGroup: FC<LayerGroupProps> = ({
  id,
  label,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={twMerge('flex items-center w-full', className)}>
        <div className="flex-grow">
          <LayerItem
            id={id}
            label={label}
            className="font-bold bg-secondary"
            startContent={
              <CollapsibleTrigger>
                <ChevronDown
                  className={`transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </CollapsibleTrigger>
            }
          />
        </div>
      </div>
      <CollapsibleContent
        data-accepts-children="true"
        className="relative pl-2 bg-secondary/50"
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const Layers = () => {
  const { selectedComonentPath, schema } = useBuilderProviderState();

  useEffect(() => {
    const layerItem = document.querySelector(
      `[${DATA_LAYER_ITEM}="${selectedComonentPath}"]`
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

        if (children) {
          const childrenArray = render({
            schema: children.value as Schema[],
            isChild: true,
            path: _path,
          });

          const layerGroup = (
            <LayerGroup
              label={item.component}
              id={_path}
              className={isChild ? 'pl-2' : 'border-b'}
            >
              {childrenArray}
            </LayerGroup>
          );

          layers.push(layerGroup);
        } else {
          const label =
            (item.props
              .find(
                (item) => item.name === 'children' && item.type === 'string'
              )
              ?.value?.toString()
              .substring(0, 50) as string) ||
            item.displayName ||
            item.component;

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
