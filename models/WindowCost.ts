import { AccessoryI } from './Accessories.model';
import { AdminCost } from './AdminCost.model';
import { Glass } from './Glass.model';
import { ProfileI } from './Profile.model';
import { Service } from './Service.model';
import { WindowModelsEnum, WindowPVC, WindowTypeEnum } from './WindowPVC.model';

export class WindowCost {
  pvc = {
    frame: 0,
    sash: 0,
    transom: 0,
    glazing_bead: 0,
  };
  ref = {
    frame: 0,
    sash: 0,
    transom: 0,
  };
  accessories = {
    handle: 0,
    cremone: 0,
    striker: 0,
    hinge: 0,
  };
  glasses = {
    sash: 0,
    frame: 0,
  };
  adminCost = {
    MOD: 0,
    CIF: 0,
    profit: 0,
  };
  services = {
    installation: 0,
    protection: 0,
    silicone: 0,
    polyurethane: 0,
    transport: 0,
    dismount: 0,
  };
  material = {
    installation: 0,
    protection: 0,
    silicone: 0,
    polyurethane: 0,
  };
  price = 0;
  COP = 0;
  priceWithProfit = 0;
  dollar = 0;

  description = 'Ventana Europea';
  glass = '';
  costWindow = 0;
  profitWindow = 0;

  constructor() {}

