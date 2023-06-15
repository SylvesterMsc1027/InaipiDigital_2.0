import React, { useState, useEffect } from "react";
import "../../assets/assets/assets_newchat/library/bootstrap-5.1.3/css/bootstrap.min.css";
import "../../assets/assets/assets_newchat/assets/fonts/fontawesome-free-6.1.1-web/css/all.css";
import "../../assets/assets/assets_newchat/library/animate/animate.min.css";
import "../../assets/assets/assets_newchat/library/slimselect/slimselect.min.css";
import { agentReportDataApi } from "../../ApiCall/AgentReportApi";
import { Modal } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { logoutApi } from "../../ApiCall/LogoutApi";
import { errorhandelApi } from "../../ApiCall/ErrorHandelApi";

// component imported
import Agenttable from "../../components/agent-report-component/agent-table.component";
import Filterbutton from "../../components/agent-report-component/filter-button.component";
import Pagination from "../../components/agent-report-component/pagination.component";
import Agentfilter from "../../components/agent-report-component/agent-filter.component";



const Agentreport = () => {
  const [showfilter, setshowfilter] = useState("sidebar_filter");
  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];
  const [agentdata, setAgentdata] = useState([]);
  const [fromdate, setFromdate] = useState(defaultValue);
  const [todate, setTodate] = useState(defaultValue);
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    agentReportData();
  }, [page]);

 const errorHandel = async (data) => {
    const tenantID = localStorage.getItem("TenantId");
    try {
      errorhandelApi();
      if (data.status) {
        console.log("from error api", data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

 const logout = () => {
    const access_token = localStorage.getItem("access_token");
    let data = JSON.parse(localStorage.getItem("tokenAgent"));
    let userID = data.user_id;
    const id = localStorage.getItem("TenantId");

    if (data) {
      logoutApi().then((res) => {
        console.log("logoutApi", res);
      });
    }
  };



  const agentReportData = () => {
    const Credentials = { fromdate, todate, page, defaultValue };
    agentReportDataApi(Credentials)
      .then((res) => {
        console.log("agentReportDataApi>>>>>>>>>", res);
        if (res.data.success == true) {
          console.log("agentReport", res.data.Data);
          setAgentdata(res.data.Data);
          setPagination(res.data.count);
        }
      })
      .catch((error) => {
        errorHandel(error, "/dashboard/tasklist/");

        setShow(true);
      });
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="sessiontable" style={{ overflow: "hidden" }}>

      <Agentfilter
        showfilter={showfilter}
        setshowfilter={setshowfilter}
        fromdate={fromdate}
        setFromdate={setFromdate}
        todate={todate}
        setTodate={setTodate}
        agentReportData={agentReportData}
      />
      <Filterbutton setshowfilter={setshowfilter} />
      <section className="dashboard mt-3">
        <div className="container-fluid">
          <div className="wapper_sub">
            <div className="sub_wapper">
              <div className="container-fluid p-0">
                <div className="row">
                  <div className="col-md-12 p-0 animate__animated animate__fadeInUp all-ticket">
                    <div
                      className="tickt-table container-fluid"
                      style={{ height: "78vh" }}
                    >
                      <Agenttable agentdata={agentdata} />
                      <Pagination
                        pagination={pagination}
                        page={page}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{ height: "3rem", backgroundColor: "#294e9f" }}>
          <div className="d-flex justify-content-center align-items-center color-white fw-bold">
            <span>Alert</span>
          </div>
          <div className="d-flex">
            <AiFillCloseCircle color="white" onClick={handleClose} />
          </div>
        </Modal.Header>
        <Modal.Body className="fw-bold">
          Session Expired Please Login Again !
        </Modal.Body>

        <button className="btn btn-danger w-25 btn-sm ms-auto" onClick={logout}>
          Logout
        </button>
      </Modal>
    </div>
  );
};

export default Agentreport;
