import { CreateWindowFormPVCI, WindowTypeEnum, WindowModelsEnum } from '@models/WindowPVC.model'
import { getSystem } from './getSystem'

export const getPricesEverestMax = async ({
  title,
  location,
  width,
  height,
  model,
  type,
  system,
  glass,
  cant,
  color,
  hours,

  projectData,
  quotationID,
  dismount,
}: CreateWindowFormPVCI) => {
  const widthM = width / 1000
  const heightM = height / 1000
  const area = widthM * heightM
  const linealMeters = (widthM + heightM) * 2
  const cost = {
    pvc: {
      frame: 0,
      sash: 0,
      transom: 0,
      glazing_bead: 0,
    },
    ref: {
      frame: 0,
      sash: 0,
      transom: 0,
    },
    accessories: {
      handle: 0,
      cremone: 0,
      striker: 0,
      hinge: 0,
    },
    glasses: {
      sash: 0,
      frame: 0,
    },
    adminCost: {
      MOD: 0,
      CIF: 0,
      profit: 0,
    },
    services: {
      installation: 0,
      protection: 0,
      silicone: 0,
      polyurethane: 0,
      transport: 0,
      dismount: 0,
    },
    material: {
      installation: 0,
      protection: 0,
      silicone: 0,
      polyurethane: 0,
    },
    price: 0,
    COP: 0,
    priceWithProfit: 0,
    dollar: 0,
    description: (() => {
      return type === 'window' ? `Ventana Europea ${system?.toUpperCase()}` : `Puerta Ventana ${system?.toUpperCase()}`
    })(),
    glass: '',
  }
  const { installation, polyurethane, protection, silicone, transport } = projectData

  const everest = await getSystem(system)

  if (everest) {
    const {
      data: {
        attributes: { profiles, accessories, glasses, administrative_costs, services },
      },
    } = everest
    const dollar = administrative_costs.data.find((cost) => cost.attributes.title === 'dollar')
    if (dollar?.attributes.value) cost.dollar = dollar?.attributes.value
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
            }

            for (const profile of profiles.data) {
              const {
                attributes: { id_provider, price },
              } = profile
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModel.frame += price
              // Hoja
              if (id_provider === '12310') costModel.sash += price
              // pisavidrio
              if (id_provider === '12342') costModel.glazing_bead += price
              // Ref Marco
              if (id_provider === '12070') costModel.rFrame += price
              // Ref Hoja
              if (id_provider === '13088') costModel.rSash += price
            }

            for (const accessory of accessories.data) {
              // Manija
              if (accessory.attributes.id_provider === '12873') costModel.handle += accessory.attributes.price
              // Cremona
              if (accessory.attributes.id_provider === '13383') costModel.cremone += accessory.attributes.price
              // Cerraderos
              if (accessory.attributes.id_provider === '12813') costModel.striker += accessory.attributes.price
              // Bisagras
              if (accessory.attributes.id_provider === '13180') costModel.hinge += accessory.attributes.price
            }

            for (const glassData of glasses.data) {
              if (glassData.attributes.id_arqustik === glass) costModel.glass += glassData.attributes.price
            }

            console.log({ model: costModel })

            // PVC
            cost.pvc = {
              frame: costModel.frame * ((widthM + heightM) * 2),
              sash: costModel.sash * ((widthM - 0.062 + heightM - 0.062) * 2),
              glazing_bead: costModel.glazing_bead * ((widthM - 0.194 + heightM - 0.194) * 2),
              transom: 0,
            }
            // Refuerzos
            cost.ref = {
              frame: costModel.rFrame * ((widthM + heightM) * 2),
              sash: costModel.rSash * (widthM + heightM * 2),
              transom: 0,
            }
            // Accesorios
            cost.accessories = {
              handle: costModel.handle,
              cremone: costModel.cremone,
              striker: costModel.striker * 3,
              hinge: costModel.hinge * 2,
            }
            // Vidrios
            cost.glasses = {
              sash: (widthM - 0.194) * (heightM - 0.194) * costModel.glass,
              frame: 0,
            }

            /*   console.log({ cost: cost }) */
            break
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
            }

            for (const profile of profiles.data) {
              const {
                attributes: { id_provider, price },
              } = profile
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModelOV.frame += price
              // Divisor
              if (id_provider === '12320') costModelOV.transom += price
              // Hoja
              if (id_provider === '12310') costModelOV.sash += price
              // pisavidrio
              if (id_provider === '12342') costModelOV.glazing_bead += price
              // Ref Marco
              if (id_provider === '12070') costModelOV.rFrame += price
              // Ref Hoja
              if (id_provider === '13088') costModelOV.rSash += price
              // Ref Divisor
              if (id_provider === '13088') costModelOV.rTransom += price
            }

            for (const accessory of accessories.data) {
              // Manija
              if (accessory.attributes.id_provider === '12873') costModelOV.handle += accessory.attributes.price
              // Cremona
              if (accessory.attributes.id_provider === '13383') costModelOV.cremone += accessory.attributes.price
              // Cerraderos
              if (accessory.attributes.id_provider === '12813') costModelOV.striker += accessory.attributes.price
              // Bisagras
              if (accessory.attributes.id_provider === '13180') costModelOV.hinge += accessory.attributes.price
            }

            for (const glassData of glasses.data) {
              if (glassData.attributes.id_arqustik === glass) costModelOV.glass += glassData.attributes.price
            }

            console.log({ model: costModelOV })

            // PVC
            cost.pvc = {
              frame: costModelOV.frame * ((widthM + heightM) * 2),
              sash: costModelOV.sash * ((widthM / 2 - 0.062 + heightM - 0.062) * 2),
              glazing_bead: costModelOV.glazing_bead * ((widthM - 0.194 + (heightM - 0.194) * 2) * 2),
              transom: costModelOV.transom * heightM - 0.12,
            }
            // Refuerzos
            cost.ref = {
              frame: costModelOV.rFrame * ((widthM + heightM) * 2),
              sash: costModelOV.rSash * (widthM + heightM * 2),
              transom: costModelOV.rTransom * heightM,
            }
            // Accesorios
            cost.accessories = {
              handle: costModelOV.handle,
              cremone: costModelOV.cremone,
              striker: costModelOV.striker * 3,
              hinge: costModelOV.hinge * 2,
            }
            // Vidrios
            cost.glasses = {
              sash: (widthM - 0.194) * (heightM - 0.194) * costModelOV.glass,
              frame: 0,
            }

            break
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
            }

            for (const profile of profiles.data) {
              const {
                attributes: { id_provider, price },
              } = profile
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModelO.frame += price
              // pisavidrio
              if (id_provider === '12342') costModelO.glazing_bead += price
              // Ref Marco
              if (id_provider === '12070') costModelO.rFrame += price
            }

            for (const glassData of glasses.data) {
              if (glassData.attributes.id_arqustik === glass) costModelO.glass += glassData.attributes.price
            }

            console.log({ model: costModelO })

            // PVC
            cost.pvc = {
              frame: costModelO.frame * ((widthM + heightM) * 2),
              glazing_bead: costModelO.glazing_bead * ((widthM - 0.194 + heightM - 0.194) * 2),
              sash: 0,
              transom: 0,
            }
            // Refuerzos
            cost.ref = {
              frame: costModelO.rFrame * ((widthM + heightM) * 2),
              sash: 0,
              transom: 0,
            }
            // Accesorios
            cost.accessories = {
              handle: costModelO.handle,
              cremone: costModelO.cremone,
              striker: costModelO.striker * 3,
              hinge: costModelO.hinge * 2,
            }
            // Vidrios
            cost.glasses = {
              sash: 0,
              frame: (widthM - 0.194) * (heightM - 0.194) * costModelO.glass,
            }
            break

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
            }

            for (const profile of profiles.data) {
              const {
                attributes: { id_provider, price },
              } = profile
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModelV.frame += price
              // Hoja
              if (id_provider === '12316') costModelV.sash += price
              // pisavidrio
              if (id_provider === '12342') costModelV.glazing_bead += price
              // Ref Marco
              if (id_provider === '12070') costModelV.rFrame += price
              // Ref Hoja
              if (id_provider === '13094') costModelV.rSash += price
            }

            for (const accessory of accessories.data) {
              // Manija
              if (accessory.attributes.id_provider === '13508') costModelV.handle += accessory.attributes.price
              // Cremona
              if (width > 0 && width <= 400) {
                if (accessory.attributes.id_provider === '13373') costModelV.cremone += accessory.attributes.price
              } else if (width > 400 && width <= 800) {
                if (accessory.attributes.id_provider === '13375') costModelV.cremone += accessory.attributes.price
              } else if (width > 800) {
                if (accessory.attributes.id_provider === '13377') costModelV.cremone += accessory.attributes.price
              }
              // Cerraderos
              if (accessory.attributes.id_provider === '12874') costModelV.striker += accessory.attributes.price
              // Brazos
              if (height > 0 && height <= 500) {
                if (accessory.attributes.id_provider === '13526') costModelV.hinge += accessory.attributes.price
              } else if (height > 500 && height <= 1000) {
                if (accessory.attributes.id_provider === '13523') costModelV.hinge += accessory.attributes.price
              } else if (height > 1000) {
                if (accessory.attributes.id_provider === '13525') costModelV.hinge += accessory.attributes.price
              }
            }

            for (const glassData of glasses.data) {
              if (glassData.attributes.id_arqustik === glass) costModelV.glass += glassData.attributes.price
            }

            console.log({ model: costModelV })

            // PVC
            cost.pvc = {
              frame: costModelV.frame * ((widthM + heightM) * 2),
              sash: costModelV.sash * ((widthM - 0.062 + heightM - 0.062) * 2),
              glazing_bead: costModelV.glazing_bead * ((widthM - 0.194 + heightM - 0.194) * 2),
              transom: 0,
            }
            // Refuerzos
            cost.ref = {
              frame: costModelV.rFrame * ((widthM + heightM) * 2),
              sash: costModelV.rSash * (widthM + heightM * 2),
              transom: 0,
            }
            // Accesorios
            cost.accessories = {
              handle: costModelV.handle,
              cremone: costModelV.cremone,
              striker: costModelV.striker * 3,
              hinge: costModelV.hinge,
            }
            // Vidrios
            cost.glasses = {
              sash: (widthM - 0.194) * (heightM - 0.194) * costModelV.glass,
              frame: 0,
            }

            console.log({ cost: cost })

            break
          /* TODO: aca */
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
            }
            break
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

              cylinder: 0,

              // Glass
              glass: 0,
            }
            for (const profile of profiles.data) {
              const {
                attributes: { id_provider, price },
              } = profile
              // Perfiles pricipales
              // Marco >>
              if (id_provider === '12301') costModel.frame += price
              // Hoja
              if (id_provider === '12311') costModel.sash += price
              // pisavidrio
              if (id_provider === '12342') costModel.glazing_bead += price
              // Ref Marco
              if (id_provider === '12070') costModel.rFrame += price
              // Ref Hoja
              if (id_provider === '13080') costModel.rSash += price
            }

            for (const accessory of accessories.data) {
              // Manija
              if (accessory.attributes.id_provider === '12873') costModel.handle += accessory.attributes.price
              // Cremona
              if (accessory.attributes.id_provider === '13340') costModel.cremone += accessory.attributes.price
              // Cerraderos 1
              if (accessory.attributes.id_provider === '12813') costModel.striker += accessory.attributes.price
              // Cerraderos 2
              if (accessory.attributes.id_provider === '12897') costModel.striker2 += accessory.attributes.price
              // Cerraderos ajustable
              if (accessory.attributes.id_provider === '12906')
                costModel.adjustable_striker += accessory.attributes.price

              // Bisagras
              if (accessory.attributes.id_provider === '12920') costModel.hinge += accessory.attributes.price
            }

            for (const glassData of glasses.data) {
              if (glassData.attributes.id_arqustik === glass) costModel.glass += glassData.attributes.price
            }

            // PVC
            cost.pvc = {
              frame: costModel.frame * ((widthM + heightM) * 2),
              sash: costModel.sash * ((widthM - 0.062 + heightM - 0.062) * 2),
              glazing_bead: costModel.glazing_bead * ((widthM - 0.194 + heightM - 0.194) * 2),
              transom: 0,
            }
            // Refuerzos
            cost.ref = {
              frame: costModel.rFrame * ((widthM + heightM) * 2),
              sash: costModel.rSash * ((widthM + heightM) * 2),
              transom: 0,
            }
            // Accesorios
            cost.accessories = {
              handle: costModel.handle,
              cremone: costModel.cremone,
              striker:
                costModel.striker * 2 + costModel.adjustable_striker + costModel.striker2 * 4 + costModel.cylinder,
              hinge: costModel.hinge * 3,
            }
            // Vidrios
            cost.glasses = {
              sash: (widthM - 0.194) * (heightM - 0.194) * costModel.glass,
              frame: 0,
            }
            break
        }
    }

    for (const adminCost of administrative_costs.data) {
      const {
        attributes: { title, value },
      } = adminCost
      if (title === 'MOD') cost.adminCost.MOD = value * hours
      if (title === 'CIF') cost.adminCost.CIF = value * hours
    }

    for (const service of services.data) {
      if (installation) {
        if (service.attributes.title === 'installation')
          cost.services.installation = (service.attributes.price + service.attributes.material) * area
      }
      if (dismount) {
        if (service.attributes.title === 'unmount') cost.services.dismount = service.attributes.price * area
      }
      if (transport) {
        if (service.attributes.title === 'transport') cost.services.transport = service.attributes.price
      }
      if (protection) {
        if (protection === 'zero') cost.services.protection = 0
        if (protection === 'one') {
          if (service.attributes.title === 'protection1')
            cost.services.protection = (service.attributes.price + service.attributes.material) * area
        } else if (protection === 'two') {
          if (service.attributes.title === 'protection2')
            cost.services.protection = (service.attributes.price + service.attributes.material) * area
        }
      }

      if (polyurethane) {
        if (service.attributes.title === 'polyurethane')
          cost.services.polyurethane = (service.attributes.price + service.attributes.material) * linealMeters
      }
      if (silicone) {
        if (silicone === 'zero') cost.services.silicone = 0
        if (silicone === 'one') {
          if (service.attributes.title === 'silicone1')
            cost.services.silicone = (service.attributes.price + service.attributes.material) * linealMeters
        } else if (silicone === 'two') {
          if (service.attributes.title === 'silicone2')
            cost.services.silicone = (service.attributes.price + service.attributes.material) * linealMeters
        }
      }
    }
    for (const glassA of glasses.data) {
      if (glassA.attributes.id_arqustik === glass) cost.glass = glassA.attributes.title
    }
  }

  for (const iterator of Object.values(cost.pvc)) {
    cost.price += iterator
  }
  for (const iterator of Object.values(cost.ref)) {
    cost.price += iterator
  }
  for (const iterator of Object.values(cost.accessories)) {
    cost.price += iterator
  }
  for (const iterator of Object.values(cost.glasses)) {
    cost.price += iterator
  }
  for (const iterator of Object.values(cost.adminCost)) {
    cost.COP += iterator
  }
  for (const iterator of Object.values(cost.services)) {
    cost.COP += iterator
  }
  // pesos
  const costWindow = cost.price * cost.dollar + cost.COP
  const profitWindow = costWindow / ((100 - 35) / 100) - costWindow

  const newWindow = {
    title,
    location,
    quotation: quotationID,

    cost: costWindow,
    profit: profitWindow,
    price: profitWindow + costWindow,
    glass: cost.glass,
    system: system,
    type: type,
    cant,
    width,
    height,
    model,
    color,
    description: cost.description,
  }

  console.log(newWindow)

  return newWindow
}
