import React, { useEffect, useState } from "react";
import "../../assets/assets/css/main.css";
import "./dashboard.css";
import grouplogo from "../../assets/assets/dashboard_logo/dashboard_logo/group.png";
import agentactive from "../../assets/assets/dashboard_logo/dashboard_logo/group-users.png";
import agentdeactive from "../../assets/assets/dashboard_logo/dashboard_logo/red.png";
import readytotalk from "../../assets/assets/dashboard_logo/dashboard_logo/employee.png";
import notReady from "../../assets/assets/dashboard_logo/dashboard_logo/agentbusy.png";
import completedtask from "../../assets/assets/dashboard_logo/dashboard_logo/completed-task.png";
import breaktime from "../../assets/assets/dashboard_logo/dashboard_logo/breaktime.png";
import activeagent from "../../assets/assets/dashboard_logo/dashboard_logo/activeagent.png";
import disconnected from "../../assets/assets/dashboard_logo/dashboard_logo/disconnected.png";
import notification from "../../assets/assets/dashboard_logo/dashboard_logo/notification.png";
import { Badge, Card } from "react-bootstrap";
import { AiFillCloseCircle, AiFillWechat } from "react-icons/ai";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsChatText } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

// component import
import Pagination from "../../components/agent-report-component/pagination.component";

// Api import
import {
  dashboardCountDataApi,
  dashboardCountDataAgentApi,
  agentActivityCountApi,
} from "../../ApiCall/DashboardApi";
import { logoutApi } from "../../ApiCall/LogoutApi";
import { errorhandelApi } from "../../ApiCall/ErrorHandelApi";

