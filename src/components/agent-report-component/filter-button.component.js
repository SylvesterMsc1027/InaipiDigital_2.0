import React from "react";

const filterbutton = (props) => {
  return (
    <>
      <header className="header_role ">
        <div className="conatiner-fluid">
          <nav
            className="navbar "
            style={{ paddingTop: "0px", paddingBottom: "0px" }}
          >
            <div className="container-fluid p-0">
              <div className="hed_left d-flex"></div>
              <div className="hed_right d-flex ">
                <button
                  type="button"
                  onClick={props.DownloadSessionReports}
                  className="btn btn-primary-1 me-2 d-flex-p btn-sm open-filter"
                  style={{ background: "#1473e6", color: "white" }}
                >
                  <span class="material-symbols-outlined">download</span>
                  Download
                </button>
                <button
                  type="button"
                  className="btn btn-primary-1 me-2 d-flex-p btn-sm open-filter"
                  style={{ background: "#1473e6", color: "white" }}
                  onClick={() => {
                    props.setshowfilter("sidebar_filter active-r");
                  }}
                >
                  <span className="material-symbols-outlined me-1">
                    {" "}
                    filter_list
                  </span>
                  Filters
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default filterbutton;
