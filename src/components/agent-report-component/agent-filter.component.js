import React from "react";

const agentfilter = (props) => {
  return (
    <>
      {" "}
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
                    onChange={(e) => props.setTodate(e.target.value)}
                    value={props.todate}
                  />
                </div>
              </div>
            </form>
            <div className="filter_submit">
              <div className="d-flex">
                <div className="col-md-12 ps-2">
                  <button
                    type="button"
                    className="btn btn-primary w-100 "
                    onClick={() => {
                      props.agentReportData();
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

export default agentfilter;
