// import type { IMatchInfo } from '@entities/match';
// import type { IListeners } from '@entities/listeners';
// import type { ITimer } from '@/entities/timer';

import type { IOrder } from "../model/order/types/orderType";
import type { IProduct } from "../model/product/types/productType";
import type { IUser } from "../model/user/types/userType";

export interface StateSchema {
  user: Partial<IUser>;
  product: Partial<IProduct[]>;
  order: Partial<IOrder>;
}
