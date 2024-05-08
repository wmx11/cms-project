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
import { Home, PanelsTopLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AppMenuLinks = () => {
  const router = useRouter();

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
          <CommandItem onSelect={() => router.push(routes.site.default)}>
            <PanelsTopLeft className={ICON_STYLES} />
            <span>My sites</span>
          </CommandItem>
          <CommandItem onSelect={() => router.push(routes.site.create)}>
            <Plus className={ICON_STYLES} />
            <span>Create new site</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default AppMenuLinks;
