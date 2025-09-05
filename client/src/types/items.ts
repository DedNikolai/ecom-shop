export type ItemsType = {
  id: string;
  title: string
  price: number
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateItemDto = Omit<ItemsType, 'id' | 'createdAt' | 'updatedAt'>