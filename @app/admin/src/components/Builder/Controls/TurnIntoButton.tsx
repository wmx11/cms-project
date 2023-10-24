import { DATA_LABEL } from '@cms/template-engine/constants/dataAttributes';
import { Target } from '../../../types';
import DefaultTooltip from '../../DefaultTooltip';
import { Button } from '@nextui-org/react';
import { Transform } from '@cms/ui/components/Icons';

// Turns component into a different component
const TurnIntoButton = ({ target }: Target) => {
  return (
    <DefaultTooltip
      content={`Convert the ${target.getAttribute(
        DATA_LABEL
      )} component into a different component`}
    >
      <Button
        color="secondary"
        variant="light"
        size="sm"
        radius="none"
        startContent={<Transform />}
      >
        Turn Into
      </Button>
    </DefaultTooltip>
  );
};

export default TurnIntoButton;
