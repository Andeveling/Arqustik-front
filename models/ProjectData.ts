import { ProtectionEnum, SiliconeEnum } from './Quotation.model';

export class ProjectData {
  private _installation: boolean;
  private _polyurethane: boolean;
  private _transport: boolean;
  private _silicone: boolean = false;
  private _siliconeType: SiliconeEnum;
  private _protection: boolean = false;
  private _protectionType: ProtectionEnum;
  private _unmount: boolean;

  constructor(
    installation: boolean,
    polyurethane: boolean,
    transport: boolean,
    silicone: SiliconeEnum,
    protection: ProtectionEnum,
    unmount: boolean,
  ) {
    this._installation = installation;
    this._polyurethane = polyurethane;
    this._transport = transport;
    this._unmount = unmount;

    if (silicone !== SiliconeEnum.zero) {
      this._silicone = true;
      this._siliconeType = silicone;
    } else {
      this._silicone = false;
      this._siliconeType = SiliconeEnum.zero;
    }
    if (protection !== ProtectionEnum.zero) {
      this._protection = true;
      this._protectionType = protection;
    } else {
      this._protection = false;
      this._protectionType = ProtectionEnum.zero;
    }
  }
  /* Getters */
  get installation() {
    return this._installation;
  }
  get unmount() {
    return this._unmount;
  }
  get polyurethane() {
    return this._polyurethane;
  }
  get transport() {
    return this._transport;
  }
  get silicone() {
    return this._silicone;
  }
  get protection() {
    return this._protection;
  }
  get protectionType() {
    return this._protectionType;
  }
  get siliconeType() {
    return this._siliconeType;
  }
}
