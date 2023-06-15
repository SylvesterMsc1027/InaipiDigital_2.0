import React from "react";

const sessionfilter = (props) => {
  const basedOnRole = JSON.parse(localStorage.getItem("tokenAgent"));
  return (
    <>
      <nav className={props.showfilter} style={{ top: "59px" }}>
        <div className="filter col-md-12 shadow p-4 ">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0">Filters</p>
            <div className="dismiss ">
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  props.setshowfilter("sidebar_filter");
                }}
              >
                cancel
              </span>
            </div>
          </div>

          <div className="filter_form">
            <form className=" fillter_form2 " style={{ height: "68vh" }}>
              <div className="custom_div">
                <div className="mb-3 d-flex flex-column text-start">
                  <label htmlFor="fromdate" className="form-label">
                    From
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id=""
                    aria-describedby="date"
                    value={props.fromdate}
                    onChange={(e) => props.setFromdate(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex flex-column text-start">
                  <label htmlFor="todate" className="form-label">
                    To
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id=""
                    aria-describedby="date"
                    value={props.todate}
                    onChange={(e) => props.setTodate(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 d-flex flex-column text-start">
                <label htmlFor="Select" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => props.setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Accept">Chat Accepted</option>
                  <option value="chatEnded">Chat Ended</option>
                  <option value="queued">Queued</option>
                  <option value="customerdisconnect">
                    Customer Disconnect
                  </option>
                </select>
              </div>

              <div className="mb-3 d-flex flex-column text-start">
                <label htmlFor="Select" className="form-label">
                  {basedOnRole == "Supervisor" ? (
                    <p className="mx-1">Agent Name : </p>
                  ) : (
                    ""
                  )}
                </label>
                {basedOnRole.role == "Supervisor" ? (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => props.setAgentid(e.target.value)}
                  >
                    <option value="">Select Agent Name</option>
                    {props.agentlist.map((item) => {
                      return <option key={item.id} value={item.id}>{item.username}</option>;
                    })}
                  </select>
                ) : (
                  ""
                )}
              </div>
            </form>
            <div className="filter_submit">
              <div className="d-flex">
                <div className="col-md-12 ps-2">
                  <button
                    type="button"
                    className="btn btn-primary w-100 text-white"
                    onClick={() => {
                      props.sessionReports();
                      props.setshowfilter("sidebar_filter");
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default sessionfilter;
