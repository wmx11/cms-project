import DeleteTemplateAlertButton, {
  DeleteTemplateButtonContent,
} from '@admin/app/(website-builder)/site/_components/Builder/ui/buttons/DeleteTemplateButton';
import DeleteWebsiteAlertButton, {
  DeleteWebsiteButtonContent,
} from '@admin/app/(website-builder)/site/_components/Builder/ui/buttons/DeleteWebsiteButton';
import { MenuProps } from '@cms/ui/components/DropdownMenu';
import { RefObject } from 'react';

const generalOptions = (): MenuProps[] => {
  return [
    {
      items: [
        {
          item: 'Open',
        },
        { item: 'Open in new tab' },
      ],
    },
  ];
};

export const templateCardOptions = ({
  templateId,
}: {
  templateId?: string;
}): MenuProps[] => {
  return [
    {
      items: [
        {
          item: <DeleteTemplateButtonContent />,
          wrapper: <DeleteTemplateAlertButton templateId={templateId} />,
          onSelect: (e) => e.preventDefault(),
        },
      ],
    },
  ];
};

interface SiteCardOptions {
  siteId: string;
  cardRef: RefObject<'div'>;
}

export const siteCardOptions = ({
  siteId,
  cardRef,
}: SiteCardOptions): MenuProps[] => {
  return [
    ...generalOptions(),
    {
      items: [
        {
          item: <DeleteWebsiteButtonContent />,
          wrapper: <DeleteWebsiteAlertButton siteId={siteId} />,
          onSelect: (e) => e.preventDefault(),
        },
      ],
    },
  ];
};
