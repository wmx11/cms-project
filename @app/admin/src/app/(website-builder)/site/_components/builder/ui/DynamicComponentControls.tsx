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
import { Textarea } from '@cms/ui/components/Textarea';
import { useEffect } from 'react';

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

        if (prop.name === 'html' && prop.type === 'string') {
          return (
            <Textarea
              key={`${selectedComponent.id}_${index}`}
              label="Custom HTML code"
              defaultValue={prop.value}
            />
          );
        }

        if (prop.name === 'children' && prop.type === 'string') {
          return (
            <Textarea
              key={`${selectedComponent.id}_${index}`}
              label="Content"
              defaultValue={prop.value}
              onChange={(e) => {
                if (!selectedElement) {
                  return;
                }
                selectedElement.innerHTML = e.currentTarget.value;
                prop.value = e.currentTarget.value;
              }}
            />
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
