import { AuthUser, withUser } from '@cms/lib/auth';
import { Unauthenticated } from '@cms/lib/errors';

export const baseController = () => {};

export const authenticatedController = async <T>(
  cb: (user: NonNullable<AuthUser>) => T
) =>
  await withUser(async (user) => {
    if (!user) {
      throw new Unauthenticated();
    }

    return cb(user);
  });
