import axios from "axios";
import { errorApi } from "../container/BaseUrl/BaseUrl";

export const errorhandelApi = async (error, endpoint) => {
  const payload = {
    servicename: "DCCCHAT",
    logs: error,
    description: endpoint,
  };
  try {
    const header = {
        headers: {
          tenantid: localStorage.getItem("TenantId"),
        },
      };

    const response = await axios.post(
      errorApi + "/UIlogs/createLogs",
      payload,
      header,
      );
    return response;
  } catch (error) {
    Promise.reject();
  }
};
