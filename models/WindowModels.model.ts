import { Meta } from './Global.model';
import { SystemsEnum } from './System.model';
import { WindowModelsEnum } from './WindowPVC.model';

export interface WindowModelsResponseI {
  data: WindowsModelResponseI[];
  meta: Meta;
}

export interface WindowsModelResponseI {
  id: number;
  attributes: WindowsModelAttributesI;
}

export interface WindowsModelAttributesI {
  title: string;
  type: WindowType;
  opening: WindowModelsEnum;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  windowdoor: WindowDoor;
  model3D: string;
  system: SystemsEnum;
  hours: number;
  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
}

export enum WindowType {
  Sliding = 'sliding',
}

export enum WindowDoor {
  Door = 'door',
  Window = 'window',
}

export class WindowModel {
  model: WindowModelsEnum;
  hours: number = 2;
  constructor(model: WindowModelsEnum, windowsModels: WindowModelsResponseI) {
    this.model = model;
    for (const modelW of windowsModels.data) {
      if (modelW.attributes.opening === model) {
        this.hours = modelW.attributes.hours;
      }
    }
  }
}
