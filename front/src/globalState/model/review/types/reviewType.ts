import type { IUser } from "../../user/types/userType";

export interface IReview {
    id?: number;
    product_id?: number;
    user_id?: number;
    rating?: number;
    text?: string;
    user?: IUser
}