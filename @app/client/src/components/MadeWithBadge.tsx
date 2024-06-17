import TigleeLogo from '@cms/assets/tiglee-logo.png';
import { PROJECT_URL } from '@cms/tiglee-engine/constants';
import { Badge } from '@cms/ui/components/Badge';
import Image from 'next/image';
import Link from 'next/link';

const MadeWithBadge = () => {
  return (
    <Link href={`https://${PROJECT_URL}`} target="_blank">
      <Badge className="flex gap-2 bg-gradient-to-r from-violet-600 to-purple-500">
        <Image src={TigleeLogo} width={15} alt="Tiglee logo" />
        <span>Made in Tiglee</span>
      </Badge>
    </Link>
  );
};

export default MadeWithBadge;
