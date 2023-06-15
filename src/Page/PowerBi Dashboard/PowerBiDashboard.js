import React from "react";

const PowerBiDashboard = () => {
  return (
    <>
      <div className="d-flex justify-content-center h-100 w-100" style={{marginTop:'150px'}}>
      <iframe
          src="https://app.powerbi.com/reportEmbed?reportId=f7d77f2d-d1cc-40f9-9d7b-9e16fe76d0a7&autoAuth=true&ctid=7433e884-416d-49a2-81a4-5cedf12536e6&refreshAccessToken=true"
          width="100%"
          height="90%"
        ></iframe>
      </div>
    </>
  );
};

export default PowerBiDashboard;
