import type { IProductImage } from "./productImageType";

export interface IProduct {
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    stock?: number;
    description_short?: string;
    is_discount?: boolean;
    images: IProductImage[]
}