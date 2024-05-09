import {
  Cog,
  DesignIcon,
  ICON_STYLES,
  LayersIcon,
} from '@cms/ui/components/Icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@cms/ui/components/Tabs';
import Layers from './site-canvas-controls/layers/Layers';
import StyleControls from './site-canvas-controls/style-controls/StyleControls';
import Settings from './site-canvas-controls/site-settings/Settings';

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
              <Cog className={ICON_STYLES} /> Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="styles">
            <StyleControls />
          </TabsContent>
          <TabsContent value="layers">
            <Layers />
          </TabsContent>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default BuilderSidebar;
