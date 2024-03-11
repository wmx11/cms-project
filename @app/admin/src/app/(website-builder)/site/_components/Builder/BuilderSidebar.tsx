import { DesignIcon, ICON_STYLES, LayersIcon } from '@cms/ui/components/Icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@cms/ui/components/Tabs';
import Layers from './canvas-controls/layers/Layers';
import StyleControls from './canvas-controls/style-controls/StyleControls';

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