const Dashboard = () => {
  const basedOnRole = JSON.parse(localStorage.getItem("tokenAgent"));
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("tokenAgent"));
  const [dashboardcount, setDashboardcount] = useState([]);
  const [teamactivitydashboardcount, setTeamactivitydashboardcount] = useState(
    []
  );
  const [dashboardcountagent, setDashboardcountagent] = useState([]);
  const [dashboardcountagentbasedonid, setDashboardcountagentbasedonid] =
    useState([]);
  const [agentlist, setAgentlist] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(1);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];

  const [rotateChevron, setRotateChevron] = useState(false);
  const handleRotate = () => {
    if (basedOnRole.role == "Supervisor") {
      dashboardCountData();
      agentActivityCount();
    } else {
      dashboardCountDataAgent();
    }
    setRotateChevron(!rotateChevron);
  };

  const rotate = rotateChevron ? "rotate(360deg)" : "rotate(0)";

  useEffect(() => {
    if (basedOnRole.role == "Supervisor") {
      agentActivityCount();
      dashboardCountData();
    } else {
      dashboardCountDataAgent();
    }
  }, [page]);

  //  CURRENT TIME FUNCTION
  var time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);
  const updateTime = () => {
    var time = new Date().toLocaleTimeString();
    setCtime(time);
  };
  setInterval(updateTime, 1000);
  var m_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var d = new Date();
  var month = m_names[d.getMonth()];

  const logout = () => {
    let data = JSON.parse(localStorage.getItem("tokenAgent"));
    let userID = data.user_id;
    logoutApi(userID).then((res) => {
      navigate("/");
    });
  };

  //Supervisor
  const dashboardCountData = () => {
    try {
      dashboardCountDataApi()
        .then((res) => {
          console.log("dashboardcountvalue", res);
          setDashboardcount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      errorhandelApi(error, "/dashboard/dashboardCount");
      setShow(true);
    }
  };

  const agentActivityCount = (id) => {
    const credential = { defaultValue, page };
    try {
      agentActivityCountApi(credential).then((res) => {
        console.log("agentActivityCount", res);
        if (res.data.success) {
          setTeamactivitydashboardcount(res.data.Data);
          setPagination(res.data.count);
        } else {
          setTeamactivitydashboardcount([]);
        }
      });
    } catch (error) {
      errorhandelApi(error, "/dashboard/chatCount");
      setShow(true);
    }
  };

  //Agent
  const dashboardCountDataAgent = () => {
    const agentId = JSON.parse(localStorage.getItem("tokenAgent"));
    try {
      dashboardCountDataAgentApi(agentId.id)
        .then((res) => {
          // console.log("dashboardCountDataAgentApi", res);
          if (res.data.status) {
            setDashboardcountagent(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      errorhandelApi(error, "/dashboard/taskCountByAgentId");
      setShow(true);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <ToastContainer />

      {basedOnRole.role == "Supervisor" ? (
        <div className="h-100" style={{ width: "99%" }}>
          <div className="all-content-wrapper" style={{ marginTop: "1rem" }}>
            <div className="analytics-sparkle-area">
              <div className="container-fluid">
                <>
                  <div className="d-flex">
                    <div className="container" style={{ marginLeft: "-35px" }}>
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div
                            className="white-box analytics-info-cs mg-b-10 res-mg-b-30 res-mg-t-30 table-mg-t-pro-n tb-sm-res-d-n dk-res-t-d-n shadow "
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Agents - LoggedIn
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={grouplogo}
                                    height="45px"
                                    width="45px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right sp-cn-r">
                                <i
                                  className="fa fa-level-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <span className="counter text-success">
                                  {dashboardcount.AgentLoggedIn == null ||
                                  dashboardcount.AgentLoggedIn == undefined
                                    ? 0
                                    : dashboardcount.AgentLoggedIn}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div
                            className="white-box analytics-info-cs mg-b-10 res-mg-b-30 tb-sm-res-d-n dk-res-t-d-n shadow"
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Agents - Active
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={agentactive}
                                    height="45px"
                                    width="45px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right graph-three-ctn">
                                <i
                                  className="fa fa-level-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <span className="counter text-info">
                                  {dashboardcount.AgentActive == null ||
                                  dashboardcount.AgentActive == undefined
                                    ? 0
                                    : dashboardcount.AgentActive}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div
                            className="white-box analytics-info-cs table-dis-n-pro tb-sm-res-d-n dk-res-t-d-n shadow"
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Agents - Offline
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={agentdeactive}
                                    height="45px"
                                    width="45px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right graph-four-ctn">
                                <i
                                  className="fa fa-level-down"
                                  aria-hidden="true"
                                ></i>{" "}
                                <span className="counter text-danger">
                                  {dashboardcount.AgentOffline == null ||
                                  dashboardcount.AgentOffline == null
                                    ? 0
                                    : dashboardcount.AgentOffline}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div
                            className="white-box analytics-info-cs mg-b-10 res-mg-b-30 tb-sm-res-d-n dk-res-t-d-n shadow"
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Agents Not Ready
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={notReady}
                                    height="45px"
                                    width="45px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right graph-four-ctn">
                                <i
                                  className="fa fa-level-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <span className="counter text-purple">
                                  {dashboardcount.AgentNotReady == null ||
                                  dashboardcount.AgentNotReady == undefined
                                    ? 0
                                    : dashboardcount.AgentNotReady}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div
                            className="white-box analytics-info-cs mg-b-10 res-mg-b-30 tb-sm-res-d-n dk-res-t-d-n shadow"
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Queued Chat Count
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={readytotalk}
                                    height="45px"
                                    width="45px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right graph-two-ctn">
                                <i
                                  className="fa fa-level-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <span className="counter text-purple">
                                  {dashboardcount.QueuedChat == null ||
                                  dashboardcount.QueuedChat == undefined
                                    ? 0
                                    : dashboardcount.QueuedChat}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div
                            className="white-box analytics-info-cs mg-b-10 res-mg-b-30 tb-sm-res-d-n dk-res-t-d-n shadow"
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Ongoing Chat
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={notification}
                                    height="45px"
                                    width="45px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right graph-four-ctn">
                                <i
                                  className="fa fa-level-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <span className="counter text-purple">
                                  {dashboardcount.OngoingChat == null ||
                                  dashboardcount.OngoingChat == undefined
                                    ? 0
                                    : dashboardcount.OngoingChat}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Card
                        className="shadow"
                        style={{ height: "15.5rem", width: "20rem" }}
                      >
                        <div className="container w-100 p-3">
                          <div className="d-flex justify-content-between">
                            <h3
                              className=""
                              style={{ color: "#3565ac", fontWeight: "700" }}
                            >
                              Welcome back
                            </h3>
                            <div>
                              <i
                                className="fa fa-refresh"
                                style={{
                                  transform: rotate,
                                  transition: "all 2s",
                                  marginTop: "15px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleRotate();
                                }}
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="my-2">
                            <h4
                              className=""
                              style={{ color: "#0b3363", fontWeight: "600" }}
                            >
                              {userName.username ? userName.username : ""}
                            </h4>
                          </div>
                        </div>
                        <div
                          className="d-flex container"
                          style={{ flexDirection: "column" }}
                        >
                          <h3
                            className="mx-auto fw-bold h-50"
                            style={{ fontSize: "0.8em" }}
                          >
                            <span id="time">{ctime}</span>
                          </h3>

                          <span className="mx-auto" id="todaydate">
                            {month} {defaultValue}
                          </span>
                        </div>

                        <div className="mx-3 my-2">
                          <div>
                            <span className="font-weight-bold">
                              Last Logged In :{" "}
                              {moment(basedOnRole.updatedAt).format(
                                "L   hh:mm:ss A"
                              )}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </>
              </div>
            </div>

            {/* Team Activity */}
            <div className="row">
              <div className="col-md-12">
                <div
                  className="mt-2 w-100 h-100 "
                  style={{ marginLeft: "-16px" }}
                >
                  <div className="d-flex justify-content-around">
                    <Card
                      className="mx-1 shadow"
                      style={{ width: "100vw", marginBottom: "3rem" }}
                    >
                      <Card.Body
                        className="box-shadow"
                        style={{ height: "25rem", overflow: "auto" }}
                      >
                        <div
                          className="d-flex justify-content-between bg-light w-100"
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            height: "3rem",
                          }}
                        >
                          <div className="fw-bold text-primary p-2 my-1 fs-5 font-weight-bold">
                            Team Activity
                          </div>
                        </div>

                        <div className="my-4 tableFixHead">
                          <table className="table table-borderless">
                            <thead>
                              <tr>
                                <th scope="col">Agent Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Ongoing Chat</th>
                                <th scope="col">Conference Chat</th>
                                <th scope="col">Transfered In</th>
                                <th scope="col">Transfered Out</th>
                                <th scope="col">Ended Chat</th>
                              </tr>
                            </thead>
                            <tbody>
                              {teamactivitydashboardcount.map((item) => {
                                console.log("teamactivitydashboardcount", item);
                                return (
                                  <tr>
                                    <th scope="row">
                                      <p>
                                        {item.agent_id == null ||
                                        item.agent_id == undefined ||
                                        item.agent_id == ""
                                          ? "--"
                                          : item.agent_id.username}
                                      </p>
                                    </th>
                                    <td>
                                      {/* {item.agent_id.agent_status == 'Available' ? <Badge bg='success'>{item.agent_id.agent_status}</Badge> : <Badge bg='danger'>{item.agent_id.agent_status}</Badge>} */}
                                      {item.agent_id == null ||
                                      item.agent_id == undefined ||
                                      item.agent_id == "" ? (
                                        "--"
                                      ) : item.agent_id.agent_status_real ==
                                          "Available" ||
                                        item.agent_id.agent_status_real ==
                                          "Ready" ? (
                                        <Badge bg="success">
                                          {item.agent_id.agent_status_real}
                                        </Badge>
                                      ) : item.agent_id.agent_status_real ==
                                        "Connected" ? (
                                        <Badge bg="primary">
                                          {item.agent_id.agent_status_real}
                                        </Badge>
                                      ) : (
                                        <Badge bg="danger">
                                          {item.agent_id.agent_status_real}
                                        </Badge>
                                      )}
                                    </td>

                                    <td>
                                      <div
                                        className="d-flex"
                                        style={{ marginTop: "2px" }}
                                      >
                                        <div
                                          className="d-flex justify-content-center align-items-center shadow"
                                          style={{
                                            height: "30px",
                                            width: "30px",
                                            borderRadius: "50%",
                                            backgroundColor: "white",
                                          }}
                                        >
                                          <span>
                                            <AiFillWechat color="#4b78bf" />
                                          </span>
                                        </div>
                                        <div>
                                          <span
                                            className="badge sm rounded-pill badge-notification bg-danger agent_badge text-white"
                                            style={{
                                              position: "relative",
                                              top: "-10px",
                                              width: "20px",
                                              right: "7",
                                            }}
                                          >
                                            {item.active_chat}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        className="d-flex"
                                        style={{ marginTop: "2px" }}
                                      >
                                        <div
                                          className="d-flex justify-content-center align-items-center my-1 shadow"
                                          style={{
                                            height: "30px",
                                            width: "30px",
                                            borderRadius: "50%",
                                            backgroundColor: "white",
                                          }}
                                        >
                                          <span>
                                            <BsChatText color="#4b78bf" />
                                          </span>
                                        </div>
                                        <div>
                                          <span
                                            className="badge sm rounded-pill badge-notification bg-danger agent_badge text-white"
                                            style={{
                                              position: "relative",
                                              top: "-10px",
                                              width: "20px",
                                              right: "7",
                                            }}
                                          >
                                            {item.active_conferece_chat}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        className="d-flex"
                                        style={{ marginTop: "2px" }}
                                      >
                                        <div
                                          className="d-flex justify-content-center align-items-center my-1 shadow"
                                          style={{
                                            height: "30px",
                                            width: "30px",
                                            borderRadius: "50%",
                                            backgroundColor: "white",
                                          }}
                                        >
                                          <span>
                                            <AiFillWechat color="#4b78bf" />
                                          </span>
                                        </div>
                                        <div>
                                          <span
                                            className="badge sm rounded-pill badge-notification bg-danger agent_badge text-white"
                                            style={{
                                              position: "relative",
                                              top: "-10px",
                                              width: "20px",
                                              right: "7",
                                            }}
                                          >
                                            {item.total_transferred_in}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        className="d-flex"
                                        style={{ marginTop: "2px" }}
                                      >
                                        <div
                                          className="d-flex justify-content-center align-items-center my-1 shadow"
                                          style={{
                                            height: "30px",
                                            width: "30px",
                                            borderRadius: "50%",
                                            backgroundColor: "white",
                                          }}
                                        >
                                          <span>
                                            <AiFillWechat color="#4b78bf" />
                                          </span>
                                        </div>
                                        <div>
                                          <span
                                            className="badge sm rounded-pill badge-notification bg-danger agent_badge text-white"
                                            style={{
                                              position: "relative",
                                              top: "-10px",
                                              width: "20px",
                                              right: "7",
                                            }}
                                          >
                                            {item.total_transferred_out}
                                          </span>
                                        </div>
                                      </div>
                                    </td>

                                    <td>--</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div
                          className="w-100 position-absolute bg-light "
                          style={{ bottom: "0", right: "0", height: "3rem" }}
                        >
                          <Pagination
                            pagination={pagination}
                            page={page}
                            handleChange={handleChange}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-100">
          <div className="all-content-wrapper" style={{ marginTop: "1rem" }}>
            <div className="analytics-sparkle-area">
              <div className="container-fluid">
                <>
                  <div className="d-flex">
                    <div className="container" style={{ marginLeft: "-35px" }}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div
                            className="white-box analytics-info-cs mg-b-10 res-mg-b-30 tb-sm-res-d-n dk-res-t-d-n shadow"
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Completed Chat
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={completedtask}
                                    height="45px"
                                    width="45px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right graph-three-ctn">
                                <i
                                  className="fa fa-level-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <span className="counter text-info">
                                  {dashboardcountagent.completedTask == null ||
                                  dashboardcountagent.completedTask == undefined
                                    ? 0
                                    : dashboardcountagent.completedTask}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div
                            className="white-box analytics-info-cs mg-b-10 res-mg-b-30 tb-sm-res-d-n dk-res-t-d-n shadow"
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Total Break Time
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={breaktime}
                                    height="40px"
                                    width="40px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right graph-two-ctn">
                                <i
                                  className="fa fa-level-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                {/* <span className="counter text-purple">
                                  {moment
                                    .duration(
                                      dashboardcountagent.TotalBreakTime,
                                      "seconds"
                                    )
                                    .format("hh:mm:ss") == 0
                                    ? 0
                                    : moment
                                        .duration(
                                          dashboardcountagent.TotalBreakTime,
                                          "seconds"
                                        )
                                        .format("hh:mm:ss")}
                                </span> */}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div
                            className="white-box analytics-info-cs mg-b-10 res-mg-b-30 tb-sm-res-d-n dk-res-t-d-n shadow"
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Total Active Time
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={activeagent}
                                    height="45px"
                                    width="45px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right graph-three-ctn">
                                <i
                                  className="fa fa-level-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                {/* <span className="counter text-info">
                                  {moment
                                    .duration(
                                      dashboardcountagent.TotalActiveTime,
                                      "seconds"
                                    )
                                    .format("hh:mm:ss")}
                                </span> */}
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div
                            className="white-box analytics-info-cs mg-b-10 res-mg-b-30 tb-sm-res-d-n dk-res-t-d-n shadow"
                            style={{ height: "7rem" }}
                          >
                            <h3 className="box-title font-weight-bold">
                              Customer Disconnected
                            </h3>
                            <ul className="list-inline two-part-sp">
                              <li>
                                <a>
                                  <img
                                    src={disconnected}
                                    height="38px"
                                    width="38px"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li className="text-right graph-three-ctn">
                                <i
                                  className="fa fa-level-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <span className="counter text-info">
                                  {dashboardcountagent.customerDisconnected ==
                                    null ||
                                  dashboardcountagent.customerDisconnected ==
                                    undefined
                                    ? 0
                                    : dashboardcountagent.customerDisconnected}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Card
                        className="shadow"
                        style={{ height: "15.5rem", width: "20rem" }}
                      >
                        <div className="container w-100 mt-3">
                          <div className="d-flex justify-content-between">
                            <h3
                              className="mx-2"
                              style={{ color: "#3565ac", fontWeight: "700" }}
                            >
                              Welcome back
                            </h3>
                            <div>
                              <i
                                className="fa fa-refresh"
                                style={{
                                  transform: rotate,
                                  transition: "all 2s",
                                  marginTop: "15px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleRotate();
                                  dashboardCountDataAgent();
                                }}
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="my-2">
                            <h4
                              className="mx-2"
                              style={{ color: "#0b3363", fontWeight: "600" }}
                            >
                              {userName.username ? userName.username : ""}
                            </h4>
                          </div>
                        </div>
                        <div
                          className="d-flex container p-3"
                          style={{ flexDirection: "column" }}
                        >
                          <h3
                            className="mx-auto fw-bold h-50"
                            style={{ fontSize: "0.8em" }}
                          >
                            <span id="time">{ctime}</span>
                          </h3>

                          <span className="mx-auto" id="todaydate">
                            {month} {defaultValue}
                          </span>
                        </div>

                        <div className="mx-2">
                          <div>
                            <span className="font-weight-bold">
                              Last Logged In :{" "}
                              {moment(basedOnRole.updatedAt).format(
                                "L   hh:mm:ss A"
                              )}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div
                        className="mt-3 w-100 h-100 "
                        style={{ marginLeft: "-26px" }}
                      >
                        <div className="d-flex justify-content-around">
                          <Card
                            className="shadow"
                            style={{ width: "100vw", marginBottom: "3rem" }}
                          >
                            <Card.Body
                              className="box-shadow"
                              style={{ height: "15rem", overflow: "hidden" }}
                            >
                              <div
                                className="d-flex justify-content-between bg-light w-100"
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  right: "0",
                                  height: "3rem",
                                }}
                              >
                                <div className="fw-bold text-primary p-2 my-1 fs-5 font-weight-bold">
                                  Team Activity
                                </div>
                              </div>

                              <div className="my-4 tableFixHead">
                                <table className="table table-borderless">
                                  <thead>
                                    <tr>
                                      <th scope="col">Agent Name</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Ongoing Chat</th>
                                      <th scope="col">Conference Chat</th>
                                      <th scope="col">Transfered In</th>
                                      <th scope="col">Transfered Out</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th scope="row">
                                        <p style={{ fontSize: "15px" }}>
                                          {dashboardcountagent.user == null ||
                                          dashboardcountagent.user ==
                                            undefined ||
                                          dashboardcountagent.user == ""
                                            ? "--"
                                            : dashboardcountagent.user.username}
                                        </p>
                                      </th>
                                      <td>
                                        {dashboardcountagent.user == null ||
                                        dashboardcountagent.user == undefined ||
                                        dashboardcountagent.user == "" ? (
                                          "--"
                                        ) : dashboardcountagent.user
                                            .agent_status_real ==
                                          "Not Available" ? (
                                          <Badge bg="secondary" >
                                            {
                                              dashboardcountagent.user
                                                .agent_status_real
                                            }
                                          </Badge>
                                        ) : dashboardcountagent.user
                                            .agent_status_real == "Ready" ||
                                          dashboardcountagent.user
                                            .agent_status_real ==
                                            "Available" ? (
                                          <Badge bg="success">
                                            {
                                              dashboardcountagent.user
                                                .agent_status_real
                                            }
                                          </Badge>
                                        ) : dashboardcountagent.user
                                            .agent_status_real ==
                                          "Connected" ? (
                                          <Badge bg="primary">
                                            {
                                              dashboardcountagent.user
                                                .agent_status_real
                                            }
                                          </Badge>
                                        ) : (
                                          <Badge bg="danger">
                                            {
                                              dashboardcountagent.user
                                                .agent_status_real
                                            }
                                          </Badge>
                                        )}
                                      </td>
                                      <td>
                                        <div
                                          className="d-flex"
                                          style={{ marginTop: "2px" }}
                                        >
                                          <div
                                            className="d-flex justify-content-center align-items-center my-1 shadow"
                                            style={{
                                              height: "30px",
                                              width: "30px",
                                              borderRadius: "50%",
                                              backgroundColor: "white",
                                            }}
                                          >
                                            <span>
                                              <AiFillWechat color="#4b78bf" />
                                            </span>
                                          </div>
                                          <div>
                                            <span
                                              className="badge sm rounded-pill badge-notification bg-danger agent_badge text-white"
                                              style={{
                                                position: "relative",
                                                top: "-10px",
                                                width: "20px",
                                                right: "7",
                                              }}
                                            >
                                              {dashboardcountagent.OngoingChat}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <div
                                          className="d-flex"
                                          style={{ marginTop: "2px" }}
                                        >
                                          <div
                                            className="d-flex justify-content-center align-items-center my-1 shadow"
                                            style={{
                                              height: "30px",
                                              width: "30px",
                                              borderRadius: "50%",
                                              backgroundColor: "white",
                                            }}
                                          >
                                            <span>
                                              <BsChatText color="#4b78bf" />
                                            </span>
                                          </div>
                                          <div>
                                            <span
                                              className="badge sm rounded-pill badge-notification bg-danger agent_badge text-white"
                                              style={{
                                                position: "relative",
                                                top: "-10px",
                                                width: "20px",
                                                right: "7",
                                              }}
                                            >
                                              {dashboardcountagent.conferncechat ==
                                                null ||
                                              dashboardcountagent.conferncechat ==
                                                undefined ||
                                              dashboardcountagent.conferncechat ==
                                                ""
                                                ? 0
                                                : dashboardcountagent.conferncechat}
                                            </span>
                                          </div>
                                        </div>
                                      </td>

                                      <td>
                                        <div
                                          className="d-flex"
                                          style={{ marginTop: "2px" }}
                                        >
                                          <div
                                            className="d-flex justify-content-center align-items-center my-1 shadow"
                                            style={{
                                              height: "30px",
                                              width: "30px",
                                              borderRadius: "50%",
                                              backgroundColor: "white",
                                            }}
                                          >
                                            <span>
                                              <AiFillWechat color="#4b78bf" />
                                            </span>
                                          </div>
                                          <div>
                                            <span
                                              className="badge sm rounded-pill badge-notification bg-danger agent_badge text-white"
                                              style={{
                                                position: "relative",
                                                top: "-10px",
                                                width: "20px",
                                                right: "7",
                                              }}
                                            >
                                              {
                                                dashboardcountagent.TotalTransferedIn
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      </td>

                                      <td>
                                        <div
                                          className="d-flex"
                                          style={{ marginTop: "2px" }}
                                        >
                                          <div
                                            className="d-flex justify-content-center align-items-center my-1 shadow"
                                            style={{
                                              height: "30px",
                                              width: "30px",
                                              borderRadius: "50%",
                                              backgroundColor: "white",
                                            }}
                                          >
                                            <span>
                                              <AiFillWechat color="#4b78bf" />
                                            </span>
                                          </div>
                                          <div>
                                            <span
                                              className="badge sm rounded-pill badge-notification bg-danger agent_badge text-white"
                                              style={{
                                                position: "relative",
                                                top: "-10px",
                                                width: "20px",
                                                right: "7",
                                              }}
                                            >
                                              {
                                                dashboardcountagent.TotalTransferedOut
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </Card.Body>

                            <Modal show={show} onHide={handleClose} centered>
                              <Modal.Header
                                style={{
                                  height: "3rem",
                                  backgroundColor: "#294e9f",
                                }}
                              >
                                <div className="d-flex justify-content-center align-items-center color-white fw-bold">
                                  <span>Alert</span>
                                </div>
                                <div className="d-flex">
                                  <AiFillCloseCircle
                                    color="white"
                                    onClick={handleClose}
                                  />
                                </div>
                              </Modal.Header>
                              <Modal.Body className="fw-bold">
                                Session Expired Please Login Again !
                              </Modal.Body>

                              <button
                                className="btn btn-danger w-25 btn-sm ms-auto"
                                onClick={logout}
                              >
                                Logout
                              </button>
                            </Modal>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
