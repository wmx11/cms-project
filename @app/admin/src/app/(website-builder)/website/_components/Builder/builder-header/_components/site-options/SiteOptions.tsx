'use client';
import { Button } from '@cms/ui/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@cms/ui/components/DropdownMenu';
import {
  ArrowLeft,
  ChevronDown,
  ColorPalette,
  ICON_STYLES,
  Trash,
} from '@cms/ui/components/Icons';
import PurgeStylesButton from '../../../canvas-controls/PurgeStylesButton';
import ThemeSelector from './ThemeSelector';
import { useRouter } from 'next/navigation';

const SiteOptions = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="xs" className="group">
          <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.back()}>
            <ArrowLeft className={ICON_STYLES} />
            <span>Back to files</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ColorPalette className={ICON_STYLES} />
              <span>Themes</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-56">
                <ThemeSelector />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <PurgeStylesButton />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash className={ICON_STYLES} />
            <span>Delete site</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SiteOptions;
