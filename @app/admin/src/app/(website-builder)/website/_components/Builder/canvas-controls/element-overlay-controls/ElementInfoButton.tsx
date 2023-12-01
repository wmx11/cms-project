import { DATA_DESCRIPTION, DATA_LABEL } from '@cms/template-engine/constants';
import { Info } from '@cms/ui/components/Icons';
import { Target } from '../../../../../../../types';
import DefaultTooltip from '../../../../../../../components/DefaultTooltip';

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
