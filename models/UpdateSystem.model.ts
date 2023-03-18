import { Meta } from './Global.model';

export interface UpdateSystemResponseI {
  data: UpdateSystemI;
  meta: Meta;
}

export interface UpdateSystemI {
  id: number;
  attributes: UpdateSystemAttributes;
}

export interface UpdateSystemAttributes {
  update: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
