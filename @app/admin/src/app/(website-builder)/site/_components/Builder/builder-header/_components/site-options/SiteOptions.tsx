'use client';
import { Button } from '@cms/ui/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@cms/ui/components/DropdownMenu';
import {
  ChevronDown,
  ColorPalette,
  ICON_STYLES,
  Trash,
  Warning,
} from '@cms/ui/components/Icons';
import DeleteWebsiteButton from '../../../ui/buttons/DeleteWebsiteButton';
import ThemeSelector from './ThemeSelector';
import { useRouter } from 'next/navigation';
import routes from '@admin/utils/routes';
import PurgeStylesButton from '../../../ui/buttons/PurgeStylesButton';

const SiteOptions = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="xs" className="group">
          <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push(routes.site.default)}>
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
          <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
          <PurgeStylesButton>
            <DropdownMenuItem
              className="text-destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <Warning className={ICON_STYLES} />
              <span>Purge styles</span>
            </DropdownMenuItem>
          </PurgeStylesButton>
          <DropdownMenuSeparator />
          <DeleteWebsiteButton>
            <DropdownMenuItem
              className="text-destructive"
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <Trash className={ICON_STYLES} />
              <span>Delete site</span>
            </DropdownMenuItem>
          </DeleteWebsiteButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SiteOptions;
