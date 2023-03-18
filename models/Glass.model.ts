import { Meta } from './Global.model';

export interface GlassResponseI {
  data: GlassI;
  meta: Meta;
}

export interface GlassesResponseI {
  data: GlassI[];
  meta: Meta;
}

export interface GlassI {
  id: number;
  attributes: GlassAttributes;
}

export interface GlassAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  id_arqustik: GlassEnum;
  title: string;
  price: number;
  caliber: number;
}

export enum GlassEnum {
  '8mmLI',
  '4mmCI',
  '5mmTI',
}

export class Glass {
  private _costGlass: GlassI['attributes']['price'] = 0;
  private _title: GlassI['attributes']['title'] = '';

  constructor(glasses: GlassI[], glassRef: GlassEnum) {
    for (const glass of glasses) {
      const {
        attributes: { id_arqustik, title, price },
      } = glass;
      if (id_arqustik === glassRef) {
        this._title = title;
        this._costGlass = price;
      }
    }
  }

  get costGlass() {
    return this._costGlass;
  }
  get title() {
    return this._title;
  }
}