  setCost(
    type: WindowTypeEnum,
    model: WindowModelsEnum,
    profiles: ProfileI[],
    accessories: AccessoryI[],
    window: WindowPVC,
    glass: Glass,
    services: Service,
    hours: number,
    adminCost: AdminCost,
  ) {
    this.glass = glass.title;
    this.adminCost.CIF = adminCost.cif * hours;
    this.adminCost.MOD = adminCost.mod * hours;
    this.adminCost.profit = adminCost.profit;
    this.dollar = adminCost.dollar;

    switch (type) {
      case WindowTypeEnum.WINDOW:
        switch (model) {
          case WindowModelsEnum['[<]']:
          case WindowModelsEnum['[>]']:
            const costModel = {
              // Profiles
              frame: 0,
              rFrame: 0,
              sash: 0,
              rSash: 0,
              glazing_bead: 0,
              rTransom: 0,
              // Accessories
              handle: 0,
              cremone: 0,
              striker: 0,
              hinge: 0,
              // Glass
              glass: 0,
            };

            for (const profile of profiles) {
              const {
                attributes: { id_provider, price },
              } = profile;
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModel.frame += price;
              // Hoja
              if (id_provider === '12310') costModel.sash += price;
              // pisavidrio
              if (id_provider === '12342') costModel.glazing_bead += price;
              // Ref Marco
              if (id_provider === '12070') costModel.rFrame += price;
              // Ref Hoja
              if (id_provider === '13088') costModel.rSash += price;
            }

            for (const accessory of accessories) {
              // Manija
              if (accessory.attributes.id_provider === '12873') costModel.handle += accessory.attributes.price;
              // Cremona
              if (accessory.attributes.id_provider === '13383') costModel.cremone += accessory.attributes.price;
              // Cerraderos
              if (accessory.attributes.id_provider === '12813') costModel.striker += accessory.attributes.price;
              // Bisagras
              if (accessory.attributes.id_provider === '13180') costModel.hinge += accessory.attributes.price;
            }

            costModel.glass += glass.costGlass;

            // PVC
            this.pvc = {
              frame: costModel.frame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModel.sash * ((window.widthMeters - 0.062 + window.heightMeters - 0.062) * 2),
              glazing_bead: costModel.glazing_bead * ((window.widthMeters - 0.194 + window.heightMeters - 0.194) * 2),
              transom: 0,
            };
            // Refuerzos
            this.ref = {
              frame: costModel.rFrame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModel.rSash * ((window.widthMeters + window.heightMeters) * 2),
              transom: 0,
            };
            // Accesorios
            this.accessories = {
              handle: costModel.handle,
              cremone: costModel.cremone,
              striker: costModel.striker * 3,
              hinge: costModel.hinge * 2,
            };
            // Vidrios
            this.glasses = {
              sash: (window.widthMeters - 0.194) * (window.heightMeters - 0.194) * costModel.glass,
              frame: 0,
            };

            break;
          case WindowModelsEnum['[>O]']:
          case WindowModelsEnum['[O<]']:
            const costModelOV = {
              // Profiles
              frame: 0,
              rFrame: 0,
              sash: 0,
              rSash: 0,
              transom: 0,
              rTransom: 0,

              glazing_bead: 0,

              // Accesories
              handle: 0,
              cremone: 0,
              striker: 0,
              hinge: 0,
              // Glass
              glass: 0,
            };

            for (const profile of profiles) {
              const {
                attributes: { id_provider, price },
              } = profile;
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModelOV.frame += price;
              // Divisor
              if (id_provider === '12320') costModelOV.transom += price;
              // Hoja
              if (id_provider === '12310') costModelOV.sash += price;
              // pisavidrio
              if (id_provider === '12342') costModelOV.glazing_bead += price;
              // Ref Marco
              if (id_provider === '12070') costModelOV.rFrame += price;
              // Ref Hoja
              if (id_provider === '13088') costModelOV.rSash += price;
              // Ref Divisor
              if (id_provider === '13088') costModelOV.rTransom += price;
            }

            for (const accessory of accessories) {
              // Manija
              if (accessory.attributes.id_provider === '12873') costModelOV.handle += accessory.attributes.price;
              // Cremona
              if (accessory.attributes.id_provider === '13383') costModelOV.cremone += accessory.attributes.price;
              // Cerraderos
              if (accessory.attributes.id_provider === '12813') costModelOV.striker += accessory.attributes.price;
              // Bisagras
              if (accessory.attributes.id_provider === '13180') costModelOV.hinge += accessory.attributes.price;
            }

            // console.log({ model: costModelOV });
            costModelOV.glass += glass.costGlass;
            // PVC
            this.pvc = {
              frame: costModelOV.frame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModelOV.sash * ((window.widthMeters / 2 - 0.062 + window.heightMeters - 0.062) * 2),
              glazing_bead:
                costModelOV.glazing_bead * ((window.widthMeters - 0.194 + (window.heightMeters - 0.194) * 2) * 2),
              transom: costModelOV.transom * window.heightMeters - 0.12,
            };
            // Refuerzos
            this.ref = {
              frame: costModelOV.rFrame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModelOV.rSash * ((window.widthMeters + window.heightMeters) * 2),
              transom: costModelOV.rTransom * window.heightMeters,
            };
            // Accesorios
            this.accessories = {
              handle: costModelOV.handle,
              cremone: costModelOV.cremone,
              striker: costModelOV.striker * 3,
              hinge: costModelOV.hinge * 2,
            };
            // Vidrios
            this.glasses = {
              sash: (window.widthMeters / 2 - 0.194) * (window.heightMeters - 0.194) * costModelOV.glass,
              frame: (window.widthMeters / 2 - 0.124) * (window.heightMeters - 0.194) * costModelOV.glass,
            };
            break;
          case WindowModelsEnum['[O]']:
            const costModelO = {
              // Profiles
              frame: 0,
              rFrame: 0,
              glazing_bead: 0,

              // Accesories
              handle: 0,
              cremone: 0,
              striker: 0,
              hinge: 0,
              // Glass
              glass: 0,
            };

            for (const profile of profiles) {
              const {
                attributes: { id_provider, price },
              } = profile;
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModelO.frame += price;
              // pisavidrio
              if (id_provider === '12342') costModelO.glazing_bead += price;
              // Ref Marco
              if (id_provider === '12070') costModelO.rFrame += price;
            }

            costModelO.glass += glass.costGlass;
            // console.log({ model: costModelO });

            // PVC
            this.pvc = {
              frame: costModelO.frame * ((window.widthMeters + window.heightMeters) * 2),
              glazing_bead: costModelO.glazing_bead * ((window.widthMeters - 0.194 + window.heightMeters - 0.194) * 2),
              sash: 0,
              transom: 0,
            };
            // Refuerzos
            this.ref = {
              frame: costModelO.rFrame * ((window.widthMeters + window.heightMeters) * 2),
              sash: 0,
              transom: 0,
            };
            // Accesorios
            this.accessories = {
              handle: costModelO.handle,
              cremone: costModelO.cremone,
              striker: costModelO.striker * 3,
              hinge: costModelO.hinge * 2,
            };
            // Vidrios
            this.glasses = {
              sash: 0,
              frame: (window.widthMeters - 0.194) * (window.heightMeters - 0.194) * costModelO.glass,
            };
            break;
          case WindowModelsEnum['[V]']:
            const costModelV = {
              // Profiles
              frame: 0,
              rFrame: 0,
              sash: 0,
              rSash: 0,
              glazing_bead: 0,

              // Accessories
              handle: 0,
              cremone: 0,
              striker: 0,
              hinge: 0,
              // Glass
              glass: 0,
            };

            for (const profile of profiles) {
              const {
                attributes: { id_provider, price },
              } = profile;
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModelV.frame += price;
              // Hoja
              if (id_provider === '12316') costModelV.sash += price;
              // pisavidrio
              if (id_provider === '12342') costModelV.glazing_bead += price;
              // Ref Marco
              if (id_provider === '12070') costModelV.rFrame += price;
              // Ref Hoja
              if (id_provider === '13094') costModelV.rSash += price;
            }

            for (const accessory of accessories) {
              // Manija
              if (accessory.attributes.id_provider === '13508') costModelV.handle += accessory.attributes.price;
              // Cremona
              if (window.width > 0 && window.width <= 400) {
                if (accessory.attributes.id_provider === '13373') costModelV.cremone += accessory.attributes.price;
              } else if (window.width > 400 && window.width <= 800) {
                if (accessory.attributes.id_provider === '13375') costModelV.cremone += accessory.attributes.price;
              } else if (window.width > 800) {
                if (accessory.attributes.id_provider === '13377') costModelV.cremone += accessory.attributes.price;
              }
              // Cerraderos
              if (accessory.attributes.id_provider === '12874') costModelV.striker += accessory.attributes.price;
              // Brazos
              if (window.height > 0 && window.height <= 500) {
                if (accessory.attributes.id_provider === '13526') costModelV.hinge += accessory.attributes.price;
              } else if (window.height > 500 && window.height <= 1000) {
                if (accessory.attributes.id_provider === '13523') costModelV.hinge += accessory.attributes.price;
              } else if (window.height > 1000) {
                if (accessory.attributes.id_provider === '13525') costModelV.hinge += accessory.attributes.price;
              }
            }

            costModelV.glass += glass.costGlass;

            // console.log({ model: costModelV });

            // PVC
            this.pvc = {
              frame: costModelV.frame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModelV.sash * ((window.widthMeters - 0.062 + window.heightMeters - 0.062) * 2),
              glazing_bead: costModelV.glazing_bead * ((window.widthMeters - 0.194 + window.heightMeters - 0.194) * 2),
              transom: 0,
            };
            // Refuerzos
            this.ref = {
              frame: costModelV.rFrame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModelV.rSash * ((window.widthMeters + window.heightMeters) * 2),
              transom: 0,
            };
            // Accesorios
            this.accessories = {
              handle: costModelV.handle,
              cremone: costModelV.cremone,
              striker: costModelV.striker * 3,
              hinge: costModelV.hinge,
            };
            // Vidrios
            this.glasses = {
              sash: (window.widthMeters - 0.194) * (window.heightMeters - 0.194) * costModelV.glass,
              frame: 0,
            };

            break;
          case WindowModelsEnum['[>O<]']:
            const costModelVOV = {
              // Profiles
              frame: 0,
              rFrame: 0,
              sash: 0,
              rSash: 0,
              transom: 0,
              rTransom: 0,

              glazing_bead: 0,

              // Accessories
              handle: 0,
              cremone: 0,
              striker: 0,
              hinge: 0,
              // Glass
              glass: 0,
            };

            for (const profile of profiles) {
              const {
                attributes: { id_provider, price },
              } = profile;
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModelVOV.frame += price;
              // Divisor
              if (id_provider === '12320') costModelVOV.transom += price;
              // Hoja
              if (id_provider === '12310') costModelVOV.sash += price;
              // pisavidrio
              if (id_provider === '12342') costModelVOV.glazing_bead += price;
              // Ref Marco
              if (id_provider === '12070') costModelVOV.rFrame += price;
              // Ref Hoja
              if (id_provider === '13088') costModelVOV.rSash += price;
              // Ref Divisor
              if (id_provider === '13088') costModelVOV.rTransom += price;
            }

            for (const accessory of accessories) {
              // Manija
              if (accessory.attributes.id_provider === '12873') costModelVOV.handle += accessory.attributes.price;
              // Cremona
              if (accessory.attributes.id_provider === '13383') costModelVOV.cremone += accessory.attributes.price;
              // Cerraderos
              if (accessory.attributes.id_provider === '12813') costModelVOV.striker += accessory.attributes.price;
              // Bisagras
              if (accessory.attributes.id_provider === '13180') costModelVOV.hinge += accessory.attributes.price;
            }

            costModelVOV.glass = glass.costGlass;

            /*  console.log({ model: costModelVOV }) */

            // PVC
            this.pvc = {
              frame: costModelVOV.frame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModelVOV.sash * ((window.widthMeters / 3 - 0.062 + window.heightMeters - 0.062) * 2),
              glazing_bead:
                costModelVOV.glazing_bead *
                (((window.widthMeters - 0.194) / 3) * 6 + (window.heightMeters - 0.194) * 6),
              transom: costModelVOV.transom * ((window.heightMeters - 0.12) * 2),
            };
            // Refuerzos
            this.ref = {
              frame: costModelVOV.rFrame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModelVOV.rSash * ((window.widthMeters / 3 + window.heightMeters) * 2),
              transom: costModelVOV.rTransom * ((window.heightMeters - 0.194) * 2),
            };
            // Accesorios
            this.accessories = {
              handle: costModelVOV.handle,
              cremone: costModelVOV.cremone,
              striker: costModelVOV.striker * 3,
              hinge: costModelVOV.hinge * 2,
            };
            // Vidrios
            this.glasses = {
              sash: ((window.widthMeters - 0.194) / 3) * (window.heightMeters - 0.194) * costModelVOV.glass,
              frame: ((window.widthMeters - 0.194) / 3) * (window.heightMeters - 0.194) * costModelVOV.glass * 2,
            };

            break;
          case WindowModelsEnum['[><]']:
            const costModelVV = {
              // Profiles
              frame: 0,
              rFrame: 0,
              sash: 0,
              rSash: 0,
              transom: 0,
              rTransom: 0,

              glazing_bead: 0,

              // Accesories
              handle: 0,
              cremone: 0,
              striker: 0,
              hinge: 0,
              // Glass
              glass: 0,
            };

            for (const profile of profiles) {
              const {
                attributes: { id_provider, price },
              } = profile;
              // Perfiles pricipales
              // Marco
              if (id_provider === '12301') costModelVV.frame += price;
              // Divisor
              if (id_provider === '12320') costModelVV.transom += price;
              // Hoja
              if (id_provider === '12310') costModelVV.sash += price;
              // pisavidrio
              if (id_provider === '12342') costModelVV.glazing_bead += price;
              // Ref Marco
              if (id_provider === '12070') costModelVV.rFrame += price;
              // Ref Hoja
              if (id_provider === '13088') costModelVV.rSash += price;
              // Ref Divisor
              if (id_provider === '13088') costModelVV.rTransom += price;
            }

            for (const accessory of accessories) {
              // Manija
              if (accessory.attributes.id_provider === '12873') costModelVV.handle += accessory.attributes.price;
              // Cremona
              if (accessory.attributes.id_provider === '13383') costModelVV.cremone += accessory.attributes.price;
              // Cerraderos
              if (accessory.attributes.id_provider === '12813') costModelVV.striker += accessory.attributes.price;
              // Bisagras
              if (accessory.attributes.id_provider === '13180') costModelVV.hinge += accessory.attributes.price;
            }

            costModelVV.glass += glass.costGlass;

            // PVC
            this.pvc = {
              frame: costModelVV.frame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModelVV.sash * ((window.widthMeters / 2 - 0.062 + window.heightMeters - 0.062) * 4),
              glazing_bead:
                costModelVV.glazing_bead * ((window.widthMeters - 0.194 + (window.heightMeters - 0.194) * 2) * 2),
              transom: costModelVV.transom * window.heightMeters - 0.12,
            };
            // Refuerzos
            this.ref = {
              frame: costModelVV.rFrame * ((window.widthMeters - 0.12 + window.heightMeters - 0.12) * 2),
              sash: costModelVV.rSash * ((window.widthMeters / 2 - 0.062 + window.heightMeters - 0.062) * 4),
              transom: costModelVV.rTransom * window.heightMeters,
            };
            // Accesorios
            this.accessories = {
              handle: costModelVV.handle,
              cremone: costModelVV.cremone,
              striker: costModelVV.striker * 3,
              hinge: costModelVV.hinge * 4,
            };
            // Vidrios
            this.glasses = {
              sash: (window.widthMeters / 2 - 0.194) * (window.heightMeters - 0.194) * costModelVV.glass * 2,
              frame: 0,
            };
            break;
        }

      case WindowTypeEnum.DOOR:
        switch (model) {
          case WindowModelsEnum['[<]']:
          case WindowModelsEnum['[>]']:
            const costModel = {
              // Profiles
              frame: 0,
              rFrame: 0,
              sash: 0,
              rSash: 0,
              glazing_bead: 0,
              rTransom: 0,

              // Accesories
              handle: 0,
              cremone: 0,
              striker: 0,
              hinge: 0,
              // Door
              striker2: 0,
              adjustable_striker: 0,
              corner: 0,
              addExt: 0,

              cylinder: 0,

              // Glass
              glass: 0,
            };
            for (const profile of profiles) {
              const {
                attributes: { id_provider, price },
              } = profile;
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModel.frame += price;
              // Hoja
              if (id_provider === '12311') costModel.sash += price;
              // pisavidrio
              if (id_provider === '12342') costModel.glazing_bead += price;
              // Ref Marco
              if (id_provider === '12070') costModel.rFrame += price;
              // Ref Hoja
              if (id_provider === '13080') costModel.rSash += price;
            }

            for (const accessory of accessories) {
              // Manija
              if (accessory.attributes.id_provider === '12873') costModel.handle += accessory.attributes.price;
              // Cremona
              if (accessory.attributes.id_provider === '13340') costModel.cremone += accessory.attributes.price;
              // Cerraderos 1
              if (accessory.attributes.id_provider === '12813') costModel.striker += accessory.attributes.price;
              // Cerraderos 2
              if (accessory.attributes.id_provider === '12897') costModel.striker2 += accessory.attributes.price;
              // Cerraderos ajustable
              if (accessory.attributes.id_provider === '12906')
                costModel.adjustable_striker += accessory.attributes.price;
              // Bisagras
              if (accessory.attributes.id_provider === '12920') costModel.hinge += accessory.attributes.price;
              // Corner
              if (accessory.attributes.id_provider === '13577') costModel.corner += accessory.attributes.price;
              // Add
              if (accessory.attributes.id_provider === '13426') costModel.addExt += accessory.attributes.price;
            }

            // Vidrio
            costModel.glass += glass.costGlass;

            // PVC
            this.pvc = {
              frame: costModel.frame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModel.sash * ((window.widthMeters - 0.062 + window.heightMeters - 0.062) * 2),
              glazing_bead: costModel.glazing_bead * ((window.widthMeters - 0.194 + window.heightMeters - 0.194) * 2),
              transom: 0,
            };
            // Refuerzos
            this.ref = {
              frame: costModel.rFrame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModel.rSash * ((window.widthMeters + window.heightMeters) * 2),
              transom: 0,
            };
            // Accesorios
            this.accessories = {
              handle: costModel.handle,
              cremone: costModel.cremone,
              striker:
                costModel.striker * 2 +
                costModel.adjustable_striker +
                costModel.striker2 * 4 +
                costModel.cylinder +
                costModel.addExt * 2 +
                costModel.corner * 2,
              hinge: costModel.hinge * 3,
            };
            // Vidrios
            this.glasses = {
              sash: (window.widthMeters - 0.194) * (window.heightMeters - 0.194) * costModel.glass,
              frame: 0,
            };
            break;
          case WindowModelsEnum['[><]']:
            const costModelVV = {
              // Profiles
              frame: 0,
              rFrame: 0,
              sash: 0,
              rSash: 0,
              glazing_bead: 0,
              rTransom: 0,

              // Accesories
              handle: 0,
              cremone: 0,
              cremone2: 0,
              striker: 0,
              hinge: 0,
              // Door
              corner: 0,
              addExt: 0,
              striker2: 0,
              adjustable_striker: 0,

              cylinder: 0,

              // Glass
              glass: 0,
            };
            for (const profile of profiles) {
              const {
                attributes: { id_provider, price },
              } = profile;
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModelVV.frame += price;
              // Hoja
              if (id_provider === '12311') costModelVV.sash += price;
              // pisavidrio
              if (id_provider === '12342') costModelVV.glazing_bead += price;
              // Ref Marco
              if (id_provider === '12070') costModelVV.rFrame += price;
              // Ref Hoja
              if (id_provider === '13080') costModelVV.rSash += price;
            }

            for (const accessory of accessories) {
              // Manija
              if (accessory.attributes.id_provider === '12873') costModelVV.handle += accessory.attributes.price;
              // Cremona
              if (accessory.attributes.id_provider === '13340') costModelVV.cremone += accessory.attributes.price;
              // Cremona2
              if (accessory.attributes.id_provider === '13555') costModelVV.cremone2 += accessory.attributes.price;
              // Cerraderos 1
              if (accessory.attributes.id_provider === '12813') costModelVV.striker += accessory.attributes.price;
              // Cerraderos 2
              if (accessory.attributes.id_provider === '12897') costModelVV.striker2 += accessory.attributes.price;
              // Corner
              if (accessory.attributes.id_provider === '13577') costModelVV.corner += accessory.attributes.price;
              // Add
              if (accessory.attributes.id_provider === '13426') costModelVV.addExt += accessory.attributes.price;

              // Cerraderos ajustable
              if (accessory.attributes.id_provider === '12906')
                costModelVV.adjustable_striker += accessory.attributes.price;

              // Bisagras
              if (accessory.attributes.id_provider === '12920') costModelVV.hinge += accessory.attributes.price;
            }

            costModelVV.glass += glass.costGlass;
            // PVC
            this.pvc = {
              frame: costModelVV.frame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModelVV.sash * ((window.widthMeters - 0.062 + window.heightMeters - 0.062) * 2),
              glazing_bead: costModelVV.glazing_bead * ((window.widthMeters - 0.194 + window.heightMeters - 0.194) * 2),
              transom: 0,
            };
            // Refuerzos
            this.ref = {
              frame: costModelVV.rFrame * ((window.widthMeters + window.heightMeters) * 2),
              sash: costModelVV.rSash * ((window.widthMeters + window.heightMeters) * 2),
              transom: 0,
            };
            // Accesorios
            this.accessories = {
              handle: costModelVV.handle,
              cremone: costModelVV.cremone + costModelVV.cremone2 + costModelVV.corner * 4 + costModelVV.addExt * 4,
              striker:
                costModelVV.striker * 4 +
                costModelVV.adjustable_striker +
                costModelVV.striker2 * 6 +
                costModelVV.cylinder,
              hinge: costModelVV.hinge * 6,
            };
            // Vidrios
            this.glasses = {
              sash: (window.widthMeters / 2 - 0.194) * (window.heightMeters - 0.194) * costModelVV.glass * 2,
              frame: 0,
            };
            break;
        }
    }

    // Areas
    this.services.installation = services.costInstallation * this.getArea(window.area);
    this.services.protection = services.costProtection * this.getArea(window.area);
    // Perimeters
    this.services.polyurethane = services.costPolyurethane * window.perimeter;
    this.services.silicone = services.costSilicone * window.perimeter;

    // Dismount
    this.services.dismount = services.costUnmount * this.getArea(window.area);

    for (const iterator of Object.values(this.pvc)) {
      this.price += iterator;
    }
    for (const iterator of Object.values(this.ref)) {
      this.price += iterator;
    }
    for (const iterator of Object.values(this.accessories)) {
      this.price += iterator;
    }
    for (const iterator of Object.values(this.glasses)) {
      this.price += iterator;
    }
    for (const iterator of Object.values(this.adminCost)) {
      this.COP += iterator;
    }
    for (const iterator of Object.values(this.services)) {
      this.COP += iterator;
    }

    this.costWindow = this.price * this.dollar + this.COP;
    this.profitWindow = this.costWindow / ((100 - this.adminCost.profit) / 100) - this.costWindow;
  }
  private getArea(area: number) {
    if (area < 1) return 1;
    else return area;
  }
  getCost() {
    return this;
  }
}
