import { Link } from '@nextui-org/react';
import React from 'react';

const AppMenu = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <span className="font-bold">BrandForge</span>
        <Link isBlock href="#" color="foreground">
          Dashboard
        </Link>
        <Link isBlock href="#" color="foreground">
          Create New Website
        </Link>
      </div>
      <div className="flex flex-col space-y-4">
        <span className="font-bold">Blog</span>
        <Link isBlock href="#" color="foreground">
          Dashboard
        </Link>
        <Link isBlock href="#" color="foreground">
          Create New Website
        </Link>
      </div>

      <div className="flex flex-col space-y-4">
        <span className="font-bold">Testimonials</span>
        <Link isBlock href="#" color="foreground">
          Dashboard
        </Link>
        <Link isBlock href="#" color="foreground">
          Create New Website
        </Link>
      </div>
    </div>
  );
};

export default AppMenu;
