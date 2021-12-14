import { ItemRequestStatusEnum } from "./enums/ItemRequestStatusEnum";
import { User } from "./user";

export class ItemRequest {
  id: string | undefined;
  userRequested: User | undefined;
  userAccepted: User | undefined;
  itemName: string | undefined;
  quantity: number | undefined;
  deliveryFee: number | undefined;
  image: string | undefined;
  location: string | undefined;
  description: string | undefined;
  status: ItemRequestStatusEnum | undefined;

  constructor(
    id?: string,
    userReqeusted?: User,
    userAccepted?: User,
    itemName?: string,
    quantity?: number,
    deliveryFee?: number,
    image?: string,
    location?: string,
    description?: string,
    status?: ItemRequestStatusEnum
  ) {
    this.id = id;
    this.userRequested = userReqeusted;
    this.userAccepted = userAccepted;
    this.itemName = itemName;
    this.quantity = quantity;
    this.deliveryFee = deliveryFee;
    this.image = image;
    this.location = location;
    this.description = description;
    this.status = status;
  }
}