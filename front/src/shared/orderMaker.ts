import type { IOrderProduct } from "@/globalState/model/order/types/orderProductType";
import type { IOrder } from "@/globalState/model/order/types/orderType";
import type { IProduct } from "@/globalState/model/product/types/productType";
import type { IUser } from "@/globalState/model/user/types/userType";

export function OrderMaker(product: IProduct, quantity = 1): IOrderProduct {
    return {
        product_id: product.id,
        price: product.price,
        quantity: quantity,
        name: product.title
    }
}