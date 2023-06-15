import React, { useState, useRef, useEffect } from "react";
import pic from "../../../assets/chatasset/assets/images/54.png";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import { BaseUrl, errorApi } from "../../../container/BaseUrl/BaseUrl";
import {
  setAddTopicToggle,
  setAddTopicInput,
  setchatmessage,
  setcontactlist,
  setcontactlist1,
  setcontactlist2,
  setrefreshtogglechat,
  setconfchatrefresh,
  setAgentList,
  setinternalchatrefresh,
  setchatdata,
  setchatid,
  setselectedmobile,
  setselectedemail,
  setselectedusername,
  setchattype,
  setinternalchatnotify,
  setchatdataforinternal,
  setConferenceNotification,
  setavailagent,
  setloadmore,
  setMessage,
} from "../../../redux/actions/actions";
import ChatInput from "./ChatInput.component";

const mapStateToProps = (state) => {
  return {
    spaceContent: state.data.spaceContent,
    togglechat: state.data.togglechat,
    refreshtogglechat: state.data.refreshtogglechat,
    chat: state.data.chat,
    chatType: state.data.chatType,
    chatMessage: state.data.chatMessage,
    contactList: state.data.contactList,
    contactList1: state.data.contactList1,
    contactList2: state.data.contactList2,
    chatid: state.data.chatid,
    confchatrefresh: state.data.confchatrefresh,
    agentList: state.data.agentList,
    internalchatrefresh: state.data.internalchatrefresh,
    internalchatnotify: state.data.internalchatnotify,
    chatdataforinternal: state.data.chatdataforinternal,
    conferenceNotification: state.data.conferenceNotification,
    conferenceNotificationVal: state.data.conferenceNotificationVal,
    availAgent: state.data.availAgent,
    loadmoretoggle: state.data.loadmoretoggle,
    addTopicInput: state.data.addTopicInput,
    addTopicToggle: state.data.addTopicToggle,
    message: state.data.message,
  };
};

