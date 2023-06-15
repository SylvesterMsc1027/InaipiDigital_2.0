import axios from "axios";
import { BaseUrl,errorApi } from '../container/BaseUrl/BaseUrl'

const errorHandel = async (error, endpoint) => {
  const tenantID = localStorage.getItem("TenantId");
  try {
    const payload = {
      servicename: "DCCCHAT",
      logs: error,
      description: endpoint,
    };

    const header = {
      headers: {
        // Authorization: "Bearer " + token,
        // "Content-Type": "application/json",
        tenantid: tenantID,
      },
    };
    const { data } = await axios.post(
      errorApi + "/UIlogs/createLogs",
      payload,
      header
    );
    if (data.status) {
      console.log("from error api", data);
    }
  } catch (error) {
    console.log("error", error);
  }
};


export const logoutApi = async (userid) => {
  try {
    console.log('logoutapi',)
      const response = await axios.post(
        BaseUrl + "/users/logout/" + userid,
      );
      return response;
    } catch (error) {
      // Promise.reject();
      errorHandel(error, "/users/logoutnew/");
      console.log(error);
      
    }
  };