'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import { createSiteController } from '@cms/controllers/site';
import handleErrorMessages from '@cms/lib/handle-error-messages';

interface Props {
  alias: string;
  title: string;
  description: string;
  componentId: string;
  templateId?: string;
}

const createSiteAction = async (data: Props) => {
  try {
    const site = await createSiteController(data);
    return { data: { ...site } } as ActionReturnTypeWithoutError<typeof site>;
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    } as ActionReturnTypeWithError<Props>;
  }
};

export default createSiteAction;