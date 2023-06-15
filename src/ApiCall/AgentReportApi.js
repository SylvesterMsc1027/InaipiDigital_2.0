import axios from "axios";
import { BaseUrl } from '../container/BaseUrl/BaseUrl';

export const agentReportDataApi = async ({fromdate,todate,page,defaultValue}) => {
    const token = localStorage.getItem("access_token");
    try {
        let datas = {
            from_date: fromdate?fromdate:defaultValue,
            to_date: todate?todate:defaultValue,
            offset: page == 1 ? 0 : (page-1) *4,
            limit: 4
          };
        
      const header = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          tenantId: localStorage.getItem("TenantId"),
        },
      };
      const response = await axios.post(
        BaseUrl + "/dashboard/tasklist",
        datas,
        header
      );
      return response;
    } catch (error) {
      Promise.reject();
    }
  };
  