import DeleteTemplateAlertButton, {
  DeleteTemplateButtonContent,
} from '@admin/app/(website-builder)/site/_components/Builder/ui/buttons/DeleteTemplateButton';
import { MenuProps } from '@cms/ui/components/DropdownMenu';

interface Props {
  templateId?: string;
}

const cardOptionsMenu = ({ templateId }: Props) => {
  const menu: MenuProps[] = [
    {
      items: [
        { item: 'Open', onSelect: () => {} },
        { item: 'Open in new tab', onSelect: () => {} },
      ],
    },
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

  return menu;
};

export default cardOptionsMenu;
