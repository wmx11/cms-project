import { Button } from "@nextui-org/react";
import { SetIsOpen, SetTriggerRef, Target } from "../../../types";
import DefaultTooltip from "../../DefaultTooltip";
import { DATA_LABEL } from "@cms/template-engine/constants/dataAttributes";
import { Edit } from "@cms/ui/components/Icons";

// Opens the editing popover for the selected component
const EditElementButton = ({
  target,
  setTriggerRef,
  setIsOpen,
}: Target & SetTriggerRef & SetIsOpen) => {
  return (
    <DefaultTooltip
      content={`Edit ${target.getAttribute(DATA_LABEL)} component`}
    >
      <Button
        color="secondary"
        variant="light"
        size="sm"
        radius="none"
        startContent={<Edit />}
        onClick={() => {
          setTriggerRef({ current: target });
          setIsOpen(true);
        }}
      >
        Edit
      </Button>
    </DefaultTooltip>
  );
};

export default EditElementButton;
