import { ProjectDataProps } from '@components/WindowsPVC/WindowsPVCForm';
import { QuotationI } from './Quotation.model';
import { SystemsEnum } from './System.model';
import { GlassEnum } from './Glass.model';

export interface WindowI {
  id: number | string;
  price: number;

  title: string;
  system: SystemsEnum;
  model: WindowModelsEnum;
  description: string;
  location?: string;
  width: number;
  height: number;
  glass: GlassEnum;
  type: WindowTypeEnum;
  color: string;
  cant: number;
}

export enum WindowTypeEnum {
  WINDOW = 'window',
  DOOR = 'door',
}

export enum WindowModelsEnum {
  XO = 'XO',
  OX = 'OX',
  XX = 'XX',
  OXXO = 'OXXO',
  XXO = 'XXO',
  OXX = 'OXX',
  XXX = 'XXX',
  '[>]' = '[>]',
  '[<]' = '[<]',
  '[O]' = '[O]',
  '[V]' = '[V]',
  '[O<]' = '[O<]',
  '[>O]' = '[>O]',
  // TODO: añadir modelos
  '[>O<]' = '[>O<]',
  '[><]' = '[><]',
}

export interface CreateWindowFormPVCI extends Omit<WindowI, 'id' | 'price'> {
  jwt?: string;
  projectData: ProjectDataProps;
  quotationID: number | string;
  windowID?: number | string;
  unmount: boolean;
  hours: number;
}

export interface CreateWindowPVCI extends Pick<WindowI, 'title' | 'location' | 'width' | 'height' | 'price'> {
  jwt?: string;
  cost: number;
  profit: number;
  quotation: QuotationI['id'];
  window: WindowI['id'];
}

export interface ClientQuotationResponseI {
  data: ClientData;
}

export interface ClientData {
  id: number;
  attributes: ClientAttributes;
}

export interface ClientAttributes {
  fullName: string;
  cellphone: string;
  address: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface WindowsQuotationResponseI {
  data: WindowsDatum[];
}

export interface WindowsDatum {
  id: number;
  attributes: WindowsAttributes;
}

export interface WindowsAttributes {
  title: string;
  location: string;
  width: number;
  height: number;
  price: number;
  cost: number;
  profit: number;
  cant: number;
  model: WindowModelsEnum;
  color: string;
  glass: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export class WindowPVC {
  private _title: string;
  private _location: string;
  private _width: number;
  private _height: number;
  private _widthMeters: number;
  private _heightMeters: number;
  private _area: number;
  private _perimeter: number;

  constructor(title: string = '', location: string = '', width: number, height: number) {
    this._title = title;
    this._location = location;
    this._width = width;
    this._widthMeters = this.millimeterToMeter(this._width);
    this._height = height;
    this._heightMeters = this.millimeterToMeter(this._height);
    this._area = this.calculateArea();
    this._perimeter = this.calculatePerimeter();
  }

  private calculatePerimeter(): number {
    return this.millimeterToMeter(this._width) * 2 + this.millimeterToMeter(this._height) * 2;
  }

  private calculateArea(): number {
    return this.millimeterToMeter(this._width) * this.millimeterToMeter(this._height);
  }

  private millimeterToMeter(millimeters: number): number {
    return millimeters / 1000;
  }
  /* Getters */
  get title(): string {
    return this._title;
  }
  get location(): string {
    return this._location;
  }
  get width(): number {
    return this._width;
  }
  get height(): number {
    return this._height;
  }
  get area(): number {
    return this._area;
  }
  get perimeter(): number {
    return this._perimeter;
  }
  get widthMeters(): number {
    return this._widthMeters;
  }
  get heightMeters(): number {
    return this._heightMeters;
  }
}
