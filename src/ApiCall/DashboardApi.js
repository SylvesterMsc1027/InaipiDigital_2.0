import axios from "axios";
import { BaseUrl } from "../container/BaseUrl/BaseUrl";
const token = localStorage.getItem("access_token");

//Supervisor DASHBOARD COUNT
export const dashboardCountDataApi = async () => {
  const token = localStorage.getItem("access_token");
  try {
    const header = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        tenantId: localStorage.getItem("TenantId"),
      },
    };
    const response = await axios.post(
      BaseUrl + "/dashboard/dashboardCount",
      {},
      header
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};
export const agentActivityCountApi = async ({ defaultValue, page }) => {
  const token = localStorage.getItem("access_token");
  try {
    const payload = {
      from_date: defaultValue,
      to_date: defaultValue,
      offset: page == 1 ? 0 : (page - 1) * 5,
      limit: 5,
    };

    const header = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        tenantId: localStorage.getItem("TenantId"),
      },
    };
    const response = await axios.post(
      BaseUrl + "/dashboard/chatCount",
      payload,
      header
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};

//Agent DASHBOARD COUNT
export const dashboardCountDataAgentApi = async () => {
  const agent = JSON.parse(localStorage.getItem("tokenAgent"));
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      BaseUrl + "/dashboard/taskCountByAgentId",
      {
        agent_id: agent.id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
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

