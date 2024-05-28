import { getComponents } from '@cms/models/component';
import { authenticatedController } from './_controller';

export const getComponentsController = async () =>
  authenticatedController(getComponents);
