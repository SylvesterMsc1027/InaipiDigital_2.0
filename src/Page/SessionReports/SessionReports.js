import React, { useState, useEffect } from "react";
import "../../assets/assets/assets_newchat/library/bootstrap-5.1.3/css/bootstrap.min.css";
import "../../assets/assets/assets_newchat/assets/fonts/fontawesome-free-6.1.1-web/css/all.css";
import "./sessionreport.css";
import "../../assets/assets/assets_newchat/library/animate/animate.min.css";
import "../../assets/assets/assets_newchat/library/slimselect/slimselect.min.css";
import {
  BaseUrl,
  frontendBaseurl,
  errorApi,
  excelDownloadUrl,
} from "../../container/BaseUrl/BaseUrl";
import FileSaver from "file-saver";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import { logoutApi } from "../../ApiCall/LogoutApi";
import { errorhandelApi } from "../../ApiCall/ErrorHandelApi";

// Component Imported
import Filterbutton from "../../components/agent-report-component/filter-button.component";
import Pagination from "../../components/agent-report-component/pagination.component";
import Sessiontable from "../../components/session-report-component/session-table.component";
import Sessionfilter from "../../components/session-report-component/session-filter.component";
import {
  sessionReportsApi,
  agentListDropdownApi,
} from "../../ApiCall/SessionReportApi";

const Sessionreport = () => {
  const [showfilter, setshowfilter] = useState("sidebar_filter");
  const tenantId = localStorage.getItem("TenantId");
  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];

  const [fromdate, setFromdate] = useState(defaultValue);
  const [todate, setTodate] = useState(defaultValue);
  const [status, setStatus] = useState("");
  const [agentid, setAgentid] = useState("");
  const [sessionreport, setSessionreport] = useState([]);
  const [agentlist, setAgentlist] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const basedOnRole = JSON.parse(localStorage.getItem("tokenAgent"));

  useEffect(() => {
    agentListdropdown();
  }, []);

  useEffect(() => {
    sessionReports();
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

  const getId = (item) => {
    console.log(item);
    sessionReports(item.id);
  };

  const sessionReports = () => {
    const credential = {
      status,
      fromdate,
      todate,
      page,
      basedOnRole,
      agentid,
      defaultValue,
    };
    sessionReportsApi(credential)
      .then((res) => {
        console.log("sessionReportsApi>>>>>>>", res);
        if (res.data.success == true) {
          console.log("resskillllllsessionReports", res.data.count);
          setSessionreport(res.data.Data);
          setPagination(res.data.count);
        } else {
          toast.warn("No Data Found", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setSessionreport([]);
          setPagination(0);
        }
      })
      .catch((error) => {
        errorHandel(error, "/reports/listDetails/");
        setShow(true);
      });
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const agentListdropdown = () => {
    agentListDropdownApi()
      .then((res) => {
        console.log("agentListDropdownApi>>>>>>", res);
        console.log("skillset Agent dropdownlist", res.data.data);
        setAgentlist(res.data.data);
      })
      .catch((err) => {
        setShow(true);
      });
  };

  const DownloadSessionReports = () => {
    const token = localStorage.getItem("access_token");

    let data = {
      agent_id: basedOnRole.id,
      status: status,
      from_date: fromdate,
      to_date: todate,
    };

    const header = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        tenantId: localStorage.getItem('TenantId'),
      },
    };

    axios
      .post(BaseUrl + "/reports/listDetailsExcel", data, header, {})
      .then((res) => {
        if (res.data.status == true) {
            let file = excelDownloadUrl + res.data.message;
            FileSaver.saveAs(file);
        
        } else {
          toast.warn("No Data Found", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
         
        }
      })
      .catch((error) => {
    console.log(error)
      });
  };


  return (
    <div className="sessiontable" style={{ overflow: "hidden" }}>
      <Sessionfilter
        showfilter={showfilter}
        setshowfilter={setshowfilter}
        fromdate={fromdate}
        setFromdate={setFromdate}
        todate={todate}
        setTodate={setTodate}
        setStatus={setStatus}
        setAgentid={setAgentid}
        agentlist={agentlist}
        sessionReports={sessionReports}
      />
      <Filterbutton setshowfilter={setshowfilter} DownloadSessionReports={DownloadSessionReports} />
      
      <section className="dashboard mt-1">
        <div className="container-fluid" style={{ paddingLeft: "1px" }}>
          <div className="wapper_sub">
            <div className="sub_wapper">
              <div className="container-fluid p-0">
                <div className="row">
                  <div className="col-md-12 p-0 animate__animated animate__fadeInUp all-ticket">
                    <div
                      className="tickt-table container-fluid"
                      style={{ height: "80vh" }}
                    >
                      <Sessiontable sessionreport={sessionreport} />
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

export default Sessionreport;
