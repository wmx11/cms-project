import { DATA_LABEL } from '@cms/template-engine/constants';
import turnIntoComponent from '@cms/template-engine/modules/turnIntoComponent';
import { Transform } from '@cms/ui/components/Icons';
import ComponentsDropdown from '../../../../../../../components/ComponentsDropdown';
import DefaultTooltip from '../../../../../../../components/DefaultTooltip';
import { BuilderState, Target } from '../../../../../../../types';

// Turns component into a different component
const TurnIntoButton = ({ target, state }: Target & BuilderState) => {
  const { schema, templateComponents, renderTemplate } = state;

  const handleSelect = (key: React.Key, path: string) => {
    const newComponent = templateComponents.find((item) => item.id === key);

    if (!newComponent) {
      return null;
    }

    const newSchema = turnIntoComponent({ schema, newComponent, path });

    if (!newSchema) {
      return null;
    }

    renderTemplate(newSchema);
  };

  return (
    <DefaultTooltip
      content={`Turn ${target.getAttribute(
        DATA_LABEL
      )} into a different component`}
    >
      <div>
        <ComponentsDropdown
          templateComponents={templateComponents}
          onSelect={handleSelect}
          isCompact={true}
          path={target.id}
          startContent={<Transform />}
          label="Turn Into"
        />
      </div>
    </DefaultTooltip>
  );
};

export default TurnIntoButton;
