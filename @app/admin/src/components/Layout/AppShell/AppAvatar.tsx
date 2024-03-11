'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@cms/packages/ui/components/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@cms/ui/components/DropdownMenu';
import { ChevronDown, ICON_STYLES, LogOut } from '@cms/ui/components/Icons';
import { UserCog } from 'lucide-react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { FC } from 'react';

interface AppAvatarProps {
  session: Session | null;
}

const AppAvatar: FC<AppAvatarProps> = ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback>{session?.user?.name || ''}</AvatarFallback>
        </Avatar>
        <div className="flex w-full items-center justify-between gap-4">
          <span className="max-w-[150px] truncate text-sm">
            {session?.user?.name || ''}
          </span>
          <ChevronDown className={ICON_STYLES} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserCog className={ICON_STYLES} />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => signOut()}>
            <LogOut className={ICON_STYLES} />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppAvatar;
