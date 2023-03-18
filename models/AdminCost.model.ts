import { Meta } from './Global.model';

export interface AdminCostResponseI {
  data: AdminCostI[];
  meta: Meta;
}

export interface AdminCostI {
  id: number;
  attributes: AdminCostAttributesI;
}

export interface AdminCostAttributesI {
  title: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export class AdminCost {
  private _mod: number = 0;
  private _cif: number = 0;
  private _profit: number = 0;
  // Este valor tendra que salir de aqui ya que no es un coste administrativo
  private _dollar: number = 0;

  // private _hours: number;

  constructor(adminCost: AdminCostI[]) {
    for (const ac of adminCost) {
      const {
        attributes: { title, value },
      } = ac;
      if (title === 'MOD') this._mod = value;
      if (title === 'CIF') this._cif = value;
      if (title === 'dollar') this._dollar = value;
      if (title === 'profit') this._profit = value;
    }
  }

  get mod() {
    return this._mod;
  }
  get cif() {
    return this._cif;
  }
  get profit() {
    return this._profit;
  }
  get dollar() {
    return this._dollar;
  }
}
