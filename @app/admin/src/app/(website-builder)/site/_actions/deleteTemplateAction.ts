'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import {
  deleteTemplateController,
  DeleteTemplateData,
} from '@cms/controllers/template';
import handleErrorMessages from '@cms/lib/handleErrorMessages';

const deleteTemplateAction = async (data: DeleteTemplateData) => {
  try {
    const template = await deleteTemplateController(data);
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
