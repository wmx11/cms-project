'use server';
import {
  ActionReturnTypeWithError,
  ActionReturnTypeWithoutError,
} from '@admin/types';
import {
  saveTemplateController,
  SaveTemplateData,
} from '@cms/controllers/template';
import handleErrorMessages from '@cms/lib/handle-error-messages';

const saveTemplateAction = async (
  data: Omit<SaveTemplateData, 'componentId'>
) => {
  try {
    const template = await saveTemplateController(data);
    return {
      data: { ...template },
    } as ActionReturnTypeWithoutError<typeof template>;
  } catch (error) {
    return {
      ...handleErrorMessages(error),
    } as ActionReturnTypeWithError<{ id: string }>;
  }
};

export default saveTemplateAction;
