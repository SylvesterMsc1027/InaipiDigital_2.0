import React,{useState} from 'react'

function CreateTicket(props) {

  return (
    <>
         {props.opensidebarticket && (
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
              <p className="mb-0">Create Ticket</p>
              <div className="dismiss ">
                <span
                  className="material-symbols-outlined"
                  onClick={props.closeopenSidebar}
                >
                  close
                </span>
              </div>
            </div>

            <div className="filter_form">
              <form className=" fillter_form2 ">
                <div className="mb-1 d-flex flex-column text-start">
                  <label for="Select" className="form-label">
                    Department
                  </label>
                  <select
                    className="form-select facility_select"
                    aria-label="Default select example"
                  >
                    <option value="System">System</option>
                    <option value="IT">IT</option>
                  </select>
                </div>

                <div className="mb-1 d-flex flex-column text-start ">
                  <label for="Select" className="form-label">
                    Facility
                  </label>
                  <select
                    className="form-select facility_select "
                    aria-label="Default select example"
                  >
                    <option value="ADC">ADC</option>
                    <option value="ZETDC">ZETDC</option>
                    <option value="MOE">MOE</option>
                    <option value="MOCD">MOCD</option>
                    <option value="MOECP">MOECP</option>
                    <option value="HCT">HCT</option>
                  </select>
                </div>

                <div className="mb-3 d-flex flex-column text-start">
                  <label for="Select" className="form-label">
                    Priority
                  </label>
                  <select
                    className="form-select facility_select"
                    aria-label="Default select example"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="mb-1 d-flex flex-column text-start">
                  <label for="Select" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select facility_select"
                    aria-label="Default select example"
                  >
                    <option value="Open">Open</option>
                    <option value="Inprogress">Inprogress</option>
                    <option value="Onhold">Onhold</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Example textarea
                  </label>
                  <textarea
                    className="form-control facility_select"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </form>
              <div className="filter_submit">
                <div className="d-flex">
                  <div className="col-md-6   pe-2 ">
                    <button
                      type="button"
                      className="btn btn-outline-danger w-100"
                      onClick={props.closeopenSidebar}
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
  )
}

export default CreateTicket;