import { DATA_LABEL } from '@cms/template-engine/constants';
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
          isBuilder={true}
          path={target.id}
          label="Add"
        />
      </div>
    </DefaultTooltip>
  );
};

export default AddElementButton;
