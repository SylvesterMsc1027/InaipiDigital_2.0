import axios from "axios";
import { BaseUrl } from '../container/BaseUrl/BaseUrl';

export const sessionReportsApi = async ({status,fromdate,todate,page,basedOnRole,agentId,defaultValue}) => {
    const token = localStorage.getItem("access_token");
    const tenantID = localStorage.getItem("TenantId");
    try {
        let datas = {
            agent_id: basedOnRole.role == "Supervisor" ? agentId : basedOnRole.id,
            status: status,
            from_date: fromdate?fromdate:defaultValue,
            to_date: todate?todate:defaultValue,
            limit: 4,
            offset: page == 1 ? 0 : (page - 1) * 4,
          };
      const header = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          tenantId: tenantID,
        },
      };
      console.log(datas)
      const response = await axios.post(
        BaseUrl + "/reports/listDetails",
        datas,
        header
      );
      return response;
    } catch (error) {
      Promise.reject();
    }
  };
  

  export const agentListDropdownApi = async () => {
    const tenantID = localStorage.getItem("TenantId");
    const token = localStorage.getItem("access_token");
    try {
      const header = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          tenantId: tenantID,
        },
      };
      const response = await axios.post(
        BaseUrl + "/users/listagentList",
        {},
        header,
      );
      return response;
    } catch (error) {
      Promise.reject();
    }
  };

  