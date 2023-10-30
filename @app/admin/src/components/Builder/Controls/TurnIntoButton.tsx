import { DATA_LABEL } from '@cms/template-engine/constants';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import { Transform } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import { BuilderState, Target } from '../../../types';
import DefaultTooltip from '../../DefaultTooltip';
import ComponentsDropdown from '../../ComponentsDropdown';
import getPathArray, {
  checkTopLevel,
} from '@cms/template-engine/modules/getPathArray';
import { Schema } from '@cms/template-engine/types';

// Turns component into a different component
const TurnIntoButton = ({ target, state }: Target & BuilderState) => {
  const { schema, templateComponents, renderTemplate } = state;

  const handleSelect = (key: React.Key, path: string) => {
    const selectedComponent = templateComponents.find(
      (item) => item.id === key
    );

    if (!selectedComponent) {
      return null;
    }

    const turnIntoComponent: Schema = JSON.parse(
      (selectedComponent.schema as string) || '{}'
    );

    const copySchema = [...schema];
    const pathArray = getPathArray(path);
    const isTopLevel = checkTopLevel(pathArray);

    const targetComponent = traverseComponentsTree({
      schema: copySchema,
      returnParent: !isTopLevel,
      path,
    });

    if (!targetComponent) {
      return null;
    }

    const mapTargetComponentPropsToTurnIntoComponent = (
      target: Schema,
      turnInto: Schema
    ) => {
      target?.props.forEach((item) => {
        const propToMap = turnInto.props.find(
          (prop) => prop.name === item.name && prop.type === item.type
        );

        if (!propToMap) {
          return;
        }

        propToMap.value = item.value;
      });
    };

    if (isTopLevel) {
      const index = copySchema.indexOf(targetComponent as Schema);
      mapTargetComponentPropsToTurnIntoComponent(
        targetComponent,
        turnIntoComponent
      );
      copySchema.splice(index, 1, turnIntoComponent);
    } else {
      const children = targetComponent?.props.find(
        (item) => item.type === 'component' && item.name === 'children'
      )?.value as Schema[];

      const index = parseInt(pathArray.at(-2) as string, 10);

      mapTargetComponentPropsToTurnIntoComponent(
        targetComponent,
        turnIntoComponent
      );

      children?.splice(index, 1, turnIntoComponent);
    }

    renderTemplate(copySchema);
  };

  return (
    <DefaultTooltip
      content={`Convert the ${target.getAttribute(
        DATA_LABEL
      )} component into a different component`}
    >
      <div>
        <ComponentsDropdown
          templateComponents={templateComponents}
          onSelect={handleSelect}
          isBuilder={true}
          path={target.id}
          startContent={<Transform />}
          label="Turn Into"
        />
      </div>
    </DefaultTooltip>
  );
};

export default TurnIntoButton;
