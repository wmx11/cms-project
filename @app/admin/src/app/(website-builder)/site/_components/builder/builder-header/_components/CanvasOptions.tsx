'use client';
import useBuilderProviderState from '@admin/hooks/useBuilderProviderState';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@cms/packages/ui/components/DropdownMenu';
import {
  BREAKPOINT_DEFAULT_WIDTH,
  DATA_BUILDER_CANVAS_WRAPPER,
  KEY_CONTROL,
  KEY_TOGGLE_GRID,
  KEY_ZOOM_IN,
  KEY_ZOOM_OUT,
  SCALE_INTENSITY,
  SCALE_MAX,
  SCALE_MIN,
} from '@cms/packages/tiglee-engine/constants';
import { Button } from '@cms/ui/components/Button';
import { ChevronDown, Grid, ICON_STYLES } from '@cms/ui/components/Icons';
import Kbd from '@cms/ui/components/Kbd';
import { KeyboardEvent, useRef } from 'react';
import Input from '../../ui/Input';

const CanvasOptions = () => {
  const canvasScale = useBuilderProviderState((state) => state.canvasScale);
  const showGrid = useBuilderProviderState((state) => state.showGrid);
  const toggleGrid = useBuilderProviderState((state) => state.toggleGrid);
  const setCanvasScale = useBuilderProviderState(
    (state) => state.setCanvasScale
  );

  const ZOOM_50 = 0.5;
  const ZOOM_100 = 1;
  const ZOOM_200 = 2;

  const canvasScalePercentage = Math.floor(canvasScale * 100);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleScaleChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (!inputRef.current) {
      return;
    }

    const parsedValue = parseFloat(inputRef.current.value);

    if (!parsedValue || parsedValue === 0) {
      return;
    }

    setCanvasScale(1, parsedValue / 100);
  };

  const handleZoomToFit = () => {
    const canvasWrapper = document.querySelector(
      `[${DATA_BUILDER_CANVAS_WRAPPER}]`
    );

    if (!canvasWrapper) {
      return;
    }

    const { width } = canvasWrapper.getBoundingClientRect();

    const scaleToFit = width / BREAKPOINT_DEFAULT_WIDTH - SCALE_MIN;

    setCanvasScale(1, scaleToFit);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="xs" className="group w-[70px]">
            {canvasScalePercentage}%{' '}
            <ChevronDown className="ml-2 h-3 w-3 transition-transform group-hover:translate-y-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Input
              type="number"
              label="Canvas scale"
              ref={inputRef}
              defaultValue={canvasScalePercentage}
              min={Math.floor(SCALE_MIN * 100)}
              max={Math.floor(SCALE_MAX * 100)}
              onKeyDown={handleScaleChange}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setCanvasScale(SCALE_INTENSITY);
              }}
            >
              <span>Zoom in</span>
              <DropdownMenuShortcut>
                <Kbd>
                  {KEY_CONTROL}
                  {KEY_ZOOM_IN}
                </Kbd>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setCanvasScale(-SCALE_INTENSITY);
              }}
            >
              <span>Zoom out</span>
              <DropdownMenuShortcut>
                <Kbd>
                  {KEY_CONTROL}
                  {KEY_ZOOM_OUT}
                </Kbd>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleZoomToFit}>
              Zoom to fit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCanvasScale(1, ZOOM_50)}>
              Zoom to 50%
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCanvasScale(1, ZOOM_100)}>
              Zoom to 100%
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCanvasScale(1, ZOOM_200)}>
              Zoom to 200%
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={toggleGrid}
            >
              <Grid className={ICON_STYLES} />
              <span>Show Grid</span>
              <DropdownMenuShortcut>
                <Kbd>
                  {KEY_CONTROL}
                  {KEY_TOGGLE_GRID}
                </Kbd>
              </DropdownMenuShortcut>
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CanvasOptions;
