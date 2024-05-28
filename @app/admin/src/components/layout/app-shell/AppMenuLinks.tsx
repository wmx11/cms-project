'use client';
import routes from '@admin/utils/routes';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@cms/ui/components/Command';
import { ICON_STYLES, Plus } from '@cms/ui/components/Icons';
import clsx from 'clsx';
import { Home, PanelsTopLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const AppMenuLinks = () => {
  const router = useRouter();
  const pathName = usePathname();

  const links = useMemo(
    () => [
      {
        key: routes.site.default,
        onSelect: () => router.push(routes.site.default),
        label: (
          <>
            <PanelsTopLeft className={ICON_STYLES} />
            <span>My sites</span>
          </>
        ),
      },
      {
        key: routes.site.create,
        onSelect: () => router.push(routes.site.create),
        label: (
          <>
            <Plus className={ICON_STYLES} />
            <span>Create new site</span>
          </>
        ),
      },
    ],
    []
  );

  return (
    <Command className="p-2">
      <CommandList className="overflow-visible">
        <CommandGroup heading="General">
          <CommandItem onSelect={() => router.push('/')}>
            <Home className={ICON_STYLES} />
            <span>Home</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Sites">
          {links.map((item) => (
            <CommandItem
              key={item.key}
              onSelect={item.onSelect}
              className={clsx([item.key === pathName && 'bg-accent'])}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default AppMenuLinks;
