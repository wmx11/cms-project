import { withUser } from '@cms/lib/auth';
import { getComponents } from '@cms/models/component';

export const getComponentsController = async () => {
  return await withUser(async () => {
    return await getComponents();
  });
};
