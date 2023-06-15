import React, { useState, useEffect } from "react";
import "@avaya/neo-react/avaya-neo-react.css";
import Sdk from '../DialerComponent/Sdk'
import "../../assets/assets/dist/css/neo/neo.css";
import "./navbar.css";
import logo from "../../assets/assets/images/Inaipi_Logo-1.2.png";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setcontactlist, setcontactlist1 } from "../../redux/actions/actions";
import {
  BaseUrl,
  AvcUrl,
  frontendBaseurl,
  errorApi,
} from "../../container/BaseUrl/BaseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Api imports
import {
  NavbarlogoutApi,
  updateStatusApi,
  loginbyDomainforAgentApi,
  loginbyDomainApi,
  logoutByDomainSecondApi,
  logoutByDomainFirst,
  changeStatusnewApi,
  userStatusApi,
} from "../../ApiCall/NavbarApi";
import { errorhandelApi } from "../../ApiCall/ErrorHandelApi";



const mapStateToProps = (state) => {
  return {
    contactList: state.data.contactList,
    contactList1: state.data.contactList1,
  };
};

const Navbar = (props) => {
  const tenantId = localStorage.getItem("TenantId");
  const [showNotification, setShowNotification] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showReadyButton, setReadyButton] = useState(true);
  const [showFinishButton, setFinishButton] = useState(false);

  const [showConnectedStatus, setConnectedStatus] = useState(true);
  const [showReadyStatus, setReadyStatus] = useState(false);
  const [hideLogout, setHideLogout] = useState(true);
  const [showingStatus, setShowingStatus] = useState("Ready");
  const [showingStatusClass, setShowingStatusClass] = useState("showStatus");
  const [rmState, setRmState] = useState(true);
  const [showStatusChannel, setShowStatusChannel] = useState("Logged Out");
  const [timerOne, setTimerOne] = useState(0);
  const [timerTwo, setTimerTwo] = useState(0);
  const [userstatus, setUserstatus] = useState([]);

  useEffect(() => {
    // startTimer();
    // start()
    userStatus();

    if (localStorage.getItem("statusValue") == "Ready") {
      goReady("Ready");
      updateStatus("Ready");
      setShowStatusChannel("Ready");
      localStorage.setItem("statusValue", "Ready");
    }
  }, []);

  const show_notification = () => {
    setShowNotification(!showNotification);
    setShowUserProfile(false);
  };

  const close_notification = () => {
    setShowNotification(false);
  };

  const show_userprofile = () => {
    setShowUserProfile(!showUserProfile);
    setShowNotification(false);
  };

  const close_userprofile = () => {
    setShowUserProfile(false);
  };

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

  //complete
  const updateStatus =  (value) => {
    let data = JSON.parse(localStorage.getItem("tokenAgent"));
    try {
      if (data) {
        updateStatusApi(value, data)
        .then((res) => {
          console.log("Update Status", res);
        });
      }
    } catch (error) {
      errorHandel(error, "/users/updateAgentStatus/");
    }
  };

  const navigate = useNavigate();

  const goReady = async (val) => {
    
    clearTimeout(timerOne);
    clearTimeout(timerTwo);
    setFinishButton(true);
    setReadyButton(false);
    setReadyStatus(true);
    setConnectedStatus(false);
    setHideLogout(false);
    setShowingStatusClass("showStatus");
    setShowingStatus(val);
    // localStorage.setItem("timer_status", false);
    // localStorage.setItem("timer_connect_hour", 0);
    // localStorage.setItem("timer_connect_min", 0);
    // localStorage.setItem("timer_connect_sec", 0);
  };

  const goFinish = () => {
    clearTimeout(timerOne);
    clearTimeout(timerTwo);
    setShowStatusChannel("Logged Out");
    updateStatus("Connected");
    localStorage.removeItem("readystatus");
    setHideLogout(true);
    setTimeout(() => {
      setFinishButton(false);
      setReadyButton(true);
      setReadyStatus(false);
      setConnectedStatus(true);
    }, 1000);
  };

 

  let name = localStorage.getItem("NameDisplay");
  let email = localStorage.getItem("emailDisplay");
  let firstTwoletter;
  if (name) {
    firstTwoletter = name.substring(0, 2).toLocaleUpperCase();
  }

  
  const logout = () => {
    const access_token = localStorage.getItem("access_token");
    let data = JSON.parse(localStorage.getItem("tokenAgent"));
    let userID = data.user_id;
    const id = localStorage.getItem("TenantId");

    if (data) {
      NavbarlogoutApi().then((res) => {
        console.log("logoutApi", res);
      });
    }
  };