const Message = (props) => {
  const {
    chat,
    chatid,
    handleTyping,
    handleSendMsg,
    data,
    // message,
    // setMessage,
  } = props;
  const tenantId = localStorage.getItem("TenantId");
  const socket = useRef();
  const contentRef = useRef();
  const { spaceContent } = props;
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserid, setCurrentUserid] = useState("");
  const [message, setMessage] = useState([]);
  const [messagesenttype, setMessagesenttype] = useState("");
  const [lastmessage, setLastmessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [CustomerTyping, setCustomerTyping] = useState(false);
  const [eventKey, setEventKey] = useState("chatContainer");
  const [initiate, setInitiate] = useState("true");
  const [showcobrowse, setShowcobrowse] = useState(false);
  const [iframeopen, setIframeopen] = useState(false);

  const [showAddTopic, setShowAddTopic] = useState(false);
  const handleCobrowseShow = () => setShowcobrowse(true);
  const handleCobrowseClose = () => setShowcobrowse(false);

  const handleAddTopicOpen = () => setShowAddTopic(true);
  const handleAddTopicClose = () => setShowAddTopic(false);
  const hideInitiate = () => {
    setInitiate(!initiate);
  };
  const [chatEmail, setChatEmail] = useState("");
  const [cobrowswerinput, setCobrowserInput] = useState([]);
  const [cobrowse, setCobrowse] = useState([]);
  const [session_id, setsession_id] = useState("");
  const [sender_id, setsender_id] = useState("");
  const [reciver_id, setreciver_id] = useState("");
  const [loadmoredata, setLoadmoredata] = useState([]);
  const [openiframemodal, setOpeniframemodal] = useState("");
  const [addTopicToggle, setAddTopicToggle] = useState(false);

  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];

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
        // console.log("from error api", data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    async function getData() {
      const datas = await JSON.parse(localStorage.getItem("tokenAgent"));
      setCurrentUserid(datas.id);
      setCurrentUserName(datas.username);
      try {
        const response = await axios.post(
          BaseUrl + "/message/getCurrentChatMessage",
          {
            sessionId: chatid,
          },
          {
            headers: {
              tenantId: tenantId,
            },
          }
        );

        if (chat.chat_type == "internal") {
          let sender_id = chat.senderDetails[0]._id;
          let current_agent_id = datas.id;
          if (sender_id != current_agent_id) {
            if (response.data.data) {
              response.data.data.forEach((element) => {
                element["fromSelf"] = element["fromSelf"] ? false : true;
              });
              setMessage(response.data.data);
            } else {
              setMessage([]);
            }
          } else {
            if (response.data.data) {
              setMessage(response.data.data);
            } else {
              setMessage([]);
            }
          }
        } else {
          // console.log(response);
          if (response.data.data) {
            setMessage(response.data.data);
            // console.log("chat api response", response.data);
          } else {
            setMessage([]);
          }
        }
      } catch (error) {
        setMessage([]);
        errorHandel(error, "/message/getCurrentChatMessage");
      }
    }
    getData();
    setCustomerTyping(false);
  }, [chat, chatid]);

  return (
    <div>
      <div className="chat-box p-2">
        <div className="chat-box-body ">
          <div className="chat-logs ">
            <div className="messages" id="chat">
              <div className="time">Today at {defaultValue}</div>

              {message.map((item) => {
                if (item.msg_sent_type == "NOTIFICATIONS") {
                  return <div className="time">{item.message}</div>;
                } else if (item.fromSelf == true) {
                  return (
                    <div key={item.id} className="chat-r">
                      <div className="user-chat-main d-flex justify-content-end flex-column align-items-end">
                        <div className="user-chat text-break">
                          {item.message}
                        </div>
                      </div>
                      <div className="chat-time-r">
                        {moment(item.time).format("LL ,hh:mm")}
                      </div>
                    </div>
                  );
                } else if (item.fromSelf == false) {
                  return (
                    <div className="chat-l">
                      <div className="bot-chat-main d-flex justify-content-start">
                        <div className="chat-message__avatar-frame">
                          <img
                            src={pic}
                            alt="avatar"
                            className="chat-message__avatar"
                          />
                        </div>
                        <div className="d-flex justify-content-start flex-column align-items-start w-100">
                          {item.msg_sent_type == "TEXT" ? (
                            <div className="bot-chat text-break">
                              {item.message}
                            </div>
                          ) : (
                            ""
                          )}

                          {item.msg_sent_type == "IMAGE" ? (
                            <div className="card p-2">
                              <img
                                src={item.message}
                                height="50px"
                                width={150}
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          {item.msg_sent_type == "VIDEO" ? (
                            <div className="card p-2">
                              <video width="150" height="150" controls>
                                <source
                                  src={item.message}
                                  type="video/mp4"
                                ></source>
                              </video>
                            </div>
                          ) : (
                            ""
                          )}

                          {item.msg_sent_type == "AUDIO" ? (
                            <div className="card p-2">
                              <audio className="msg_audio" controls>
                                <source src={item.message}></source>
                              </audio>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="chat-time-l">
                        {moment(item.time).format("LL ,hh:mm")}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <ChatInput
              handleTyping={handleTyping}
              handleSendMsg={handleSendMsg}
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Message

export default connect(mapStateToProps, {
  setAddTopicToggle,
  setAddTopicInput,
  setchatmessage,
  setcontactlist,
  setcontactlist1,
  setcontactlist2,
  setconfchatrefresh,
  setAgentList,
  setinternalchatrefresh,
  setchatdata,
  setchatid,
  setrefreshtogglechat,
  setselectedmobile,
  setselectedemail,
  setselectedusername,
  setchattype,
  setinternalchatnotify,
  setchatdataforinternal,
  setConferenceNotification,
  setavailagent,
  setloadmore,
  setMessage,
})(Message);
