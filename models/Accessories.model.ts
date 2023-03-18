import { Meta } from './Global.model';

export interface AccessoryResponseI {
  data: AccessoryI;
  meta: Meta;
}
export interface AccessoriesResponseI {
  data: AccessoryI[];
  meta: Meta;
}

export interface AccessoryI {
  id: number;
  attributes: AccessoryAttributesI;
}

export interface AccessoryAttributesI {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  price: number;
  id_provider: string;
  title: string;
  arqustik_title: string;
}
