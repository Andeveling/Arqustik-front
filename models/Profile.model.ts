import { Meta } from './Global.model';

export interface ProfileResponseI {
  data: ProfileI;
  meta: Meta;
}
export interface ProfilesResponseI {
  data: ProfileI[];
  meta: Meta;
}

export interface ProfileI {
  id: number;
  attributes: ProfileAttributes;
}

export interface ProfileAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  title: string;
  id_provider: string;
  price: number;
  type: string;
  title_list: string;
}
