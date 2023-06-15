import React, { useState } from "react";

function FilterTicket(props) {
  return (
    <>
      {props.opensidebarfilter && (
        <nav
          className="sidebar_filter"
          style={{
            position: "absolute",
            zIndex: "1",
            left: "62rem",
            width: "18rem",
            top: "58px",
          }}
        >
          <div className="filter col-md-3 shadow p-4 ">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="mb-0">Filter Ticket</p>
              <div className="dismiss ">
                <span
                  className="material-symbols-outlined"
                  onClick={props.closeopenSidebarfilter}
                >
                  close
                </span>
              </div>
            </div>

            <div className="filter_form">
              <form className=" fillter_form2 ">
                <div className="mb-3 d-flex flex-column text-start">
                  <label for="Select" className="form-label">
                    Filter by
                  </label>
                  <select
                    className="form-select facility_select"
                    aria-label="Default select example"
                  >
                    <option value="3">Custom</option>
                    <option value="1">Date created</option>
                    <option value="2">Due by time</option>
                    <option value="3">Last modified</option>
                    <option value="3">Priority</option>
                    <option value="3">Status</option>
                    <option value="3">Ascending</option>
                    <option value="3">Descending</option>
                  </select>
                </div>
                <div className="custom_div">
                  <div className="mb-3 d-flex flex-column text-start">
                    <label for="fromdate" className="form-label">
                      From
                    </label>
                    <input
                      type="date"
                      className="form-control facility_select"
                      id=""
                      aria-describedby="date"
                    />
                  </div>
                  <div className="mb-3 d-flex flex-column text-start">
                    <label for="todate" className="form-label">
                      To
                    </label>
                    <input
                      type="date"
                      className="form-control facility_select"
                      id=""
                      aria-describedby="date"
                    />
                  </div>
                </div>

                <div className="mb-3 d-flex flex-column text-start">
                  <label for="Select" className="form-label">
                    Search By Ticket ID
                  </label>
                  <select
                    className="form-select facility_select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select ID</option>
                    <option value="1">#123456</option>
                    <option value="2">12345226</option>
                    <option value="3">123452216</option>
                  </select>
                </div>
              </form>
              <div className="filter_submit">
                <div className="d-flex">
                  <div className="col-md-6   pe-2 ">
                    <button
                      type="button"
                      className="btn btn-outline-danger w-100"
                      onClick={props.closeopenSidebarfilter}
                    >
                      Reset
                    </button>
                  </div>

                  <div className="col-md-6 ps-2">
                    <button
                      type="button"
                      className="btn btn-primary2 w-100 apply-btn"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default FilterTicket;
