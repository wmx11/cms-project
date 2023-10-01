import { User } from '@nextui-org/user';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Link } from '@nextui-org/react';
import React from 'react';

const AppMenu = () => {
  return (
    <div>
      <div className="border-b p-4">
        <Dropdown>
          <DropdownTrigger>
            <User name="Jane Doe" description="Product Designer" as="button" />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="space-y-8 p-4">
        <div className="flex flex-col space-y-4">
          <span className="font-bold">Brand Forge</span>
          <Link isBlock href="/" color="foreground">
            Dashboard
          </Link>
          <Link isBlock href="#" color="foreground">
            New Website
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <span className="font-bold">Blog Posts</span>
          <Link isBlock href="#" color="foreground">
            View All
          </Link>
          <Link isBlock href="#" color="foreground">
            New Blog Post
          </Link>
        </div>

        <div className="flex flex-col space-y-4">
          <span className="font-bold">Testimonials</span>
          <Link isBlock href="#" color="foreground">
            View All
          </Link>
          <Link isBlock href="#" color="foreground">
            Create New Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppMenu;
