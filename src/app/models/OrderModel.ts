import { UserModel } from './UserModel'
import { ItemModel } from './ItemModel';
import { OrderStatusEnum } from '../enums/order-status-enum';

export class OrderModel {
    public date: string;
    public order_id: string;
    public user: UserModel;
    public orderItem: ItemModel[] = [];
    public status: OrderStatusEnum;
    public total: number;
}