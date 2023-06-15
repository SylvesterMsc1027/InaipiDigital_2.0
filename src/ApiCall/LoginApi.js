import axios from "axios";
import { BaseUrl } from "../container/BaseUrl/BaseUrl";

export const loginApi = async ({ email, pass,tenantId}) => {
  const credentials = {
    email,
    pass,
  };
  try {
    const response = await axios.post(`${BaseUrl}/users/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
        tenantId: tenantId,
      },
    });
    return response;
  } catch (error) {
    Promise.reject();
  }
};



