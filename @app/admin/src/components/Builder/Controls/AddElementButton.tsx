import { DATA_LABEL } from '@cms/template-engine/constants/dataAttributes';
import { HandleSelect, Target, TemplateComponents } from '../../../types';
import DefaultTooltip from '../../DefaultTooltip';
import ComponentsDropdown from '../../ComponentsDropdown';

const AddElementButton = ({
  target,
  templateComponents,
  handleSelect,
}: Target & HandleSelect & TemplateComponents) => {
  return (
    <DefaultTooltip
      content={`Insert new component into the ${target.getAttribute(
        DATA_LABEL
      )} component`}
    >
      <div>
        <ComponentsDropdown
          templateComponents={templateComponents}
          onSelect={handleSelect}
          isBuilder
          path={target.id}
          label="Add"
        />
      </div>
    </DefaultTooltip>
  );
};

export default AddElementButton;
