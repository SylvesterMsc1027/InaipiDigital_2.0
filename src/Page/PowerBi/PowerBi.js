import React from "react";

const PowerBi = () => {
  return (
    <>
      <div className="d-flex justify-content-center h-100 w-100" style={{marginTop:'150px'}}>
        <iframe
          src="https://app.powerbi.com/reportEmbed?reportId=74910833-4ad4-451c-b851-379ba56cb317&autoAuth=true&ctid=7433e884-416d-49a2-81a4-5cedf12536e6"
          width="100%"
          height="90%"
        ></iframe>
      </div>
    </>
  );
};

export default PowerBi;
