import { Redo, Undo } from '@cms/ui/components/Icons';
import { Button } from '@nextui-org/button';
import GoBackButton from '../../../../../components/GoBackButton';
import PublishButton from './PublishButton';

const BuilderHeader = () => {
  return (
    <div className="p-2 border-b-1 border-zinc-200 flex justify-between">
      <div>
        <GoBackButton />
      </div>
      <div className="space-x-4">
        <Button
          color="primary"
          size="sm"
          variant="ghost"
          startContent={<Undo />}
        ></Button>
        <Button
          color="primary"
          size="sm"
          variant="ghost"
          startContent={<Redo />}
        ></Button>
      </div>
      <div className="space-x-4">
        <PublishButton />
        <PublishButton />
      </div>
    </div>
  );
};

export default BuilderHeader;
