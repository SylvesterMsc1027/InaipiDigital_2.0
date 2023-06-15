import React, { useState } from "react";
import FilterTicket from "./Ticket-history-child-component/Filter-Ticket";
import CreateTicket from "./Ticket-history-child-component/Create-Ticket";

const Tickethistory = (props) => {
  const [opensidebarticket, setOpensidebarticket] = useState(false);
  const [opensidebarfilter, setOpenSidebarfilter] = useState(false);

  const handelopenSidebar = () => {
    setOpensidebarticket(true);
  };
  const closeopenSidebar = () => {
    setOpensidebarticket(false);
  };

  const handelopenSidebarfilter = () => {
    setOpenSidebarfilter(true);
  };
  const closeopenSidebarfilter = () => {
    setOpenSidebarfilter(false);
  };

  return (
    <>
      <div
        className={props.TicketTab}
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <div className="d-flex justify-content-between align-items-center m-2">
          <div className="tickt-name">TICKET HISTORY</div>
          <div className="d-flex">
            <input
              type="Date"
              className="form-control form-control-sm w-100 me-3"
              style={{ cursor: "pointer" }}
              // onChange={(e) => {
              //   getSessionsDetails(e.target.value);
              //   setGetsessionsbydate(e.target.value);
              // }}
              // value={getsessionsbydate}
            />
             <button
              type="button"
              onClick={() => handelopenSidebar()}
              className="btn btn-primary d-flex-p btn-sm open-filter d-flex justify-content-center align-items-center"
            >
              <div>
                <span className="material-symbols-outlined mt-1">add</span>
              </div>
            </button>
            <button
              type="button"
              onClick={handelopenSidebarfilter}
              className="btn btn-primary d-flex-p ms-2 btn-sm open-filter"
            >
              <span className="material-symbols-outlined mt-1">
                filter_list
              </span>
            </button>
          </div>

        </div>
        <div className="time-line-main m-2 p-2">
          <ul className="timeline">
            <li className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="d-flex flex-wrap">
                  <div className="d-flex">
                    <strong>Agent :</strong>
                    <p className="mb-0 ms-1">Janani,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Ticket ID :</strong>
                    <p className="mb-0 ms-1">D1234567ED,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Created Time :</strong>
                    <p className="mb-0 ms-1"> 10:10 AM,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Date:</strong>
                    <p className="mb-0 ms-1">10/01/2023,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Status:</strong>
                    <p className="mb-0 ms-1 text-success">Open</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="d-flex flex-wrap">
                  <div className="d-flex">
                    <strong>Agent :</strong>
                    <p className="mb-0 ms-1">Janani,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Ticket ID :</strong>
                    <p className="mb-0 ms-1">D1234567ED,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Created Time :</strong>
                    <p className="mb-0 ms-1"> 10:10 AM,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Date:</strong>
                    <p className="mb-0 ms-1">10/01/2023,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Status:</strong>
                    <p className="mb-0 ms-1 text-success">Open</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="d-flex flex-wrap">
                  <div className="d-flex">
                    <strong>Agent :</strong>
                    <p className="mb-0 ms-1">Janani,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Ticket ID :</strong>
                    <p className="mb-0 ms-1">D1234567ED,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Created Time :</strong>
                    <p className="mb-0 ms-1"> 10:10 AM,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Date:</strong>
                    <p className="mb-0 ms-1">10/01/2023,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Status:</strong>
                    <p className="mb-0 ms-1 text-success">Open</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="d-flex flex-wrap">
                  <div className="d-flex">
                    <strong>Agent :</strong>
                    <p className="mb-0 ms-1">Janani,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Ticket ID :</strong>
                    <p className="mb-0 ms-1">D1234567ED,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Created Time :</strong>
                    <p className="mb-0 ms-1"> 10:10 AM,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Date:</strong>
                    <p className="mb-0 ms-1">10/01/2023,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Status:</strong>
                    <p className="mb-0 ms-1 text-success">Open</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="d-flex flex-wrap">
                  <div className="d-flex">
                    <strong>Agent :</strong>
                    <p className="mb-0 ms-1">Janani,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Ticket ID :</strong>
                    <p className="mb-0 ms-1">D1234567ED,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Created Time :</strong>
                    <p className="mb-0 ms-1"> 10:10 AM,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Date:</strong>
                    <p className="mb-0 ms-1">10/01/2023,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Status:</strong>
                    <p className="mb-0 ms-1 text-success">Open</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="d-flex flex-wrap">
                  <div className="d-flex">
                    <strong>Agent :</strong>
                    <p className="mb-0 ms-1">Janani,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Ticket ID :</strong>
                    <p className="mb-0 ms-1">D1234567ED,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Created Time :</strong>
                    <p className="mb-0 ms-1"> 10:10 AM,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Date:</strong>
                    <p className="mb-0 ms-1">10/01/2023,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Status:</strong>
                    <p className="mb-0 ms-1 text-success">Open</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="d-flex flex-wrap">
                  <div className="d-flex">
                    <strong>Agent :</strong>
                    <p className="mb-0 ms-1">Janani,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Ticket ID :</strong>
                    <p className="mb-0 ms-1">D1234567ED,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Created Time :</strong>
                    <p className="mb-0 ms-1"> 10:10 AM,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Date:</strong>
                    <p className="mb-0 ms-1">10/01/2023,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Status:</strong>
                    <p className="mb-0 ms-1 text-success">Open</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="d-flex flex-wrap">
                  <div className="d-flex">
                    <strong>Agent :</strong>
                    <p className="mb-0 ms-1">Janani,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Ticket ID :</strong>
                    <p className="mb-0 ms-1">D1234567ED,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Created Time :</strong>
                    <p className="mb-0 ms-1"> 10:10 AM,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Date:</strong>
                    <p className="mb-0 ms-1">10/01/2023,</p>
                  </div>
                  <div className="d-flex">
                    <strong>Status:</strong>
                    <p className="mb-0 ms-1 text-success">Open</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <CreateTicket
        opensidebarticket={opensidebarticket}
        closeopenSidebar={closeopenSidebar}
      />

      <FilterTicket
        opensidebarfilter={opensidebarfilter}
        closeopenSidebarfilter={closeopenSidebarfilter}
      />
    </>
  );
};

export default Tickethistory;
