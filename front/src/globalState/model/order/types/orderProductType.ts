import type { IProduct } from "../../product/types/productType";

export interface IOrderProduct {
    id?: number;
    order_id?: number;
    product_id?: number;
    name?: string,
    quantity?: number;
    price?: number;
    product?: IProduct;
}