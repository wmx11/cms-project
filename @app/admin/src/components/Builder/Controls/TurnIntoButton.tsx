import { DATA_LABEL } from '@cms/template-engine/constants';
import traverseComponentsTree from '@cms/template-engine/modules/traverseComponentsTree';
import { Transform } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/react';
import { BuilderState, Target } from '../../../types';
import DefaultTooltip from '../../DefaultTooltip';

// Turns component into a different component
const TurnIntoButton = ({ target, state }: Target & BuilderState) => {
  const { schema } = state;

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
        onClick={() => {
          const test = traverseComponentsTree({ path: target.id, schema });
          console.log(test);
        }}
      >
        Turn Into
      </Button>
    </DefaultTooltip>
  );
};

export default TurnIntoButton;
