'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import { Badge } from '@cms/ui/components/Badge';
import { CloseIcon } from '@cms/ui/components/Icons';
import { Label } from '@cms/ui/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cms/ui/components/Select';
import { Switch } from '@cms/ui/components/Switch';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import HtmlEditor from './codemirror/HtmlEditor';

const DynamicComponentControls = () => {
  const selectedComponent = useBuilderProviderState(
    (state) => state.selectedComponent
  );
  const selectedElement = useBuilderProviderState(
    (state) => state.selectedElement
  );
  const renderTemplate = useBuilderProviderState(
    (state) => state.renderTemplate
  );
  const renderedTemplate = useBuilderProviderState(
    (state) => state.renderedTemplate
  );

  useEffect(() => {}, [renderedTemplate]);

  return (
    <div className="bg-secondary/50 space-y-2 p-2 px-2">
      {selectedComponent?.props.map((prop, index) => {
        if (prop.name === 'className' && prop.type === 'string') {
          const classNames = prop.value ? prop.value.trim().split(' ') : [];

          return (
            <div key={`${selectedComponent.id}_${index}`}>
              <Label>Component classes</Label>
              <div className="border-input relative flex min-h-8 flex-wrap  items-center gap-2 overflow-clip rounded-md border bg-white p-2">
                {classNames.map((className, index) => (
                  <Badge key={`class_name_${index}`}>
                    <span className="mr-2 flex-1 break-all text-xs">
                      {className}
                    </span>
                    <button
                      onClick={() => {
                        selectedElement?.classList.remove(className);
                        classNames.splice(index, 1);
                        prop.value = classNames.join(' ');
                        renderTemplate();
                      }}
                    >
                      <CloseIcon className="max-w-3 flex-1" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          );
        }

        if (
          (prop.name === 'children' && prop.type === 'string') ||
          (prop.name === 'html' && prop.type === 'string')
        ) {
          return (
            <div className="max-w-[270px]">
              <HtmlEditor
                key={`${selectedComponent.id}_${index}`}
                value={prop.value}
                onChange={(value) => {
                  if (!selectedElement) {
                    return;
                  }

                  const sanitizedValue = DOMPurify.sanitize(value, {
                    ADD_ATTR: ['style', 'script', 'type', 'href', 'rel'],
                    ADD_TAGS: ['style', 'script'],
                    FORCE_BODY: true,
                  });

                  prop.value = sanitizedValue;
                  selectedElement.innerHTML = sanitizedValue;
                }}
              />
            </div>
          );
        }

        if (prop.type === 'select') {
          return (
            <div>
              <Label>{prop.displayName}</Label>
              <Select
                key={`${selectedComponent.id}_${index}`}
                defaultValue={prop.value}
                onValueChange={(value) => {
                  prop.value = value;
                  renderTemplate();
                }}
              >
                <SelectTrigger size="xs">
                  <SelectValue placeholder={prop.displayName} />
                </SelectTrigger>
                <SelectContent>
                  {prop.options.map((option, optionIndex) => {
                    return (
                      <SelectItem
                        key={`${prop.name}_${optionIndex}`}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          );
        }

        if (prop.type === 'boolean') {
          return (
            <div className="flex items-center space-x-2">
              <Switch
                id={prop.name}
                key={`${selectedComponent.id}_${index}`}
                defaultChecked={prop.value}
                onCheckedChange={(checked) => {
                  prop.value = checked;
                  renderTemplate();
                }}
              />
              <Label htmlFor={prop.name}>{prop.displayName}</Label>
            </div>
          );
        }

        return <></>;
      })}
    </div>
  );
};

export default DynamicComponentControls;
