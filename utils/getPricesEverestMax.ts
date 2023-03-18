import { AdminCost } from '@models/AdminCost.model';
import { Glass } from '@models/Glass.model';
import { ProjectData } from '@models/ProjectData';
import { Service } from '@models/Service.model';
import { WindowCost } from '@models/WindowCost';
import { WindowModel } from '@models/WindowModels.model';
import { CreateWindowFormPVCI, WindowPVC } from '@models/WindowPVC.model';
import { getSystem } from './getSystem';

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
  projectData,
  quotationID,
  unmount,
}: CreateWindowFormPVCI) => {
  const window = new WindowPVC(title, location, width, height);

  const everest = await getSystem(system);

  if (everest) {
    const {
      data: {
        attributes: { profiles, accessories, glasses, administrative_costs, services, window_models },
      },
    } = everest;

    const adminCosts = new AdminCost(administrative_costs.data);
    const cost = new WindowCost();
    const newGlass = new Glass(glasses.data, glass);
    const { installation, polyurethane, protection, silicone, transport } = projectData;
    const projectConfig = new ProjectData(installation, polyurethane, transport, silicone, protection, unmount);
    const modelWindow = new WindowModel(model, window_models);
    const servicesPrices = new Service(projectConfig, services.data);
    cost.setCost(
      type,
      model,
      profiles.data,
      accessories.data,
      window,
      newGlass,
      servicesPrices,
      modelWindow.hours,
      adminCosts,
    );
    // le asignamos el nombre al objeto con el que venimos trabajando para evitar por ahora un error
    cost.glass = newGlass.title;

    // console.log(cost);
    // console.log({ id: quotationID, type: typeof quotationID });
    const newWindow = {
      title,
      location,
      quotation: quotationID,
      cost: cost.costWindow,
      profit: cost.profitWindow,
      price: cost.profitWindow + cost.costWindow,
      glass: newGlass.title,
      system: system,
      type: type,
      cant,
      width,
      height,
      model,
      color,
      description: cost.description,
    };

    return newWindow;
  } // llamada al systema
};
