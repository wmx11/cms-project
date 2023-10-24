import {
  DATA_DESCRIPTION,
  DATA_LABEL,
} from '@cms/template-engine/constants/dataAttributes';
import { Target } from '../../../types';
import DefaultTooltip from '../../DefaultTooltip';
import { Info } from '@cms/ui/components/Icons';

// Displays the label of the selected component
const ElementInfoButton = ({ target }: Target) => {
  return (
    <DefaultTooltip content={target.getAttribute(DATA_DESCRIPTION) || ''}>
      <div className="flex gap-2 items-center">
        <Info />
        <span>{target.getAttribute(DATA_LABEL)}</span>
      </div>
    </DefaultTooltip>
  );
};

export default ElementInfoButton;
