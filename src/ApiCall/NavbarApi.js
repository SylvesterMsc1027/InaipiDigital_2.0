import axios from "axios";
import { BaseUrl, AvcUrl, errorApi } from "../container/BaseUrl/BaseUrl";
const access_token = localStorage.getItem("access_token");
let agentLoginTerminalId = localStorage.getItem("agentLoginTerminalId");
let ssToken = localStorage.getItem("ssoToken");

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

export const NavbarlogoutApi = async () => {
  const access_token = localStorage.getItem("access_token");
  let data = await JSON.parse(localStorage.getItem("tokenAgent"));
  let userID = data.user_id;
  const id = localStorage.getItem("TenantId");
  try {
    console.log("logoutapi");
    const response = await axios.post(
      BaseUrl + "/users/logoutnew/" + userID,
      {},
      {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          tenantId: localStorage.getItem("TenantId"),
        },
      }
    );
    return response;
  } catch (error) {
    // Promise.reject();
    errorHandel(error, "/users/logoutnew/");
    console.log(error);
  }
};

export const updateStatusApi = async (value, data) => {
  try {
    const response = await axios.post(
      BaseUrl + "/users/updateAgentStatus/",
      {
        status: value,
        userId: data.user_id,
      },
      {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          tenantId: localStorage.getItem("TenantId"),
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};

export const loginbyDomainforAgentApi = async () => {
  try {
    const response = await axios.post(
      AvcUrl +
        `/voice/cct/agent/${agentLoginTerminalId}/login/${agentLoginTerminalId}?status=Ready`,
      {},

      {
        headers: {
          ssoToken: ssToken,
          tenantId: localStorage.getItem("TenantId"),
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};

export const loginbyDomainApi = async () => {
  let avayauser = localStorage.getItem("AvayaUsername");
  let avayapass = localStorage.getItem("AvayaPassword");
  let avayaDomain = localStorage.getItem("AvayaDomain");

  try {
    const response = await axios.post(
      AvcUrl +
        `/voice/cct/login?username=${avayauser}&password=${avayapass}&domain=${avayaDomain}`,
      {},
      {
        headers: {
          tenantId: localStorage.getItem("TenantId"),
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};

export const logoutByDomainSecondApi = async ({}) => {
  try {
    const response = await axios.post(
      AvcUrl + "/voice/cct/logout?username=Agent20",
      {},
      {
        headers: {
          ssoToken: ssToken,
          tenantId: localStorage.getItem("TenantId"),
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};

export const logoutByDomainFirstApi = async ({}) => {
  try {
    const response = await axios.post(
      AvcUrl +
        `/voice/cct/agent/${agentLoginTerminalId}/logout/${agentLoginTerminalId}`,
      {},
      {
        headers: {
          ssoToken: ssToken,
          tenantId: localStorage.getItem("TenantId"),
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};

export const changeStatusnewApi = async (status) => {
  try {
    const response = await axios.post(
      AvcUrl +
        `/voice/cct/agent/${agentLoginTerminalId}/status?status=` +
        status,
      {
        headers: {
          ssoToken: ssToken,
          tenantId: localStorage.getItem("TenantId"),
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};

export const userStatusApi = async () => {
  try {
    const response = await axios.post(
      BaseUrl + "/userstatus/userstatuslist",
      {},
      {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          tenantId: localStorage.getItem("TenantId"),
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};
