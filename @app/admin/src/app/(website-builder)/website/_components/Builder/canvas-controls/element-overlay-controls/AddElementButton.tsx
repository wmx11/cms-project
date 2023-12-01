import { DATA_LABEL } from '@cms/template-engine/constants';
import {
  HandleSelect,
  Target,
  TemplateComponents,
} from '../../../../../../../types';
import ComponentsDropdown from '../../../../../../../components/ComponentsDropdown';
import DefaultTooltip from '../../../../../../../components/DefaultTooltip';

const AddElementButton = ({
  target,
  templateComponents,
  path,
  label = 'Add',
  handleSelect,
}: Target &
  HandleSelect &
  TemplateComponents & { path?: string; label?: string }) => {
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
          isCompact={true}
          path={path ? path : target.id}
          label={label}
        />
      </div>
    </DefaultTooltip>
  );
};

export default AddElementButton;
