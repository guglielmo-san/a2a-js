import { Request } from 'express';
<<<<<<< HEAD
import { UnauthenticatedUser, User } from '../authentication/user.js';

export type UserBuilder = (req: Request) => Promise<User>;

export const UserBuilder = {
  NoAuthentication: () => Promise.resolve(new UnauthenticatedUser()),
};
=======
import { User } from '../authentication/user.js';

export type UserBuilder = (req: Request) => Promise<User>;
>>>>>>> 6fbf682 (feat: support authentication on server side (#195))
