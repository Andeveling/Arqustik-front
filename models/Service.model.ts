import { Meta } from './Global.model';
import { ProjectData } from './ProjectData';
import { ProtectionEnum, SiliconeEnum } from './Quotation.model';
import { WindowPVC } from './WindowPVC.model';

export interface ServicesResponseI {
  data: ServiceI[];
  meta: Meta;
}

export interface ServiceI {
  id: number;
  attributes: ServiceAttributes;
}

export interface ServiceAttributes {
  title: string;
  price: number;
  material: number;
  description: string;
  UOM: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export class Service {
  projectData: ProjectData;
  costInstallation: number = 0;
  costUnmount: number = 0;
  costProtection: number = 0;
  costSilicone: number = 0;
  costPolyurethane: number = 0;

  constructor(projectData: ProjectData, services: ServiceI[]) {
    this.projectData = projectData;

    for (const service of services) {
      const {
        attributes: { title, price, material },
      } = service;

      if (projectData.installation) {
        if (title === 'installation') this.costInstallation = price + material;
      }

      if (projectData.protection) {
        switch (projectData.protectionType) {
          case ProtectionEnum.one:
            if (title === 'protection1') this.costProtection = material + price;
            break;
          case ProtectionEnum.two:
            if (title === 'protection2') this.costProtection = material + price;
            break;
        }
      }

      if (projectData.silicone) {
        switch (projectData.siliconeType) {
          case SiliconeEnum.one:
            if (title === 'silicone1') this.costSilicone = material + price;
            break;
          case SiliconeEnum.two:
            if (title === 'silicone2') this.costSilicone = material + price;
            break;
        }
      }

      if (projectData.polyurethane) {
        if (title === 'polyurethane') this.costPolyurethane = material + price;
      }
      if (projectData.unmount) {
        if (title === 'unmount') this.costUnmount = material + price;
      }
    }
  }
}
