'use client';
import TigleeLogo from '@admin/assets/tiglee-logo.png';
import routes from '@admin/utils/routes';
import { Button } from '@cms/ui/components/Button';
import {
  DropdownMenuBuilder,
  MenuProps,
} from '@cms/ui/components/DropdownMenu';
import {
  ChevronDown,
  ColorPalette,
  Folder,
  ICON_STYLES,
  TemplateIcon,
} from '@cms/ui/components/Icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import DeleteWebsiteAlertButton, {
  DeleteWebsiteButtonContent,
} from '../../../ui/buttons/DeleteWebsiteButton';
import PurgeStylesAlertButton, {
  PurgetStylesButtonContent,
} from '../../../ui/buttons/PurgeStylesButton';
import ComponentSetSelector from './ComponentSetSelector';
import SaveTemplate from './SaveTemplate';
import ThemeSelector from './ThemeSelector';

const SiteOptionsMenu = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();

  const adminMenu = useMemo<MenuProps[]>(() => {
    if (!session?.user.is_admin) {
      return [];
    }

    return [
      {
        trigger: (
          <>
            <TemplateIcon className={ICON_STYLES} />
            <span>Template</span>
          </>
        ),
        submenu: [
          {
            items: [
              {
                item: 'Save template',
                wrapper: <SaveTemplate />,
                onSelect: (e) => e.preventDefault(),
              },
              {
                item: 'Save as new template',
                wrapper: <SaveTemplate saveNew />,
                onSelect: (e) => e.preventDefault(),
              },
            ],
          },
        ],
      },
    ];
  }, [session]);

  const menu = useMemo<MenuProps[]>(() => {
    return [
      {
        items: [
          {
            item: (
              <>
                <Folder className={ICON_STYLES} />
                <span>Back to files</span>
              </>
            ),
            onSelect: () => router.push(routes.site.default),
          },
        ],
      },
      ...adminMenu,
      {
        trigger: (
          <>
            <ColorPalette className={ICON_STYLES} />
            <span>Themes</span>
          </>
        ),
        submenu: [
          {
            element: <ThemeSelector />,
          },
        ],
      },
      {
        trigger: 'Component set',
        submenu: [
          {
            element: <ComponentSetSelector />,
          },
        ],
      },
      {
        label: 'Danger zone',
        items: [
          {
            item: <PurgetStylesButtonContent />,
            wrapper: <PurgeStylesAlertButton />,
            onSelect: (e) => e.preventDefault(),
          },
          {
            item: <DeleteWebsiteButtonContent />,
            wrapper: <DeleteWebsiteAlertButton siteId={params.id} />,
            onSelect: (e) => e.preventDefault(),
          },
        ],
      },
    ];
  }, [session]);

  return (
    <DropdownMenuBuilder menu={menu} triggerAsChild>
      <Button size="xs" variant="ghost" className="group">
        <Image src={TigleeLogo} alt="Menu tiglee logo" width={20} height={20} />
        <ChevronDown className="ml-2 h-3 w-3 transition-transform group-hover:translate-y-1" />
      </Button>
    </DropdownMenuBuilder>
  );
};

export default SiteOptionsMenu;
