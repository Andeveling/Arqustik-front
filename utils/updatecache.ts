import { SystemsResponseI } from "@models/System.model";
import { arqustikConfig } from "arqustik.config";
import axios from "axios";
import fs from "fs";

const { STRAPI_SERVER } = arqustikConfig;

export const updateCache = async (jwt: string) => {
  try {
    const { data } = await axios.get<SystemsResponseI>(`${STRAPI_SERVER}/system-pvcs?populate=*`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (data) {
      const cache = JSON.stringify(data);
      fs.writeFile(`systemsCache.json`, cache, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    }
  } catch (error) {
    console.log(error);
  }
};
