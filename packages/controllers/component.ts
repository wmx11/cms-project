import { getComponents, getComponentsList } from '@cms/models/component';
import { authenticatedController } from './_controller';

export const getComponentsController = async () =>
  authenticatedController(getComponents);

export type ComponentsList = Awaited<
  ReturnType<typeof getComponentsListController>
>;

export const getComponentsListController = async () =>
  authenticatedController(getComponentsList);
