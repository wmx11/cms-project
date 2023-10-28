import { DATA_ACCEPTS_CHILDREN } from '@cms/template-engine/constants';
import {
  BuilderState,
  CanvasElementControlButtonsOverlayTypes,
} from '../../../types';
import AddElementButton from './AddElementButton';
import DeleteElementButton from './DeleteElementButton';
import EditElementButton from './EditElementButton';
import ElementInfoButton from './ElementInfoButton';
import TurnIntoButton from './TurnIntoButton';

const CanvasElementControlButtons = ({
  target,
  state,
  setIsOpen,
  handleSelect,
  setTriggerRef,
}: CanvasElementControlButtonsOverlayTypes & BuilderState) => {
  return (
    <>
      <div className="relative flex items-center bg-white [&>div]:border-r-1 [&>div]:border-zinc-200">
        <div className="p-2 text-xs bg-violet-900 text-white flex-1">
          <ElementInfoButton target={target} />
        </div>
        {target.getAttribute(DATA_ACCEPTS_CHILDREN) === 'true' && (
          <div>
            <AddElementButton
              handleSelect={handleSelect}
              target={target}
              templateComponents={state.templateComponents}
            />
          </div>
        )}
        <div>
          <TurnIntoButton target={target} state={state} />
        </div>
        <div>
          <EditElementButton
            target={target}
            setIsOpen={setIsOpen}
            setTriggerRef={setTriggerRef}
          />
        </div>
        <div>
          <DeleteElementButton target={target} state={state} />
        </div>
      </div>
    </>
  );
};

export default CanvasElementControlButtons;
