import { DATA_ACCEPTS_CHILDREN } from '@cms/template-engine/constants';
import AddElementButton from './AddElementButton';
import DeleteElementButton from './DeleteElementButton';
import DuplicateElementButton from './DuplicateElementButton';
import EditElementButton from './EditElementButton';
import ElementInfoButton from './ElementInfoButton';
import TurnIntoButton from './TurnIntoButton';
import {
  BuilderState,
  CanvasElementControlButtonsOverlayTypes,
} from '@admin/types';

const CanvasElementControlButtons = ({
  target,
  state,
  handleSelect,
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
          <DuplicateElementButton target={target} state={state} />
        </div>
        <div>
          <EditElementButton target={target} state={state} />
        </div>
        <div>
          <DeleteElementButton target={target} state={state} />
        </div>
      </div>
    </>
  );
};

export default CanvasElementControlButtons;