import React, { useEffect, useRef, useState } from "react";
import "../../assets/library/bootstrap-5.1.3/css/bootstrap.min.css";
import "../../assets/assets/fonts/fonts.css";
import "../../assets/assets/fonts/fontawesome-free-6.1.1-web/css/all.css";
import "../../assets/assets/styles/style.css";
import "../../assets/library/animate/animate.min.css";
import logo from "../../assets/assets/images/Inaipi_Logo.png";
import sms from "../../assets/assets/images/sms.png";
import chat from "../../assets/assets/images/chat.png";
import bell from "../../assets/assets/images/bell.png";
import girl from "../../assets/assets/images/girl_on_smartphone.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { browserName } from "react-device-detect";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { BaseUrl, errorApi } from "../../container/BaseUrl/BaseUrl";
import { loginApi } from "../../ApiCall/LoginApi";
import { logoutApi } from "../../ApiCall/LogoutApi";
import { connect } from "react-redux";
import {
  setinternalchatnotify,
  setchatdata,
  setchatid,
  setrefreshtogglechat,
  setselectedmobile,
  setselectedemail,
  setselectedusername,
  setchattype
} from '../../redux/actions/actions';


const mapStateToProps = (state) => {
  const { data } = state;
  return {
    internalchatnotify: data.internalchatnotify,
    setchatid: data.setchatid,
    selectedmobile: data.selectedmobile,
    selectedemail: data.selectedemail,
    selectedusername: data.selectedusername,
    chatType: data.chatType,
  };
};

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailval, setEmailval] = useState(false);
  const [passval, setPassval] = useState(false);
  const [isShown, setIsSHown] = useState(false);
  const [validate, setValidate] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [eye, setEye] = useState(false);
  const [showTransferMod, setShowTransferMod] = useState(false);
  const [userid, setuserid] = useState("");
  const ref = useRef(null);
  const cookies = new Cookies();

  useEffect(() => {
    const tenantID = new URLSearchParams(window.location.search).get(
      "tenantID"
    );
    localStorage.setItem("TenantId", tenantID);

    const { username: userData, password: passwordData } = cookies.getAll();
    setEmail(userData || "");
    setPass(passwordData || "");

    const {
      email,
      password: pass,
      number,
    } = new URLSearchParams(window.location.search);

    if (email && pass) {
      const { data } = axios.post(BaseUrl + "/users/getInfoBasedOnNum", {
        number,
      });
      const user_info = data?.[0];
      if (user_info) {
        props.setinternalchatnotify(false);
        props.setchatdata(user_info);
        props.setchatid(user_info.chat_session_id);
        props.setrefreshtogglechat(true);
        props.setselectedmobile(user_info.unique_id.phonenumber);
        props.setselectedemail(user_info.unique_id.email);
        props.setselectedusername(user_info.unique_id.username);
        props.setchattype("WEBCHAT");
      }

      setSpinner(true);
      const { data: datas } = axios.post(BaseUrl + "/users/login", {
        email,
        pass,
      });

      if (datas.status) {
        localStorage.setItem("NameDisplay", datas.user.username);
        localStorage.setItem("emailDisplay", datas.user.email);
        localStorage.setItem("tokenAgent", JSON.stringify(datas.user));
        setSpinner(false);
        setValidate(false);
        navigate("/dashboard");
      } else if (datas.user_id) {
        setValidate(true);
        setSpinner(false);
        setShowTransferMod(true);
        setuserid(datas.user_id);
      } else {
        cookies.remove("username");
        cookies.remove("password");
        cookies.remove("boolean");
      }
    }
  }, []);

  const tenantId = localStorage.getItem("TenantId");
  const logout = async () => {
    logoutApi(userid)
    localStorage.clear();
    window.location.reload();
  };
  const login = async () => {
    setSpinner(true);
    const credentials = { email, pass, tenantId };
    try {
      loginApi(credentials)
      .then((datas) => {
        if (datas.data.status === true) {
          localStorage.setItem("NameDisplay", datas.data.user.username);
          localStorage.setItem("NameDisplay", datas.data.user.username);
          localStorage.setItem("emailDisplay", datas.data.user.email);
          localStorage.setItem("tab", "dashboard");
          localStorage.setItem("access_token", datas.data.access_token_cognicx);
          localStorage.setItem("tokenAgent", JSON.stringify(datas.data.user));
          localStorage.setItem(
            "AvayaUsername",
            datas.data.user.voiceRecord.avayaUserName
          );
          localStorage.setItem(
            "AvayaPassword",
            datas.data.user.voiceRecord.avayaPassword
          );
          localStorage.setItem(
            "AvayaDomain",
            datas.data.user.voiceRecord.avayaDomain
          );
          localStorage.setItem("permission", JSON.stringify(permission));
          setSpinner(false);
          setValidate(false);
          if (ref.current.checked) {
            cookies.set("username", email, { path: "/" });
            cookies.set("password", pass, { path: "/" });
            cookies.set("boolean", true, { path: "/" });
          }
          if (
            permission.find((element) => element.moduleName === "Dashboard")
          ) {
            navigate("/main/Dashboard");
          } else if (
            permission.find((element) => element.moduleName === "Chat")
          ) {
            navigate("/main/Chat");
          } else if (
            permission.find(
              (element) => element.moduleName === "Session Report"
            )
          ) {
            navigate("/main/SessioReports");
          } else if (
            permission.find((element) => element.moduleName === "Calender")
          ) {
            navigate("/main/Calenders");
          }

          // navigate('/chat');

          window.location.reload();
        } else {
          if (datas.data.user_id != undefined) {
            setValidate(true);
            setSpinner(false);
            setShowTransferMod(true);
            setuserid(datas.data.user_id);
          } else {
            cookies.remove("username");
            cookies.remove("password");
            cookies.remove("boolean");
            setValidate(true);
            setSpinner(false);
            toast.error(datas.data.message, toastOptions);
          }

          // window.location.reload();
        }
      });
    } catch (error) {
      errorHandel(error, "/users/login");
      toast.warn("Server is down,please try after some time", {
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
  };
  const errorHandel = async (error, endpoint) => {
    const tenantID = localStorage.getItem("TenantId");
    try {
      const payload = {
        servicename: "DCCCHAT",
        logs: error,
        description: endpoint,
      };

      const header = {
        headers: {
          // Authorization: "Bearer " + token,
          // "Content-Type": "application/json",
          tenantid: tenantID,
        },
      };
      const { data } = await axios.post(
        errorApi + "/UIlogs/createLogs",
        payload,
        header
      );
      if (data.status) {
        console.log("from error api", data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = () => {
    console.log("checkingcookie", ref.current.checked);
    if (ref.current.checked == false) {
      cookies.remove("username");
      cookies.remove("password");
      cookies.remove("boolean");
    }
  };
  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      login();
    }
  };

  const handleTransferClose = () => {
    setShowTransferMod(false);
  };
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const isLogin = true;

  const permission = [
    {

      "createdDate": "2023-01-10T11:29:48.343",

      "lastModifiedDate": "2023-01-10T11:29:48.343",

      "createdBy": "pragadeeswar.j@cognicx.com",

      "modifiedBy": "pragadeeswar.j@cognicx.com",

      "moduleScreenId": "63bd4c2c9a59460443db1179",

      "moduleId": "CHAT",

      "moduleName": "Chat",

      "screen": [
        {

          "screenId": "EXT_CHAT",

          "screenName": "External Chat",

          "read": true,

          "write": true

        },


        {

          "screenId": "IN_CHAT",

          "screenName": "Internal Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "TRANSFER",

          "screenName": "Transfer Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "CONF",

          "screenName": "Chat Conference",

          "read": true,

          "write": true

        },



      ],

      "appName": "Agent Desktop"

    },

    {

      "createdDate": "2023-01-10T11:29:48.343",

      "lastModifiedDate": "2023-01-10T11:29:48.343",

      "createdBy": "pragadeeswar.j@cognicx.com",

      "modifiedBy": "pragadeeswar.j@cognicx.com",

      "moduleScreenId": "63bd4c2c9a59460443db1179",

      "moduleId": "CALENDER",

      "moduleName": "Calender",

      "screen": [

        {

          "screenId": "IN_CHAT",

          "screenName": "Internal Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "EXT_CHAT",

          "screenName": "External Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "TRANSFER",

          "screenName": "Transfer Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "CONF",

          "screenName": "Chat Conference",

          "read": true,

          "write": true

        }

      ],

      "appName": "Agent Desktop"

    },

    {

      "createdDate": "2023-01-10T11:29:48.343",

      "lastModifiedDate": "2023-01-10T11:29:48.343",

      "createdBy": "pragadeeswar.j@cognicx.com",

      "modifiedBy": "pragadeeswar.j@cognicx.com",

      "moduleScreenId": "63bd4c2c9a59460443db1179",

      "moduleId": "DASHBOARD",

      "moduleName": "Dashboard",

      "screen": [

        {

          "screenId": "IN_CHAT",

          "screenName": "Internal Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "EXT_CHAT",

          "screenName": "External Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "TRANSFER",

          "screenName": "Transfer Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "CONF",

          "screenName": "Chat Conference",

          "read": true,

          "write": true

        }

      ],

      "appName": "Agent Desktop"

    },

    {

      "createdDate": "2023-01-10T11:29:48.343",

      "lastModifiedDate": "2023-01-10T11:29:48.343",

      "createdBy": "pragadeeswar.j@cognicx.com",

      "modifiedBy": "pragadeeswar.j@cognicx.com",

      "moduleScreenId": "63bd4c2c9a59460443db1179",

      "moduleId": "SESSIONREPORT",

      "moduleName": "Sessionreport",

      "screen": [

        {

          "screenId": "IN_CHAT",

          "screenName": "Internal Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "EXT_CHAT",

          "screenName": "External Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "TRANSFER",

          "screenName": "Transfer Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "CONF",

          "screenName": "Chat Conference",

          "read": true,

          "write": true

        }

      ],

      "appName": "Agent Desktop"

    },

    {

      "createdDate": "2023-01-10T11:29:48.343",

      "lastModifiedDate": "2023-01-10T11:29:48.343",

      "createdBy": "pragadeeswar.j@cognicx.com",

      "modifiedBy": "pragadeeswar.j@cognicx.com",

      "moduleScreenId": "63bd4c2c9a59460443db1179",

      "moduleId": "AGENTREPORT",

      "moduleName": "Agentreport",

      "screen": [

        {

          "screenId": "IN_CHAT",

          "screenName": "Internal Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "EXT_CHAT",

          "screenName": "External Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "TRANSFER",

          "screenName": "Transfer Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "CONF",

          "screenName": "Chat Conference",

          "read": true,

          "write": true

        }

      ],

      "appName": "Agent Desktop"

    },
    {

      "createdDate": "2023-01-10T11:29:48.343",

      "lastModifiedDate": "2023-01-10T11:29:48.343",

      "createdBy": "pragadeeswar.j@cognicx.com",

      "modifiedBy": "pragadeeswar.j@cognicx.com",

      "moduleScreenId": "63bd4c2c9a59460443db1179",

      "moduleId": "Mail",

      "moduleName": "Mail",

      "screen": [

        {

          "screenId": "IN_CHAT",

          "screenName": "Internal Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "EXT_CHAT",

          "screenName": "External Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "TRANSFER",

          "screenName": "Transfer Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "CONF",

          "screenName": "Chat Conference",

          "read": true,

          "write": true

        }

      ],

      "appName": "Agent Desktop"

    },
    {

      "createdDate": "2023-01-10T11:29:48.343",

      "lastModifiedDate": "2023-01-10T11:29:48.343",

      "createdBy": "pragadeeswar.j@cognicx.com",

      "modifiedBy": "pragadeeswar.j@cognicx.com",

      "moduleScreenId": "63bd4c2c9a59460443db1179",

      "moduleId": "powerBi",

      "moduleName": "powerBi",

      "screen": [

        {

          "screenId": "IN_CHAT",

          "screenName": "Internal Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "EXT_CHAT",

          "screenName": "External Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "TRANSFER",

          "screenName": "Transfer Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "CONF",

          "screenName": "Chat Conference",

          "read": true,

          "write": true

        }

      ],

      "appName": "Agent Desktop"

    },
    {

      "createdDate": "2023-01-10T11:29:48.343",

      "lastModifiedDate": "2023-01-10T11:29:48.343",

      "createdBy": "pragadeeswar.j@cognicx.com",

      "modifiedBy": "pragadeeswar.j@cognicx.com",

      "moduleScreenId": "63bd4c2c9a59460443db1179",

      "moduleId": "PowerBiDashboard",

      "moduleName": "PowerBiDashboard",

      "screen": [

        {

          "screenId": "IN_CHAT",

          "screenName": "Internal Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "EXT_CHAT",

          "screenName": "External Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "TRANSFER",

          "screenName": "Transfer Chat",

          "read": true,

          "write": true

        },

        {

          "screenId": "CONF",

          "screenName": "Chat Conference",

          "read": true,

          "write": true

        }

      ],

      "appName": "Agent Desktop"

    },

  ]


  return (
    <>
      <ToastContainer />
      <div className="login">
        <section className="banner set-bg">
          <div className="login-welcome">
            <div className="container-fluid">
              <div className="row p-0 m-0">
                <div className="col-6 p-0 m-0 no-gutters">
                  <div className="hero__caption inaipi-welcome animate__animated animate__fadeInUp">
                    <div>
                      <div className="logo">
                        <img src={logo} alt="" />
                      </div>
                      <div className="welcome">
                        <p style={{ fontSize: 17, fontWeight: 600 }}>
                          <span
                            style={{
                              fontSize: 17,
                              fontWeight: 600,
                              display: "block",
                            }}
                          >
                            {" "}
                            INAIPI LOGIN
                          </span>
                        </p>
                      </div>

                      <div className="form">
                        {/* <form> */}
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="exampleFormControlInput1"
                            onChange={(e) => setEmail(e.target.value)}
                            // value={this.state.username}
                            placeholder="Enter your username"
                            value={email}
                            onKeyPress={handleKeyPress}
                          />

                          {emailval ? (
                            <span className="text-danger mx-3">
                              Username is Required *
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </div>
                        <div
                          className="form-group input-pass"
                          style={{ marginTop: "20px" }}
                        >
                          <input
                            type={isShown ? "text" : "password"}
                            className="form-control"
                            name="password"
                            id="exampleFormControlInput2"
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Enter your password"
                            value={pass}
                            onKeyPress={handleKeyPress}
                          />

                          {passval ? (
                            <span className="text-danger mx-3">
                              Password is Required *
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="mx-1">
                            <input
                              type="checkbox"
                              onChange={handleChange}
                              ref={ref}
                              defaultChecked={cookies.get("boolean")}
                              //  checked={cookies.get('boolean')}
                            />
                          </div>
                          <div>Remember Me</div>
                        </div>
                        <div
                          className="form-group input-pass"
                          style={{ marginTop: "40px" }}
                        >
                          <button
                            variant="success"
                            id="connectSocket"
                            onClick={(e) => {
                              if (email == "") {
                                setEmailval(true);
                                setPassval(false);
                              } else if (pass == "") {
                                setEmailval(false);
                                setPassval(true);
                              } else {
                                login();
                              }
                            }}
                            className="btn form-control"
                            style={{
                              backgroundColor: "#00498f",
                              color: "white",
                            }}
                          >
                            {spinner ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              <div className="login-text">Login</div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="img-banner-main col-6 p-0 m-0 no-gutters ">
                  <div className="login_img position-relative">
                    <div className="round ">
                      <div className="main_img">
                        <img
                          className="image-1 appear-animate "
                          src={girl}
                          alt=""
                        />
                      </div>
                      <img
                        className="image-2 fly-sm animate__animated animate__pulse"
                        src={bell}
                        alt=""
                      />
                      <img
                        className="image-3 fly-sm animate__animated animate__pulse"
                        src={chat}
                        alt=""
                      />
                      <img
                        className="image-4 fly-sm animate__animated animate__pulse"
                        src={sms}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        show={showTransferMod}
        className="transferCall-modal1"
        onHide={handleTransferClose}
      >
        <Modal.Header
          style={{
            padding: "6px 12px",
            margin: 0,
            fontSize: "12px",
            height: "60px",
            backgroundColor: "#294e9f",
            color: "white",
          }}
        >
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              <Modal.Title
                style={{
                  fontSize: 15,
                  margin: "6px 0 0 0",
                  textTransform: "capitalize",
                }}
              >
                Confirmation
              </Modal.Title>
            </div>
            <div>
              <AiOutlineCloseCircle onClick={handleTransferClose} />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {"User Already logged in logout...!"}
        </Modal.Body>

        <div
          className="transferOkDiv p-2 "
          style={{ justifyContent: "flex-start" }}
        >
          <Button
            variant="primary"
            className="transferOkBtn btn-sm"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, {
  setinternalchatnotify,
  setchatdata,
  setchatid,
  setrefreshtogglechat,
  setselectedmobile,
  setselectedemail,
  setselectedusername,
  setchattype
})(Login);
