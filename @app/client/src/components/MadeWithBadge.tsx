import { Badge } from '@cms/ui/components/Badge';
import TigleeLogo from '@cms/assets/tiglee-logo.png';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const MadeWithBadge = () => {
  return (
    <Link href="https://tiglee.io" target="_blank">
      <Badge className="flex gap-2 bg-gradient-to-r from-violet-600 to-purple-500">
        <Image src={TigleeLogo} width={15} alt="Tiglee logo" />
        <span>Made in Tiglee</span>
      </Badge>
    </Link>
  );
};

export default MadeWithBadge;
