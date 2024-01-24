import { DesignIcon, ICON_STYLES, LayersIcon } from '@cms/ui/components/Icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@cms/ui/components/Tabs';
import Layers from './canvas-controls/Layers';
import PurgeStylesButton from './canvas-controls/PurgeStylesButton';
import StyleControls from './canvas-controls/StyleControls';

const BuilderSidebar = () => {
  return (
    <>
      <div className="bg-background p-4 w-full">
        <Tabs defaultValue="styles">
          <TabsList className="[&>*]:flex-1 w-full sticky z-50 shadow-md top-[0px]">
            <TabsTrigger value="styles">
              <DesignIcon className={ICON_STYLES} />
              Styles
            </TabsTrigger>
            <TabsTrigger value="layers">
              <LayersIcon className={ICON_STYLES} /> Layers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="styles">
            <StyleControls />
            <div className="flex [&>*]:flex-1">
              <PurgeStylesButton />
            </div>
          </TabsContent>
          <TabsContent value="layers">
            <Layers />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default BuilderSidebar;
