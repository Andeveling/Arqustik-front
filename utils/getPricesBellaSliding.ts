import { SystemsEnum } from '@models/System.model'
import { CreateWindowFormPVCI, WindowModelsEnum, WindowTypeEnum } from '@models/WindowPVC.model'
import { getSystem } from './getSystem'

export const getPriceBellaSliding = async ({
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
      closing: 0,
      interlock: 0,
      frontal: 0,
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
      e_handle: 0,
      roller: 0,
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

  switch (system) {
    case SystemsEnum.BellaSliding:
      const bella = await getSystem(system)

      if (bella) {
        const {
          data: {
            attributes: { profiles, accessories, glasses, administrative_costs, services },
          },
        } = bella
        const dollar = administrative_costs.data.find((cost) => cost.attributes.title === 'dollar')
        if (dollar?.attributes.value) cost.dollar = dollar?.attributes.value

        switch (type) {
          case WindowTypeEnum.WINDOW:
            switch (model) {
              case WindowModelsEnum.OX:
              case WindowModelsEnum.XO:
                const monorailCost = {
                  frame: 0,
                  sash: 0,
                  transom: 0,
                  glazing_bead: 0,
                  closing: 0,
                  interlock: 0,
                  rFrame: 0,
                  rSash: 0,
                  rTransom: 0,
                  e_handle: 0,
                  handle: 0,
                  cremone: 0,
                  roller: 0,
                  glass: 0,
                  hours: 4.5,
                  MOD: 0,
                  CIF: 0,
                }

                for (const adminCost of administrative_costs.data) {
                  const {
                    attributes: { title, value },
                  } = adminCost
                  if (title === 'MOD') monorailCost.MOD += value
                  if (title === 'CIF') monorailCost.CIF += value
                }
                cost.adminCost = {
                  MOD: monorailCost.hours * monorailCost.MOD,
                  CIF: monorailCost.hours * monorailCost.CIF,
                  profit: 0,
                }

                for (const profile of profiles.data) {
                  const {
                    attributes: { id_provider, price },
                  } = profile
                  // Perfiles pricipales
                  // Marco
                  if (id_provider === '12461') monorailCost.frame += price
                  // pisavidrio
                  if (id_provider === '12476') monorailCost.glazing_bead += price
                  // Hoja
                  if (id_provider === '12471') {
                    monorailCost.sash += price
                    monorailCost.transom += price
                  }
                  // closing - tapas monoriel marco
                  if (id_provider === '12469') monorailCost.closing += price
                  // interlock
                  if (id_provider === '12468') monorailCost.interlock += price
                  // Ref Marco
                  if (id_provider === '12952') monorailCost.rFrame += price
                  // Ref Hoja
                  if (id_provider === '12987') {
                    monorailCost.rSash += price
                    monorailCost.rTransom += price
                  }
                }

                for (const accessory of accessories.data) {
                  // Haladera
                  if (accessory.attributes.id_provider === '13119') monorailCost.e_handle += accessory.attributes.price
                  // Manija
                  if (accessory.attributes.id_provider === '13506') monorailCost.handle += accessory.attributes.price
                  // rueda
                  if (accessory.attributes.id_provider === '13189') monorailCost.roller += accessory.attributes.price
                }

                for (const glassA of glasses.data) {
                  if (glassA.attributes.id_arqustik === glass) monorailCost.glass += glassA.attributes.price
                }
                // PVC
                cost.pvc = {
                  frame: monorailCost.frame * ((widthM + heightM) * 2),
                  sash: monorailCost.sash * (widthM + heightM * 2),
                  transom: monorailCost.transom * heightM,
                  glazing_bead: monorailCost.glazing_bead * (widthM + heightM * 2) * 2,
                  closing: monorailCost.closing * (widthM + heightM),
                  interlock: monorailCost.interlock * heightM,
                  frontal: 0,
                }
                // Refuerzos
                cost.ref = {
                  frame: monorailCost.rFrame * ((widthM + heightM) * 2),
                  sash: monorailCost.rSash * (widthM + heightM * 2),
                  transom: monorailCost.rTransom * heightM,
                }
                // Accesorios
                cost.accessories = {
                  handle: monorailCost.handle,
                  e_handle: monorailCost.e_handle,
                  cremone: monorailCost.cremone,
                  roller: monorailCost.roller * 2,
                }
                // Vidrios
                cost.glasses = {
                  sash: (widthM / 2 - 0.113) * (heightM - 0.182) * monorailCost.glass,
                  frame: (widthM / 2 - 0.113) * (heightM - 0.067) * monorailCost.glass,
                }

                break
              case WindowModelsEnum.XX:
                const doubleRailCost = {
                  frame: 0,
                  sash: 0,
                  transom: 0,
                  closing: 0,
                  interlock: 0,
                  glazing_bead: 0,
                  rFrame: 0,
                  rSash: 0,
                  rTransom: 0,
                  handle: 0,
                  cremone: 0,
                  roller: 0,
                  glass: 0,
                  e_handle: 0,
                  hours: 6,
                }

                cost.adminCost = {
                  MOD: 0,
                  CIF: 0,
                  profit: 0,
                }

                for (const adminCost of administrative_costs.data) {
                  const {
                    attributes: { title, value },
                  } = adminCost
                  if (title === 'MOD') cost.adminCost.MOD = doubleRailCost.hours * value
                  if (title === 'CIF') cost.adminCost.CIF = doubleRailCost.hours * value
                }

                for (const profile of profiles.data) {
                  // Perfiles pricipales XX
                  const {
                    attributes: { id_provider, price },
                  } = profile
                  // pisavidrio
                  if (id_provider === '12476') doubleRailCost.glazing_bead += price
                  if (id_provider === '12500')
                    // Marco XX
                    doubleRailCost.frame += price
                  // Hoja XX
                  if (id_provider === '12471') doubleRailCost.sash += price
                  // interlock XX
                  if (id_provider === '12468') doubleRailCost.interlock += price
                  // Ref Marco XX
                  if (id_provider === '12985') doubleRailCost.rFrame += price
                  // Ref Hoja XX
                  if (id_provider === '12987') doubleRailCost.rSash += price
                }
                for (const accessory of accessories.data) {
                  // Haladera
                  if (accessory.attributes.id_provider === '13119')
                    doubleRailCost.e_handle += accessory.attributes.price
                  // Manija
                  if (accessory.attributes.id_provider === '13506') doubleRailCost.handle += accessory.attributes.price
                  // rueda
                  if (accessory.attributes.id_provider === '13189') doubleRailCost.roller += accessory.attributes.price
                }
                for (const glassA of glasses.data) {
                  if (glassA.attributes.id_arqustik === glass) doubleRailCost.glass += glassA.attributes.price
                }
                // PVC XX
                cost.pvc = {
                  frame: doubleRailCost.frame * ((widthM + heightM) * 2),
                  sash: doubleRailCost.sash * (widthM / 2 + 0.005 + (heightM - 0.064) * 4),
                  glazing_bead: doubleRailCost.glazing_bead * (widthM / 2 + 0.005 + (heightM - 0.064) * 4),
                  interlock: doubleRailCost.interlock * heightM * 2,
                  transom: 0,
                  closing: 0,
                  frontal: 0,
                }
                // Refuerzos XX
                cost.ref = {
                  frame: doubleRailCost.rFrame * ((widthM + heightM) * 2),
                  sash: doubleRailCost.rSash * (widthM + heightM * 2) * 2,
                  transom: 0,
                }
                // Accesorios XX
                cost.accessories = {
                  handle: doubleRailCost.handle * 2,
                  cremone: doubleRailCost.cremone * 2,
                  roller: doubleRailCost.roller * 4,
                  e_handle: doubleRailCost.e_handle * 2,
                }
                // VidriosXX
                cost.glasses = {
                  sash: (widthM / 2 - 0.113) * (heightM - 0.182) * doubleRailCost.glass * 2,
                  frame: 0,
                }

                break
              case WindowModelsEnum.OXX:
              case WindowModelsEnum.XXO:
              case WindowModelsEnum.XXX:
                const tripleRailCost = {
                  frame: 0,
                  sash: 0,
                  transom: 0,
                  glazing_bead: 0,
                  closing: 0,
                  interlock: 0,
                  // refuerzos
                  rFrame: 0,
                  rSash: 0,
                  rTransom: 0,
                  // accessories
                  handle: 0,
                  cremone: 0,

                  roller: 0,
                  // glass
                  glass: 0,
                  frontal: 0,
                  // horas
                  hours: 8,
                }

                cost.adminCost = {
                  MOD: 0,
                  CIF: 0,
                  profit: 0,
                }

                for (const adminCost of administrative_costs.data) {
                  const {
                    attributes: { title, value },
                  } = adminCost
                  if (title === 'MOD') cost.adminCost.MOD = tripleRailCost.hours * value
                  if (title === 'CIF') cost.adminCost.CIF = tripleRailCost.hours * value
                }

                for (const profile of profiles.data) {
                  // Perfiles pricipales XXO XXX
                  // Pisavidrio
                  if (profile.attributes.id_provider === '12476')
                    tripleRailCost.glazing_bead += profile.attributes.price
                  // Marco XXO XXX
                  if (profile.attributes.id_provider === '12464') tripleRailCost.frame += profile.attributes.price
                  // Hoja XXO
                  if (profile.attributes.id_provider === '12471') tripleRailCost.sash += profile.attributes.price
                  // interlock XXO XXX
                  if (profile.attributes.id_provider === '12468') tripleRailCost.interlock += profile.attributes.price
                  // Frontal
                  // if (profile.attributes.id_provider === '12669') tripleRailCost.frontal += profile.attributes.price
                  // Ref Marco XXO XXX
                  if (profile.attributes.id_provider === '12985') tripleRailCost.rFrame += profile.attributes.price
                  // Ref Hoja XXO XXX
                  if (profile.attributes.id_provider === '12987') tripleRailCost.rSash += profile.attributes.price
                }
                for (const accessory of accessories.data) {
                  // Manija XXO XXX
                  if (accessory.attributes.id_provider === '12873') tripleRailCost.handle += accessory.attributes.price
                  // Cremona XXO XXX
                  if (accessory.attributes.id_provider === '13317') tripleRailCost.cremone += accessory.attributes.price
                  // rueda XXO XXX
                  if (accessory.attributes.id_provider === '13189') tripleRailCost.roller += accessory.attributes.price
                }
                // Vidrios
                for (const glassA of glasses.data) {
                  if (glassA.attributes.id_arqustik === glass) tripleRailCost.glass += glassA.attributes.price
                }
                // PVC XXO XXX
                cost.pvc = {
                  frame: tripleRailCost.frame * ((widthM + heightM) * 2),
                  sash: tripleRailCost.sash * (((widthM + 0.09) / 3) * 6 + (heightM - 0.064) * 6),
                  interlock: tripleRailCost.interlock * heightM * 4,
                  glazing_bead: tripleRailCost.glazing_bead * (((widthM + 0.09) / 3) * 6 + (heightM - 0.064) * 6),
                  frontal: 0,
                  transom: 0,
                  closing: 0,
                }
                // Refuerzos XX0 XXX
                cost.ref = {
                  frame: tripleRailCost.rFrame * ((widthM + heightM) * 2) * 2,
                  sash: tripleRailCost.rSash * ((widthM + 0.18) * 2 + (heightM - 0.08) * 6),
                  transom: 0,
                }
                // Accesorios XXX
                if (model === WindowModelsEnum.XXX) {
                  cost.accessories = {
                    handle: tripleRailCost.handle * 2,
                    cremone: tripleRailCost.cremone * 2,
                    roller: tripleRailCost.roller * 6,
                    e_handle: 0,
                  }
                } else {
                  // Accesorios XX0
                  cost.accessories = {
                    handle: tripleRailCost.handle,
                    cremone: tripleRailCost.cremone,
                    roller: tripleRailCost.roller * 4,
                    e_handle: 0,
                  }
                }
                // VidriosXXO XXX
                cost.glasses = {
                  sash: ((widthM - 0.273) / 3) * (heightM - 0.182) * tripleRailCost.glass * 3,
                  frame: 0,
                }
                break
              case WindowModelsEnum.OXXO:
                const monorailDoubleCost = {
                  frame: 0,
                  sash: 0,
                  transom: 0,
                  closing: 0,
                  interlock: 0,
                  glazing_bead: 0,
                  frontal: 0,
                  rFrame: 0,
                  rSash: 0,
                  rTransom: 0,
                  handle: 0,
                  cremone: 0,
                  roller: 0,
                  glass: 0,
                  e_handle: 0,
                  hours: 7.5,
                }

                cost.adminCost = {
                  MOD: 0,
                  CIF: 0,
                  profit: 0,
                }

                for (const adminCost of administrative_costs.data) {
                  const {
                    attributes: { title, value },
                  } = adminCost
                  if (title === 'MOD') cost.adminCost.MOD = monorailDoubleCost.hours * value
                  if (title === 'CIF') cost.adminCost.CIF = monorailDoubleCost.hours * value
                }

                for (const profile of profiles.data) {
                  // Perfiles pricipales
                  // Pisavidrio
                  if (profile.attributes.id_provider === '12476')
                    monorailDoubleCost.glazing_bead += profile.attributes.price
                  // Marco
                  if (profile.attributes.id_provider === '12461') monorailDoubleCost.frame += profile.attributes.price
                  // Hoja
                  if (profile.attributes.id_provider === '12471') {
                    monorailDoubleCost.sash += profile.attributes.price
                    monorailDoubleCost.transom += profile.attributes.price
                  }
                  // closing - tapas monoriel marco
                  if (profile.attributes.id_provider === '12469') monorailDoubleCost.closing += profile.attributes.price
                  // interlock
                  if (profile.attributes.id_provider === '12468')
                    monorailDoubleCost.interlock += profile.attributes.price
                  // fontal
                  if (profile.attributes.id_provider === '12669') monorailDoubleCost.frontal += profile.attributes.price
                  // Ref Marco
                  if (profile.attributes.id_provider === '12952') monorailDoubleCost.rFrame += profile.attributes.price
                  // Ref Hoja
                  if (profile.attributes.id_provider === '12987') {
                    monorailDoubleCost.rSash += profile.attributes.price
                    monorailDoubleCost.rTransom += profile.attributes.price
                  }
                }
                for (const accessory of accessories.data) {
                  // Haladera
                  if (accessory.attributes.id_provider === '13119')
                    monorailDoubleCost.handle += accessory.attributes.price
                  // Manija
                  if (accessory.attributes.id_provider === '13506')
                    monorailDoubleCost.cremone += accessory.attributes.price
                  // rueda
                  if (accessory.attributes.id_provider === '13189')
                    monorailDoubleCost.roller += accessory.attributes.price
                }
                for (const glassA of glasses.data) {
                  if (glassA.attributes.id_arqustik === glass) monorailDoubleCost.glass += glassA.attributes.price
                }
                // PVC
                cost.pvc = {
                  frame: monorailDoubleCost.frame * ((widthM + heightM) * 2),
                  sash: monorailDoubleCost.sash * ((widthM / 4 - 0.022) * 4 + (heightM - 0.064) * 4),
                  transom: monorailDoubleCost.transom * (heightM - 0.064) * 2,
                  closing: monorailDoubleCost.closing * (widthM + heightM * 2),
                  interlock: monorailDoubleCost.interlock * (heightM - 0.064) * 2,
                  frontal: monorailDoubleCost.frontal * (heightM - 0.064),
                  glazing_bead:
                    monorailDoubleCost.glazing_bead * ((widthM / 4 - 0.022) * 4 + (heightM - 0.064) * 4) * 2,
                }
                // Refuerzos
                cost.ref = {
                  frame: monorailDoubleCost.rFrame * ((widthM - 0.06 + heightM - 0.06) * 2),
                  sash: monorailDoubleCost.rSash * ((widthM / 4 - 0.022) * 4 + (heightM - 0.064) * 4),
                  transom: monorailDoubleCost.rTransom * (heightM - 0.064),
                }
                // Accesorios
                cost.accessories = {
                  handle: monorailDoubleCost.handle * 2,
                  cremone: monorailDoubleCost.cremone,
                  roller: monorailDoubleCost.roller * 4,
                  e_handle: monorailDoubleCost.e_handle,
                }
                // Vidrios
                cost.glasses = {
                  sash: (widthM / 4 - 0.022) * (heightM - 0.182) * monorailDoubleCost.glass * 2,
                  frame: (widthM / 4 + 0.022) * (heightM - 0.067) * monorailDoubleCost.glass * 2,
                }
                break
            }
            break

          case WindowTypeEnum.DOOR:
            switch (model) {
              case WindowModelsEnum.OX:
              case WindowModelsEnum.XO:
                const monorailCost = {
                  frame: 0,
                  sash: 0,
                  transom: 0,
                  closing: 0,
                  interlock: 0,
                  glazing_bead: 0,
                  rFrame: 0,
                  rSash: 0,
                  rTransom: 0,
                  handle: 0,
                  e_handle: 0,
                  cremone: 0,
                  roller: 0,
                  glass: 0,
                  hours: 6,
                }
                cost.adminCost = {
                  MOD: 0,
                  CIF: 0,
                  profit: 0,
                }

                for (const adminCost of administrative_costs.data) {
                  const {
                    attributes: { title, value },
                  } = adminCost
                  if (title === 'MOD') cost.adminCost.MOD = monorailCost.hours * value
                  if (title === 'CIF') cost.adminCost.CIF = monorailCost.hours * value
                }

                for (const profile of profiles.data) {
                  // Perfiles pricipales
                  // Pisavidrio
                  if (profile.attributes.id_provider === '12476') monorailCost.glazing_bead += profile.attributes.price
                  // Marco
                  if (profile.attributes.id_provider === '12461') monorailCost.frame += profile.attributes.price
                  // Hoja
                  if (profile.attributes.id_provider === '12474') {
                    monorailCost.sash += profile.attributes.price
                    monorailCost.transom += profile.attributes.price
                  }
                  // closing - tapas monoriel marco
                  if (profile.attributes.id_provider === '12469') monorailCost.closing += profile.attributes.price
                  // interlock
                  if (profile.attributes.id_provider === '12468') monorailCost.interlock += profile.attributes.price
                  // Ref Marco
                  if (profile.attributes.id_provider === '12952') monorailCost.rFrame += profile.attributes.price
                  // Ref Hoja
                  if (profile.attributes.id_provider === '12957') {
                    monorailCost.rSash += profile.attributes.price
                    monorailCost.rTransom += profile.attributes.price
                  }
                }
                for (const accessory of accessories.data) {
                  // Haladera
                  if (accessory.attributes.id_provider === '13119') monorailCost.e_handle += accessory.attributes.price
                  // Manija
                  if (accessory.attributes.id_provider === '12873') monorailCost.handle += accessory.attributes.price
                  // rueda
                  if (accessory.attributes.id_provider === '13189') monorailCost.roller += accessory.attributes.price
                  // cremone
                  if (accessory.attributes.id_provider === '13317') monorailCost.cremone += accessory.attributes.price
                }
                for (const glassA of glasses.data) {
                  if (glassA.attributes.id_arqustik === glass) monorailCost.glass += glassA.attributes.price
                }
                // PVC XO
                cost.pvc = {
                  frame: monorailCost.frame * ((widthM + heightM) * 2),
                  sash: monorailCost.sash * (widthM + heightM * 2),
                  glazing_bead: monorailCost.glazing_bead * (widthM + heightM * 2) * 2,
                  transom: monorailCost.transom * heightM,
                  closing: monorailCost.closing * (widthM + heightM),
                  interlock: monorailCost.interlock * heightM,
                  frontal: 0,
                }
                // Refuerzos XO
                cost.ref = {
                  frame: monorailCost.rFrame * ((widthM + heightM) * 2),
                  sash: monorailCost.rSash * (widthM + heightM * 2),
                  transom: monorailCost.rTransom * heightM,
                }
                // Accesorios XO
                cost.accessories = {
                  handle: monorailCost.handle,
                  cremone: monorailCost.cremone,
                  roller: monorailCost.roller * 2,
                  e_handle: monorailCost.e_handle,
                }
                // Vidrios XO
                cost.glasses = {
                  sash: (widthM / 2 - 0.113) * (heightM - 0.182) * monorailCost.glass,
                  frame: (widthM / 2 - 0.113) * (heightM - 0.067) * monorailCost.glass,
                }

                break
              case WindowModelsEnum.XX:
                const doubleRailCost = {
                  frame: 0,
                  sash: 0,
                  transom: 0,
                  closing: 0,
                  interlock: 0,
                  glazing_bead: 0,
                  rFrame: 0,
                  rSash: 0,
                  rTransom: 0,
                  handle: 0,
                  e_handle: 0,
                  cremone: 0,
                  roller: 0,
                  glass: 0,
                  hours: 6,
                }

                cost.adminCost = {
                  MOD: 0,
                  CIF: 0,
                  profit: 0,
                }

                for (const adminCost of administrative_costs.data) {
                  const {
                    attributes: { title, value },
                  } = adminCost
                  if (title === 'MOD') cost.adminCost.MOD = doubleRailCost.hours * value
                  if (title === 'CIF') cost.adminCost.CIF = doubleRailCost.hours * value
                }

                for (const profile of profiles.data) {
                  // Perfiles pricipales XX
                  // Pisavidrio
                  if (profile.attributes.id_provider === '12476')
                    doubleRailCost.glazing_bead += profile.attributes.price
                  // Marco XX
                  if (profile.attributes.id_provider === '12500') doubleRailCost.frame += profile.attributes.price
                  // Hoja XX
                  if (profile.attributes.id_provider === '12474') doubleRailCost.sash += profile.attributes.price
                  // interlock XX
                  if (profile.attributes.id_provider === '12468') doubleRailCost.interlock += profile.attributes.price
                  // Ref Marco XX
                  if (profile.attributes.id_provider === '12985') doubleRailCost.rFrame += profile.attributes.price
                  // Ref Hoja XX
                  if (profile.attributes.id_provider === '12957') doubleRailCost.rSash += profile.attributes.price
                }
                for (const accessory of accessories.data) {
                  // Tapa
                  if (accessory.attributes.id_provider === '13119')
                    doubleRailCost.e_handle += accessory.attributes.price
                  // Manija
                  if (accessory.attributes.id_provider === '13506') doubleRailCost.handle += accessory.attributes.price
                  // rueda
                  if (accessory.attributes.id_provider === '13189') doubleRailCost.roller += accessory.attributes.price
                  // cremone
                  if (accessory.attributes.id_provider === '13317') doubleRailCost.cremone += accessory.attributes.price
                }
                for (const glassA of glasses.data) {
                  if (glassA.attributes.id_arqustik === glass) doubleRailCost.glass += glassA.attributes.price
                }
                // PVC XX
                cost.pvc = {
                  frame: doubleRailCost.frame * ((widthM + heightM) * 2),
                  sash: doubleRailCost.sash * (widthM + heightM * 2) * 2,
                  interlock: doubleRailCost.interlock * heightM * 2,
                  glazing_bead: doubleRailCost.glazing_bead * (widthM + heightM * 2) * 2,
                  transom: 0,
                  closing: 0,
                  frontal: 0,
                }
                // Refuerzos XX
                cost.ref = {
                  frame: doubleRailCost.rFrame * ((widthM + heightM) * 2),
                  sash: doubleRailCost.rSash * (widthM + heightM * 2) * 2,
                  transom: 0,
                }
                // Accesorios XX
                cost.accessories = {
                  handle: doubleRailCost.handle * 2,
                  cremone: doubleRailCost.cremone * 2,
                  roller: doubleRailCost.roller * 4,
                  e_handle: doubleRailCost.e_handle * 2,
                }
                // VidriosXX
                cost.glasses = {
                  sash: (widthM / 2 - 0.113) * (heightM - 0.182) * doubleRailCost.glass * 2,
                  frame: 0,
                }

                break
              case WindowModelsEnum.OXX:
              case WindowModelsEnum.XXO:
              case WindowModelsEnum.XXX:
                const tripleRailCost = {
                  frame: 0,
                  sash: 0,
                  transom: 0,
                  closing: 0,
                  interlock: 0,
                  glazing_bead: 0,
                  // refuerzos
                  rFrame: 0,
                  rSash: 0,
                  rTransom: 0,
                  // accessories
                  handle: 0,
                  cremone: 0,
                  e_handle: 0,
                  roller: 0,
                  // glass
                  glass: 0,
                  frontal: 0,
                  hours: 8,
                }

                cost.adminCost = {
                  MOD: 0,
                  CIF: 0,
                  profit: 0,
                }

                for (const adminCost of administrative_costs.data) {
                  const {
                    attributes: { title, value },
                  } = adminCost
                  if (title === 'MOD') cost.adminCost.MOD = tripleRailCost.hours * value
                  if (title === 'CIF') cost.adminCost.CIF = tripleRailCost.hours * value
                }

                for (const profile of profiles.data) {
                  // Perfiles pricipales XXO XXX
                  // Pisavidrio
                  if (profile.attributes.id_provider === '12476')
                    tripleRailCost.glazing_bead += profile.attributes.price
                  // Marco XXO XXX
                  if (profile.attributes.id_provider === '12464') tripleRailCost.frame += profile.attributes.price
                  // Hoja XXO
                  if (profile.attributes.id_provider === '12474') tripleRailCost.sash += profile.attributes.price
                  // interlock XXO XXX
                  if (profile.attributes.id_provider === '12468') tripleRailCost.interlock += profile.attributes.price
                  // Frontal
                  // if (profile.attributes.id_provider === '12669') tripleRailCost.frontal += profile.attributes.price
                  // Ref Marco XXO XXX
                  if (profile.attributes.id_provider === '12985') tripleRailCost.rFrame += profile.attributes.price
                  // Ref Hoja XXO XXX
                  if (profile.attributes.id_provider === '12957') tripleRailCost.rSash += profile.attributes.price
                }
                for (const accessory of accessories.data) {
                  // Manija XXO XXX
                  if (accessory.attributes.id_provider === '12873') tripleRailCost.handle += accessory.attributes.price
                  // Cremona XXO XXX
                  if (accessory.attributes.id_provider === '13317') tripleRailCost.cremone += accessory.attributes.price
                  // rueda XXO XXX
                  if (accessory.attributes.id_provider === '13189') tripleRailCost.roller += accessory.attributes.price
                  // cremone
                  if (accessory.attributes.id_provider === '13119')
                    tripleRailCost.e_handle += accessory.attributes.price
                }
                // Vidrios
                for (const glassA of glasses.data) {
                  if (glassA.attributes.id_arqustik === glass) tripleRailCost.glass += glassA.attributes.price
                }
                // PVC XXO XXX
                cost.pvc = {
                  frame: tripleRailCost.frame * ((widthM + heightM) * 2),
                  sash: tripleRailCost.sash * (((widthM + 0.09) / 3) * 6 + (heightM - 0.064) * 6),
                  interlock: tripleRailCost.interlock * heightM * 4,
                  glazing_bead: tripleRailCost.glazing_bead * (((widthM + 0.09) / 3) * 6 + (heightM - 0.064) * 6),
                  frontal: 0,
                  transom: 0,
                  closing: 0,
                }
                // Refuerzos XX0 XXX
                cost.ref = {
                  frame: tripleRailCost.rFrame * ((widthM + heightM) * 2) * 2,
                  sash: tripleRailCost.rSash * ((widthM + 0.18) * 2 + (heightM - 0.08) * 6),
                  transom: 0,
                }
                // Accesorios XXX
                if (model === WindowModelsEnum.XXX) {
                  cost.accessories = {
                    handle: tripleRailCost.handle * 2,
                    cremone: tripleRailCost.cremone * 2,
                    roller: tripleRailCost.roller * 6,
                    e_handle: tripleRailCost.e_handle * 2,
                  }
                } else {
                  // Accesorios XX0
                  cost.accessories = {
                    handle: tripleRailCost.handle,
                    cremone: tripleRailCost.cremone,
                    roller: tripleRailCost.roller * 4,
                    e_handle: 0,
                  }
                }
                // VidriosXXO XXX
                cost.glasses = {
                  sash: (widthM / 3 - 0.273) * (heightM - 0.182) * tripleRailCost.glass * 3,
                  frame: 0,
                }
                break
              case WindowModelsEnum.OXXO:
                const monorailDoubleCost = {
                  frame: 0,
                  sash: 0,
                  transom: 0,
                  closing: 0,
                  interlock: 0,
                  glazing_bead: 0,
                  frontal: 0,
                  rFrame: 0,
                  rSash: 0,
                  rTransom: 0,
                  handle: 0,
                  e_handle: 0,
                  cremone: 0,
                  roller: 0,
                  glass: 0,
                  hours: 8,
                }
                cost.adminCost = {
                  MOD: 0,
                  CIF: 0,
                  profit: 0,
                }

                for (const adminCost of administrative_costs.data) {
                  const {
                    attributes: { title, value },
                  } = adminCost
                  if (title === 'MOD') cost.adminCost.MOD = monorailDoubleCost.hours * value
                  if (title === 'CIF') cost.adminCost.CIF = monorailDoubleCost.hours * value
                }

                for (const profile of profiles.data) {
                  // Perfiles pricipales
                  // Pisavidrio OXXO
                  if (profile.attributes.id_provider === '12476')
                    monorailDoubleCost.glazing_bead += profile.attributes.price
                  // Marco OXXO
                  if (profile.attributes.id_provider === '12461') monorailDoubleCost.frame += profile.attributes.price
                  // Hoja OXXO
                  if (profile.attributes.id_provider === '12474') {
                    monorailDoubleCost.sash += profile.attributes.price
                    monorailDoubleCost.transom += profile.attributes.price
                  }
                  // closing - tapas monoriel marco
                  if (profile.attributes.id_provider === '12469') monorailDoubleCost.closing += profile.attributes.price
                  // interlock OXXO
                  if (profile.attributes.id_provider === '12468')
                    monorailDoubleCost.interlock += profile.attributes.price
                  // fontal OXXO
                  if (profile.attributes.id_provider === '12669') monorailDoubleCost.frontal += profile.attributes.price
                  // Ref Marco OXXO
                  if (profile.attributes.id_provider === '12952') monorailDoubleCost.rFrame += profile.attributes.price
                  // Ref Hoja OXXO
                  if (profile.attributes.id_provider === '12957') {
                    monorailDoubleCost.rSash += profile.attributes.price
                    monorailDoubleCost.rTransom += profile.attributes.price
                  }
                }
                for (const accessory of accessories.data) {
                  // Tapa OXXO
                  // haladera
                  if (accessory.attributes.id_provider === '13119')
                    monorailDoubleCost.e_handle += accessory.attributes.price
                  // Manija OXXO
                  if (accessory.attributes.id_provider === '12873')
                    monorailDoubleCost.handle += accessory.attributes.price
                  //cremona OXXO
                  if (accessory.attributes.id_provider === '13317')
                    monorailDoubleCost.cremone += accessory.attributes.price
                  // rueda OXXO
                  if (accessory.attributes.id_provider === '13189')
                    monorailDoubleCost.roller += accessory.attributes.price
                }
                for (const glassA of glasses.data) {
                  if (glassA.attributes.id_arqustik === glass) monorailDoubleCost.glass += glassA.attributes.price
                }
                // PVC OXXO
                cost.pvc = {
                  frame: monorailDoubleCost.frame * ((widthM + heightM) * 2),
                  sash: monorailDoubleCost.sash * ((widthM / 4 - 0.022) * 4 + (heightM - 0.064) * 4),
                  transom: monorailDoubleCost.transom * (heightM - 0.064) * 2,
                  closing: monorailDoubleCost.closing * (widthM + heightM * 2),
                  interlock: monorailDoubleCost.interlock * (heightM - 0.064) * 2,
                  frontal: monorailDoubleCost.frontal * (heightM - 0.064),
                  glazing_bead:
                    monorailDoubleCost.glazing_bead * ((widthM / 4 - 0.022) * 4 + (heightM - 0.064) * 4) * 2,
                }
                // Refuerzos OXXO
                cost.ref = {
                  frame: monorailDoubleCost.rFrame * ((widthM - 0.06 + heightM - 0.06) * 2),
                  sash: monorailDoubleCost.rSash * ((widthM / 4 - 0.022) * 4 + (heightM - 0.064) * 4),
                  transom: monorailDoubleCost.rTransom * (heightM - 0.064),
                }
                // Accesorios OXXO
                cost.accessories = {
                  handle: monorailDoubleCost.handle * 2,
                  cremone: monorailDoubleCost.cremone,
                  roller: monorailDoubleCost.roller * 4,
                  e_handle: 0,
                }
                // Vidrios OXXO
                cost.glasses = {
                  sash: (widthM / 4 - 0.022) * (heightM - 0.182) * monorailDoubleCost.glass * 2,
                  frame: (widthM / 4 + 0.022) * (heightM - 0.067) * monorailDoubleCost.glass * 2,
                }
                break
            }
            break
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

      break

    default:
      break
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

  return newWindow
}