//completed
  const loginbyDomainforAgent = () => {
    loginbyDomainforAgentApi()
      .then((res) => {
        if ((res.data.status = "OK")) {
        }
      })
      .catch((error) => {
        errorHandel(error, "agent/login/status");
        console.error(error);
      });
  };

  //completed
  const loginbyDomain = () => {
    
    loginbyDomainApi()
      .then((res) => {
        console.log("Avaya Acc Login>>>>>>>", res);
        if ((res.data.status = "OK")) {
          localStorage.setItem("ssoToken", res.data.data.ssoToken);
          localStorage.setItem(
            "agentLoginTerminalId",
            res.data.data.agents[0].agentLoginId
          );
          console.log("resPdf", res.data.data);

          if (res.data.data.agents[0].loggedIn == false) {
            loginbyDomainforAgent();
          } else {
          }
        }
      })
      .catch((err) => {
        console.error("Avaya Acc Login>>>>>>>", err);
      });
  };

  const logoutByDomainSecond = () => {
    logoutByDomainSecondApi()
      .then((res) => {
        if ((res.data.status = "OK")) {
          console.log("logoutZZZZZ", res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logoutByDomainFirst = () => {
    logoutByDomainFirst()
      .then((res) => {
        if (res.data.status == "OK") {
          logoutByDomainSecond();
        }
      })
      .catch((error) => {
        errorHandel(error, "/cct/agent/logout");

        console.error(error);
      });
  };

  const changeStatusnew = (status) => {
    changeStatusnewApi(status)
      .then((res) => {
        if (res.data.status == "OK") {
          console.log("res", res);
        }
      })
      .catch((error) => {
        errorHandel(error, "agent/status");
        console.error(error);
      });
  };

  const showBreaks = () => {
    setRmState(false);
  };

  const showOldScreen = () => {
    setRmState(true);
  };

  const mealUpdate = (item) => {
    goReady(item);
    setShowingStatusClass("showStatusRed");
    updateStatus(item);
    setRmState(true);
  };

  const userStatus = () => {
    try {
      userStatusApi().then(function (response) {
        setUserstatus(response.data.data);
      });
    } catch (error) {
      errorHandel(error, "/userstatus/userstatuslist");

      // toast.warn('Server is down please try after sometime', {
      //   position: "top-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   });
    }
  };

  const closeNotify = (msg, id) => {
    let filteredArray = props.contactList1.filter((item) => {
      return item.client_msg !== msg;
    });
    props.setcontactlist1([]);
    props.setcontactlist1(filteredArray);
  };

  return (
    <>
      <div className="header neo-navbar--sticky" style={{ zIndex: "99" }}>
        <nav className="neo-navbar shadow">
          <div className="neo-nav--left">
            <img
              src={logo}
              style={{ height: "50px", width: "3.5rem" }}
              className="nav_logo"
            />
          </div>

          <div>
            <h4
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                fontFamily: "Noto-Sans",
                marginLeft: "27rem",
              }}
            >
              INAIPI UCX
            </h4>
          </div>
          <div className="neo-nav">
            {/* <CustomDialer /> */}
            <div className="neo-badge__navbutton">
              <Sdk />
              
            </div>
            <div className="neo-badge__navbutton ">
              <button className="neo-badge__navbutton--content neo-btn neo-icon-dashboard"></button>
            </div>
            <div className="neo-badge__navbutton">
              <button
                className="neo-badge__navbutton--content neo-btn neo-icon-notifications-on"
                onClick={show_notification}
              ></button>
              <span
                className="neo-badge__icon"
                data-badge={props.contactList1.length}
              ></span>
            </div>
            {showReadyStatus && (
              <div
                className="neo-nav-status neo-nav-status--ready"
                tabIndex="0"
                onClick={show_userprofile}
              >
                <div className="neo-nav-status-info">
                  <p className="mx-1 font-weight-bold">
                    {localStorage.getItem("NameDisplay")}
                  </p>

                  <span
                    className={`neo-label timer-ready ${showingStatusClass}`}
                  >
                    {showingStatus}
                  </span>
                </div>
                <figure
                  className="neo-avatar"
                  data-initials={firstTwoletter}
                ></figure>
              </div>
            )}

            {showConnectedStatus && (
              <div
                className={`neo-nav-status ${
                  localStorage.getItem("statusValue") == "Connected" ||
                  localStorage.getItem("statusValue") == "" ||
                  localStorage.getItem("statusValue") == null ||
                  localStorage.getItem("statusValue") == undefined
                    ? `neo-nav-status--connected`
                    : `neo-nav-status--ready`
                } `}
                tabIndex="0"
                onClick={show_userprofile}
              >
                <div className="neo-nav-status-info ">
                  <p className="mx-1 font-weight-bold">
                    {localStorage.getItem("NameDisplay")}
                  </p>
                  {localStorage.getItem("statusValue") == "Connected" ||
                  localStorage.getItem("statusValue") == null ||
                  localStorage.getItem("statusValue") == undefined ||
                  localStorage.getItem("statusValue") == "" ? (
                    <>
                      <span className="neo-label neo-label--connected timer-connected">
                        Connected
                        {/* <span id="hours">{hours >=10 ? hours:'0'+hours}:</span>
                      <span id="mins">{minutes >=10 ? minutes: '0'+ minutes}:</span>
                      <span id="seconds">{seconds >=10? seconds:'0'+seconds}</span> */}
                      </span>
                    </>
                  ) : (
                    <span
                      className={`${localStorage.getItem(
                        "statusValue" == "Ready"
                      )}`}
                    >
                      <span
                        className={`${
                          localStorage.getItem("statusValue") == "Ready" ||
                          localStorage.getItem("statusValue") == "Connected"
                            ? "neo-label neo-label--ready"
                            : "neo-label neo-label--not-ready"
                        }`}
                      >
                        {localStorage.getItem("statusValue")}
                      </span>
                    </span>
                  )}
                </div>
                <figure
                  className="neo-avatar"
                  data-initials={firstTwoletter}
                ></figure>
              </div>
            )}
          </div>
        </nav>

        {showNotification && (
          <div className="main-notify-cont">
            <div className="content">
              <span className="head">Notifications</span>
              <span
                className="neo-icon-close"
                onClick={close_notification}
                aria-label="close notification"
              ></span>
              {!props.contactList1 && (
                <div className="notify-body">
                  <span
                    className="neo-icon-info"
                    aria-label="info notification"
                  ></span>
                  <span>No notifications to display</span>
                </div>
              )}

              <div className="notify-content-data">
                {props.contactList1 &&
                  props.contactList1
                    .slice(0)
                    .reverse()
                    .map((data) => {
                      return (
                        <div className="notifications-div">
                          <span
                            className="notify-close"
                            onClick={() => {
                              closeNotify(data.client_msg, data.from_id);
                            }}
                          >
                            X
                          </span>
                          <div className="noti-username">{data.username}</div>
                          <div className="noti-msg">
                            <span
                              className="notify-message"
                              title={data.client_msg}
                            >
                              {data.client_msg}
                            </span>
                            <span className="notify-duration">
                              {data.msg_time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        )}

        {showUserProfile && (
          <div className="main-notify-cont">
            {/* <div className="content"> */}
            {rmState && (
              <div className="content">
                <span className="head">Agent State</span>
                <span className="head_agent-details">Agent Id - {email}</span>
                <span
                  className="neo-icon-close user-close"
                  onClick={close_userprofile}
                  aria-label="close notification"
                ></span>

                <div className="user-body">
                  {showReadyButton && (
                    <button
                      className="btn btn-success work-start"
                      style={{ fontFamily: "Noto-Sans" }}
                      onClick={() => {

                        goReady("Ready");
                        updateStatus("Ready");
                        loginbyDomain();

                        setShowStatusChannel("Ready");
                        localStorage.setItem("statusValue", "Ready");
                      }}
                    >
                      {" "}
                      <span
                        className="neo-icon-work-start"
                        aria-label="start work"
                      ></span>{" "}
                      Go Ready
                    </button>
                  )}

                  {showFinishButton && (
                    <button
                      className="btn btn-primary"
                      style={{ fontFamily: "Noto-Sans" }}
                      onClick={() => {
                        goFinish();
                        localStorage.setItem("statusValue", "Connected");
                      }}
                    >
                      {" "}
                      <span
                        className="neo-icon-work-end"
                        aria-label="end work"
                      ></span>{" "}
                      Finish Work
                    </button>
                  )}

                  {showFinishButton && (
                    <div className="status">
                      <div className="status-head">Status</div>
                      <div className="go-not-ready" onClick={showBreaks}>
                        <span
                          className="neo-icon-do-not-disturb"
                          aria-label="end work"
                        ></span>
                        Go Not Ready{" "}
                        <span
                          className="neo-icon-chevron-right"
                          aria-label="end work"
                        ></span>
                      </div>
                      <div
                        className="go-ready"
                        style={{ fontFamily: "Noto-Sans" }}
                        onClick={() => {
                          goReady("Ready");
                          updateStatus("Ready");
                          setShowStatusChannel("Ready");
                          changeStatusnew("Ready");
                          localStorage.setItem("statusValue", "Ready");
                        }}
                      >
                        <span
                          className="neo-icon-go-ready"
                          aria-label="end work"
                        ></span>
                        Go Ready
                      </div>

                      <div
                        className="go-ready"
                        style={{ fontFamily: "Noto-Sans" }}
                        onClick={() => {
                          mealUpdate("Not Ready");
                          localStorage.setItem("statusValue", "Not Ready");
                          changeStatusnew("Not Ready");
                        }}
                      >
                        <span
                          className="neo-icon-go-ready"
                          aria-label="end work"
                        ></span>
                        Not Ready
                      </div>
                    </div>
                  )}

                  <div className="status">
                    <div className="status-head">Channel</div>
                    <div className="go-not-ready">
                      Chat - {showStatusChannel}
                    </div>
                    <div className="go-ready">Voice - {showStatusChannel}</div>
                  </div>
                </div>
                <a>
                  {" "}
                  {hideLogout && (
                    <div className="sign-out" onClick={logout}>
                      <span
                        className="neo-icon-exit-left"
                        aria-label="sign out"
                      ></span>
                      <span
                        className="signout-text"
                        style={{ fontFamily: "Noto-Sans" }}
                      >
                        Sign Out
                      </span>
                    </div>
                  )}
                  {!hideLogout && (
                    <div className="sign-out-1">
                      <span
                        className="neo-icon-exit-left"
                        aria-label="sign out"
                      ></span>
                      <span
                        className="signout-text"
                        style={{ fontFamily: "Noto-Sans" }}
                      >
                        Sign Out
                      </span>
                    </div>
                  )}
                </a>
              </div>
            )}
            {!rmState && (
              <div className="contents">
                <div className="status">
                  <div className="reason-head">
                    {" "}
                    <span
                      className="neo-icon-chevron-left"
                      aria-label="end work"
                      onClick={showOldScreen}
                    ></span>
                    Reason Codes
                  </div>
                  <div className="content1">
                    {userstatus.map((item) => (
                      <div
                        className="go-not-ready"
                        onClick={() => {
                          mealUpdate(item.statusName);
                          localStorage.setItem("statusValue", item.statusName);
                        }}
                      >
                        {item.statusName}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          // </div>
        )}
      </div>
    </>
  );
};

export default connect(mapStateToProps, {
  setcontactlist,
  setcontactlist1,
})(Navbar);
