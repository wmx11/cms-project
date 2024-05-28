'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import {
  deleteTemplateController,
  DeleteTemplateData,
} from '@cms/controllers/template';
import handleErrorMessages from '@cms/lib/handle-error-messages';
import { revalidatePath } from 'next/cache';

const deleteTemplateAction = async (
  data: DeleteTemplateData & { revalidate?: string }
) => {
  try {
    const template = await deleteTemplateController(data);

    if (data.revalidate) {
      revalidatePath(data.revalidate);
    }

    return {
      data: { ...template },
    } as ActionReturnTypeWithoutError<typeof template>;
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    } as ActionReturnTypeWithError<{ id: string }>;
  }
};

export default deleteTemplateAction;
