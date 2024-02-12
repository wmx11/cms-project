'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import useStyles from '@admin/hooks/useStyles';
import handleOnBlur from '@admin/utils/handleOnBlur';
import handleOnEscapeOrEnter from '@admin/utils/handleOnEscapeOrEnter';
import { selectTextContent } from '@admin/utils/textSelections';
import {
  DATA_CANVAS_OVERLAY_HIGHLIGHT,
  DATA_LAYER_ITEM,
  DATA_TARGET_ID,
  LAYOUT_TYPE,
} from '@cms/template-engine/constants';
import removeComponent from '@cms/template-engine/modules/removeComponent';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import React, { FC, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../ui/buttons/Button';
import { Eye, EyeSlash, Trash } from '@cms/ui/components/Icons';
import RemoveStylesButton from '../../ui/buttons/RemoveStylesButton';

export interface LayerItemProps {
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
  const schema = useBuilderProviderState((state) => state.schema);
  const selectedComonentPath = useBuilderProviderState(
    (state) => state.selectedComonentPath
  );
  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );
  const setSelectedComponentPath = useBuilderProviderState(
    (state) => state.setSelectedComponentPath
  );
  const setSelectedComponent = useBuilderProviderState(
    (state) => state.setSelectedComponent
  );
  const setSelectedElement = useBuilderProviderState(
    (state) => state.setSelectedElement
  );
  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );

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

  const handleDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;
    if (!target) {
      return;
    }
    target.setAttribute('contenteditable', 'true');
    target.focus();
    selectTextContent(target);
  };

  const setDisplayName = (target: HTMLElement) => {
    let component = selectedComponent;

    if (!component) {
      component = traverseComponentsTree({ path: id, schema });
    }

    if (!component) {
      return;
    }

    if (!component?.displayName) {
      Object.assign(component, { displayName: '' });
    }

    component.displayName = target.innerText;

    target.removeAttribute('contenteditable');

    renderTemplate();
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

    const getDisplay = () => {
      if (activeStyles?.display !== 'none') {
        return 'none';
      }

      if (activeLayoutType?.[LAYOUT_TYPE]) {
        return activeLayoutType?.[LAYOUT_TYPE];
      }

      return 'block';
    };

    applyStyles(
      {
        display: getDisplay(),
      },
      id
    );
  };

  const handleHover = (type: 'add' | 'remove') => (e: MouseEvent) => {
    const target = e.currentTarget;

    const grid = document.querySelector(
      `[${DATA_CANVAS_OVERLAY_HIGHLIGHT}="hover"][${DATA_TARGET_ID}="${target.getAttribute(
        DATA_TARGET_ID
      )}"]`
    );

    grid?.classList[type]('border-4', 'border-violet-900');
  };

  return (
    <div
      draggable
      data-layer-item
      data-target-id={id}
      onClick={handleOnClick}
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
            className="truncate overflow-hidden empty:bg-red-100 min-h-[10px] min-w-[20px] max-w-[120px]"
            onDoubleClick={handleDoubleClick}
            onKeyUp={handleOnEscapeOrEnter((target) => setDisplayName(target))}
            onBlur={handleOnBlur(setDisplayName)}
          >
            {label}
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          'space-x-1 hidden group-hover:block',
          selectedComonentPath === id && 'block'
        )}
      >
        <RemoveStylesButton />
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

export default LayerItem;
