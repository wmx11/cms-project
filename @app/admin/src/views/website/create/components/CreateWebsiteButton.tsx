'use client';
import { PROJECT_DEFAULT_URL } from '@cms/config/constants';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import slugify from 'slugify';
import createWebsiteAction from '../../../../app/(website-builder)/website/_actions/createWebsiteAction';
import useErrorMessage from '../../../../hooks/useErrorMessage';
import routes from '../../../../utils/routes';

type Props = {
  templateId: string;
};

const CreateWebsiteButton = ({ templateId }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { errorMessage, handleErrorMessage } = useErrorMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [alias, setAlias] = useState('');
  const router = useRouter();

  const handleCreateWebsite = async () => {
    setIsLoading(true);

    try {
      const website = await createWebsiteAction({
        templateId,
        alias,
      });

      handleErrorMessage(website?.error);

      // We cannot use redirect() in this server action because redirect() does not work between different route groups and layouts
      // Hence why we use useRouter on the client side instead
      if (!website.error) {
        return router.push(routes.website.edit.replace('$id', website.id));
      }

      setIsLoading(false);
    } catch (error) {
      handleErrorMessage(error?.toString() as string);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen} fullWidth>
        Use Template
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new website
              </ModalHeader>
              <ModalBody>
                <div>
                  https://{slugify(alias) || '...'}.{PROJECT_DEFAULT_URL}
                </div>
                <Input
                  autoFocus
                  label="Website name"
                  placeholder="Enter your website name"
                  variant="bordered"
                  description="The website name will be used to identifty and access it. Example: my-new-website."
                  value={alias}
                  onValueChange={setAlias}
                  errorMessage={errorMessage}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  isLoading={isLoading}
                  onPress={handleCreateWebsite}
                >
                  Create Website
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateWebsiteButton;
