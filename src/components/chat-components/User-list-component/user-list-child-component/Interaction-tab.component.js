import React, { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { SiMicrosoftteams } from "react-icons/si";
import axios from "axios";
import moment from "moment";
import { BaseUrl } from "../../../../container/BaseUrl/BaseUrl";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { BsChatSquareText } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  setselectedemail,
  setselectedmobile,
} from "../../../../redux/actions/actions";

import { errorhandelApi } from "../../../../ApiCall/ErrorHandelApi";

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    selectedemail: data.selectedemail,
    selectedmobile: data.selectedmobile,
  };
};

const Interactiontab = (props) => {
  const [smShow, setSmShow] = useState(false);
  const [sessionVal, setsessionVal] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [summaryArrivalDate, setSummaryArrivalDate] = useState("");
  const [summaryChannel, setSummaryChannel] = useState("");
  const [summaryAgent, setSummaryAgent] = useState("");
  const [summaryStartedDate, setSummaryStartedDate] = useState("");
  const [summaryEndDate, setSummaryEndDate] = useState(undefined);
  const [show, setShow] = useState(false);
  const [chatmodal, setChatmodal] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlechatClose = () => setChatmodal(false);

  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];
  const [getsessionsbydate, setGetsessionsbydate] = useState(defaultValue);

  useEffect(() => {
    getSessionsDetails(defaultValue);
  }, [localStorage.getItem("client")]);

  const getSessionsDetails = async (value) => {

     console.log("currentdate>>>>>>>>",defaultValue);
    try {
      const access_token = localStorage.getItem("access_token");
      const tenantId = localStorage.getItem("TenantId");

      await axios
        .post(
          BaseUrl + "/message/getSessions/",
          {
            email: props.selectedemail,
            phonenumber: props.selectedmobile,
            date: value,
          },
          {
            headers: {
              Authorization: "Bearer " + access_token,
              "Content-Type": "application/json",
              tenantId: tenantId,
            },
          }
        )
        .then((res) => {
          console.log("interagtion tab value resp", res);
          if (res.data.success) {
            setsessionVal(res.data.data);
          } else {
            setsessionVal([]);
          }
        });
    } catch (error) {
      errorhandelApi(error, "/message/getSessions/");
    }
  };

  const handleShowDetails = async (session_id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      setSessionId(session_id);
      let data = {
        sessionId: session_id,
      };
      const sessions = await axios.post(
        BaseUrl + "/message/getSummery/",
        data,
        {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
            tenantId: localStorage.getItem("TenantId"),
          },
        }
      );
      if (sessions.data.success) {
        let datas = sessions.data.data;
        setSummaryArrivalDate(datas[0].arrival_at);
        setSummaryChannel(datas[0].channel);
        let agent_one = datas[0].agent.username;
        let agent_two = datas[1].confUser;
        setSummaryAgent(agent_one + agent_two);
        setSummaryStartedDate(datas[0].chat_started_at);
        setSummaryEndDate(datas[0].chat_ended_at);
      }
      setShow(true);
    } catch (error) {
      errorhandelApi(error, "/message/getSummery/");
    }
  };

  const handlechatShow = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let data = {
        sessionId: sessionId,
      };
      const chatHistory = await axios.post(
        BaseUrl + "/message/chatHistories/",
        data,
        {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
            tenantId: localStorage.getItem("TenantId"),
          },
        }
      );
      console.log("msg1111", chatHistory);
      if (chatHistory.data.status) {
        // console.log('allData',chatHistory.data.data)
        setChatHistory(chatHistory.data.data);
        setChatmodal(true);
      }
    } catch (error) {
      errorhandelApi(error, "/message/chatHistories/");
    }
  };

  return (
    <>
      <div
        className={props.InteractionHistorytab}
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <div className="d-flex justify-content-end m-2">
          <input
            type="Date"
            className="form-control form-control-sm w-25"
            style={{ cursor: "pointer" }}
            onChange={(e) => {
              getSessionsDetails(e.target.value);
              setGetsessionsbydate(e.target.value);
            }}
             value={getsessionsbydate}
          />
        </div>
        <div className="historynew m-2">
          {sessionVal.length > 0 ? (
            sessionVal.map((item) => {
              return (
                <div key={item.id} className="card-chat pt-2 pb-2 mb-2">
                  <div className="container">
                    <div className="row">
                      {item.channel == "webchat" ? (
                        <div className="col-md-1  box d-flex align-items-center justify-content-center sms-bg">
                          <i className="fa-brands fa-rocketchat"></i>
                        </div>
                      ) : item.channel == "from_whatsapp" ? (
                        <div className="col-md-1  box d-flex align-items-center justify-content-center what-bg">
                          <i className="fa-brands fa-whatsapp"></i>
                        </div>
                      ) : item.channel == "from_facebook" ? (
                        <div className="col-md-1  box d-flex align-items-center justify-content-center fb-bg">
                          <i className="fa-brands fa-facebook-f"></i>
                        </div>
                      ) : item.channel == "from_twitter" ? (
                        <div className="col-md-1  box d-flex align-items-center justify-content-center twit-bg">
                          <i className="fa-brands fa-twitter"></i>
                        </div>
                      ) : item.channel == "from_teams" ? (
                        <div className="col-md-1  box d-flex align-items-center justify-content-center teams-bg">
                          <i className="fa-brands fa-teams">T</i>
                          <SiMicrosoftteams
                            className="btn_hover"
                            size={20}
                            color="white"
                          />
                        </div>
                      ) : (
                        <div className="col-md-1  box d-flex  align-items-center justify-content-center call-bg">
                          <i className="fa-brands fa-call">C</i>
                        </div>
                      )}

                      <div className="col-md-11 d-flex flex-wrap">
                        <div className="box2 me-2   badge-bg d-flex align-items-center justify-content-center">
                          <strong className="change_font_size">
                            <i className="fa-solid fa-user-tie me-1 "></i>
                            Agent :
                          </strong>
                          <p className="mb-0 ms-1 ">{item.agent?.username}</p>
                        </div>
                        <div className="box2 me-2   badge-bg d-flex align-items-center justify-content-center">
                          <strong className="change_font_size">
                            <i className="fa-solid fa-hourglass-half me-1"></i> 
                            Language :
                          </strong>
                          <p className="mb-0 ms-1">{item.language}</p>
                        </div>
                        <div className="box2 me-2   badge-bg d-flex align-items-center justify-content-center">
                          <strong className="change_font_size">
                            <i className="fa-solid fa-calendar-days me-1"></i>
                            Date :
                          </strong>
                          {/* <p className="mb-0 ms-1">
                    
                            {moment
                            (props.chat.chat_started_at
                            ).format("L")}
                          </p> */}
                        </div>
                        <div className="box2 me-2   badge-bg d-flex align-items-center justify-content-center">
                          <strong className="change_font_size">
                            <i className="fa-solid fa-suitcase me-1"></i>
                            Skill :
                          </strong>
                          <p className="mb-0 ms-1">{item.skillset}</p>
                        </div>

                        <div className="box2 me-2   badge-bg d-flex align-items-center justify-content-center">
                          <strong className="change_font_size">
                            <i
                              className="fa-solid fa-eye"
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleShowDetails(item.chat_session_id)
                              }
                            ></i>
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <div
                className="text-muted d-flex"
                style={{
                  flexDirection: "column",
                  marginTop: "25%",
                }}
              >
                <span className="mx-auto">
                  <RiErrorWarningLine size={30} />
                </span>
                <span className="mx-auto">
                  <h6
                    className="text-muted mt-2"
                    style={{ fontFamily: "poppins" }}
                  >
                    No Files Found
                  </h6>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* {Interaction Modal} */}

        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          style={{ outline: "none" }}
        >
          <Modal.Header
            style={{
              height: "42px",
              color: "white",
              position: "relative",
              top: "-1px",
              backgroundColor: "#294e9f",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Modal.Title style={{ color: "#fff" }}>Summary</Modal.Title>
            <Modal.Title>
              <AiOutlineCloseCircle
                size={20}
                style={{ color: "#fff", cursor: "pointer" }}
                onClick={handleClose}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="d-flex justify-content-between"
              style={{ height: "5rem" }}
            >
              <div className="text-primary font-weight-bold">
                Chat Arrival At
                <div className="mt-4  font-weight-normal text-dark">
                  {moment(summaryArrivalDate).format("lll")}
                </div>
              </div>
              <div className="text-primary font-weight-bold">
                Chat Started At
                <div className="mt-4  font-weight-normal text-dark">
                  {moment(summaryStartedDate).format("lll")}
                </div>
              </div>
              <div className="text-primary font-weight-bold">
                Chat End At
                <div className="mt-4  font-weight-normal text-dark">
                  {summaryEndDate ? moment(summaryEndDate).format("lll") : "--"}
                </div>
              </div>

              <div className="text-primary font-weight-bold">
                Channel
                <div className="mt-4 font-weight-normal text-dark">
                  {summaryChannel}
                </div>
              </div>
              <div className="text-primary font-weight-bold">
                Agent
                <div className="mt-4  font-weight-normal text-dark">
                  {summaryAgent}
                </div>
              </div>

              <div className="text-primary font-weight-bold">
                View
                <div className="mt-4 d-flex mx-2">
                  <BsChatSquareText
                    onClick={() => {
                      handlechatShow();
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <div className="d-flex p-2  justify-content-end">
            <Button onClick={handleClose} variant="primary">
              Close
            </Button>
          </div>
        </Modal>
        {/* {Interaction Modal} */}

        {/* Interaction preview msg modal */}

        <Modal
          size="sm"
          show={chatmodal}
          onHide={handlechatClose}
          aria-labelledby="example-modal-sizes-title-sm"
          style={{ outline: "none", overflow: "hidden" }}
        >
          <Modal.Header style={{ backgroundColor: "#0b3363", color: "#fff" }}>
            <Modal.Title
              id="example-modal-sizes-title-sm"
              style={{ color: "#fff" }}
            >
              Conversation
            </Modal.Title>

            <Modal.Title>
              <AiOutlineCloseCircle
                size={20}
                style={{ color: "#fff", cursor: "pointer" }}
                onClick={handlechatClose}
              />
            </Modal.Title>

            {/* <div className="d-flex w-100 justify-content-between align-items-center">
              <Modal.Title style={{ border: "black", color: "#fff" }}>
                Conversation
              </Modal.Title>
              <span>
                <AiOutlineCloseCircle
                  size={18}
                  onClick={handlechatClose}
                  style={{ cursor: "pointer" }}
                />
              </span>
            </div> */}
          </Modal.Header>
          <Modal.Body
            style={{ height: "20rem", backgroundColor: "#efeae2",overflow:"hidden"}}
            className="chat_div"
          >
            <div className="chat-box-body " >
              <div className="chat-logs " >
                <div className="" id="" >
                  <div className="chat-r" >
                    <div className="user-chat-main d-flex justify-content-end flex-column align-items-end" >
                      <div className="user-chat text-break" >
                        {chatHistory.map((message, index) => {
                          // console.log('chatHistory',message)

                          return (
                            <div className="w-100" >
                              <div className="w-100">

                                {/* {message.msg_sent_type == "NOTIFICATIONS" && (
                          <div className="msgNotify_client msgNotify_sum">
                            <span
                              style={{
                                position: "relative",
                                bottom: "8px",
                                fontSize: "10px",
                              }}
                            >
                              {message.message}
                            </span>
                          </div>
                        )} */}

                                {message.msg_sent_type != "NOTIFICATIONS" && (
                                  <div>
                                    {" "}
                                    <div
                                      className={`message ${!message.fromSelf ? "left_chat" : "right_chat"
                                        }`}
                                      style={{
                                        marginTop: `${index != 0 ? "20px" : ""}`,
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "10px",
                                          fontWeight: "bolder",
                                        }}
                                      >
                                        {message.senderName}
                                      </span>

                                      <p>
                                        {message.msg_sent_type == "TEXT" ? (
                                          <p
                                            className={`message ${!message.fromSelf
                                              ? "left_chat_text"
                                              : "right_chat_text"
                                              }`}
                                          >
                                            {message.message}
                                          </p>
                                        ) : message.msg_sent_type == "VIDEO" ? (
                                          <video width="140" height="100" controls>
                                            <source
                                              src={message.message}
                                              type="video/mp4"
                                            ></source>
                                          </video>
                                        ) : message.msg_sent_type == "AUDIO" ? (
                                          <audio
                                            controls
                                            src={message.message}
                                            style={{ width: "100%" }}
                                          ></audio>
                                        ) : message.msg_sent_type == "APPLICATION" ? (
                                          <a
                                            href={message.message}
                                            style={{ color: "blue" }}
                                            target="_blank"
                                          >
                                            {message.file_name}
                                          </a>
                                        ) : message.msg_sent_type == "IMAGE" ? (
                                          <div className="d-flex">
                                            <img
                                              className="mx-auto"
                                              src={message.message}
                                              alt="no img"
                                            />
                                          </div>
                                        ) : (
                                          <div></div>
                                        )}
                                      </p>
                                    </div>
                                    
                                    {/* <span
                                      className={` ${!message.fromSelf
                                          ? "left_chat-time"
                                          : "right_chat-time"
                                        }`}
                                    >
                                      {moment(message.time).format("lll")}
                                    </span> */}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="chat-time-r">


                    </div>
                  </div>

                  <div className="chat-l">
                    <div className="bot-chat-main d-flex justify-content-start">
                      <div className="d-flex justify-content-start flex-column align-items-start">
                        <div className="bot-chat text-break">
                     
                        </div>
                      </div>
                    </div>
                    <div className="chat-time-l">09:35</div>
                  </div>


                </div>
              </div>
            </div>

          </Modal.Body>
        </Modal>
        {/* Interaction preview msg modal */}
      </div>
    </>
  );
};

export default connect(mapStateToProps, {
  setselectedemail,
  setselectedmobile,
})(Interactiontab);
