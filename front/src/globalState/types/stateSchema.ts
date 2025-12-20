import type { IOrder } from "../model/order/types/orderType";
import type { IProduct } from "../model/product/types/productType";
import type { IUser } from "../model/user/types/userType";

export interface StateSchema {
  user: Partial<IUser>;
  product: Partial<IProduct[]>;
  order: Partial<IOrder>;
}
