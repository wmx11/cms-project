import { DATA_ACCEPTS_CHILDREN } from '@cms/template-engine/constants/dataAttributes';
import { CanvasElementControlButtonsOverlayTypes } from '../../../types';
import AddElementButton from '../Controls/AddElementButton';
import DeleteElementButton from '../Controls/DeleteElementButton';
import EditElementButton from '../Controls/EditElementButton';
import ElementInfoButton from '../Controls/ElementInfoButton';
import TurnIntoButton from '../Controls/TurnIntoButton';

// Selected component buttons that appear whenever you select a component
const CanvasElementControlButtons = ({
  target,
  templateComponents,
  setIsOpen,
  handleSelect,
  setTriggerRef,
}: CanvasElementControlButtonsOverlayTypes) => {
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
              templateComponents={templateComponents}
            />
          </div>
        )}
        <div>
          <TurnIntoButton target={target} />
        </div>
        <div>
          <EditElementButton
            target={target}
            setIsOpen={setIsOpen}
            setTriggerRef={setTriggerRef}
          />
        </div>
        <div>
          <DeleteElementButton target={target} />
        </div>
      </div>
    </>
  );
};

export default CanvasElementControlButtons;
