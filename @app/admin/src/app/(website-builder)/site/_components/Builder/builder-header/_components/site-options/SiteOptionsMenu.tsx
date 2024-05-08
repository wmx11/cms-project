'use client';
import routes from '@admin/utils/routes';
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
  Folder,
  ICON_STYLES,
  TemplateIcon,
} from '@cms/ui/components/Icons';
import { useRouter } from 'next/navigation';
import DeleteWebsiteAlertButton, {
  DeleteWebsiteButtonContent,
} from '../../../ui/buttons/DeleteWebsiteButton';
import PurgeStylesAlertButton, {
  PurgetStylesButtonContent,
} from '../../../ui/buttons/PurgeStylesButton';
import ThemeSelector from './ThemeSelector';
import SaveTemplate from './SaveTemplate';
import DeleteTemplateAlertButton from '../../../ui/buttons/DeleteTemplateButton';

const SiteOptionsMenu = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="xs" className="group">
          <ChevronDown className="ml-2 h-3 w-3 transition-transform group-hover:translate-y-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push(routes.site.default)}>
            <Folder className={ICON_STYLES} />
            <span>Back to files</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TemplateIcon className={ICON_STYLES} />
              <span>Template</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <SaveTemplate>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Save template
                  </DropdownMenuItem>
                </SaveTemplate>
                <SaveTemplate saveNew>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Save as new template
                  </DropdownMenuItem>
                </SaveTemplate>
                <DeleteTemplateAlertButton>
                  <DropdownMenuItem
                    className="text-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    Delete
                  </DropdownMenuItem>
                </DeleteTemplateAlertButton>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ColorPalette className={ICON_STYLES} />
              <span>Themes</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <ThemeSelector />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
          <PurgeStylesAlertButton>
            <DropdownMenuItem
              className="text-destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <PurgetStylesButtonContent />
            </DropdownMenuItem>
          </PurgeStylesAlertButton>
          <DropdownMenuSeparator />
          <DeleteWebsiteAlertButton>
            <DropdownMenuItem
              className="text-destructive"
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <DeleteWebsiteButtonContent />
            </DropdownMenuItem>
          </DeleteWebsiteAlertButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SiteOptionsMenu;
