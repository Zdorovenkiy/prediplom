// import type { IMatchInfo } from '@entities/match';
// import type { IListeners } from '@entities/listeners';
// import type { ITimer } from '@/entities/timer';

import type { IUser } from "../model/user/types/userType";

export interface StateSchema {
  user: Partial<IUser>;
}
