import type { IOrderProduct } from "./orderProductType";

export interface IOrder {
    id?: number;
    user_id?: number;
    total?: number;
    is_payed?: boolean;
    products: IOrderProduct[]
}