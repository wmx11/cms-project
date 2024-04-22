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
      <div className="bg-background w-full p-4">
        <Tabs defaultValue="styles">
          <TabsList className="sticky top-[0px] z-50 w-full shadow-md [&>*]:flex-1">
            <TabsTrigger value="styles">
              <DesignIcon className={ICON_STYLES} />
              Styles
            </TabsTrigger>
            <TabsTrigger value="layers">
              <LayersIcon className={ICON_STYLES} /> Layers
            </TabsTrigger>
            <TabsTrigger value="settings">
              <LayersIcon className={ICON_STYLES} /> Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="styles">
            <StyleControls />
          </TabsContent>
          <TabsContent value="layers">
            <Layers />
          </TabsContent>
          <TabsContent value="settings">Here will be settings</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default BuilderSidebar;
