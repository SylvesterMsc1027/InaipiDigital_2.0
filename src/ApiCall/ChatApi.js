import axios from "axios";
import { BaseUrl } from "../container/BaseUrl/BaseUrl";

// CONTACT LIST MODEL API
export const getDataOnloadApi = async () => {
  const access_token = localStorage.getItem("access_token");
  const datas = await JSON.parse(localStorage.getItem("tokenAgent"));
  try {
    const response = await axios.post(
      `${BaseUrl}/users/allUsers?agent_id=${datas.id}`,
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
export const getDataApi = async () => {
  const access_token = localStorage.getItem("access_token");
  const datas = await JSON.parse(localStorage.getItem("tokenAgent"));
  try {
    const response = await axios.post(
      `${BaseUrl}/users/getIncomingUsers/${datas.id}`,
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
export const acceptClientApi = async (client) => {
  const access_token = localStorage.getItem("access_token");
  const datas = await JSON.parse(localStorage.getItem("tokenAgent"));
  try {
    const response = await axios.post(
      `${BaseUrl}/users/agentConfirmation?agent_id=${datas.id}&client_id=${client.id}&status=Accept&user_id=${datas.user_id}`,
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

export const getDataAfterAcceptClientApi = async () => {
  const access_token = localStorage.getItem("access_token");
  const datas = await JSON.parse(localStorage.getItem("tokenAgent"));
  try {
    const response = await axios.post(
      `${BaseUrl}/users/allUsers?agent_id=${datas.id}`,
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
export const rejectChatApi = async ({
  chat_session_id,
  passUserId,
  agentid,
  skillset,
  language,
  phonenumber,
  channel,
  id,
}) => {
  const access_token = localStorage.getItem("access_token");
  let datas2 = {
    chat_session_id: chat_session_id,
    userID: passUserId,
    agentID: agentid,
    skillset: skillset,
    language: language,
    phone: phonenumber,
    channel: channel,
    session_id: id,
  };
  try {
    const response = await axios.post(BaseUrl + "/users/rejectchat", datas2, {
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
        tenantId: localStorage.getItem("TenantId"),
      },
    });
    return response;
  } catch (error) {
    Promise.reject();
  }
};
export const getInternalAgentsApi = async () => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      BaseUrl + "/users/availableInternalAgents",
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
export const getAllInternalAgentsApi = async (val) => {
  const access_token = localStorage.getItem("access_token");
  const datas = await JSON.parse(localStorage.getItem("tokenAgent"));
  let body = {
    create: val,
  };
  try {
    const response = await axios.post(
      BaseUrl + `/users/allInternalUsers?agent_id=${datas.id}`,
      body,
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
export const getAllInternalAgentsApi2 = async () => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      BaseUrl + "/users/availableInternalAgents",
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
export const createInternalChatApi = async (UserId) => {
  const access_token = localStorage.getItem("access_token");
  const getAgent = await JSON.parse(localStorage.getItem("tokenAgent"));
  let agentId = getAgent.id;
  const body = {
    userId: UserId,
    agentId: agentId,
  };
  try {
    const response = await axios.post(
      `${BaseUrl}/users/createInternalAgentsSession`,
      body,
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
// CONTACT LIST MODEL API






export const transferAgentSubmitApi = async ({
  sessionId,
  agentTransferId,
}) => {
  const access_token = localStorage.getItem("access_token");
  let dataToPass = {
    sessionId: sessionId,
    agentId: agentTransferId,
  };
  try {
    const response = await axios.post(
      `${BaseUrl}/users/transferAgent`,
      dataToPass,
      {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    Promise.reject();
  }
};
export const getIncomingUsersApi = async () => {
  const access_token = localStorage.getItem("access_token");
  const datas = await JSON.parse(localStorage.getItem("tokenAgent"));
  try {
    const { data } = await axios.post(
      `${BaseUrl}/users/getIncomingUsers/${datas.id}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    Promise.reject();
  }
};
