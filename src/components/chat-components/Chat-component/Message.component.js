import React, { useState, useRef, useEffect } from "react";
import pic from "../../../assets/chatasset/assets/images/54.png";
import { errorhandelApi } from "../../../ApiCall/ErrorHandelApi";
import axios from "axios";
import io from "socket.io-client";
import moment from "moment";

import {
  BaseUrl,
  SocketUrl,
  errorApi,
} from "../../../container/BaseUrl/BaseUrl";
import { connect } from "react-redux";
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
  const { chat, chatid } = props;
  let tenantId = localStorage.getItem("TenantId");
  const contentRef = useRef();
  const { spaceContent } = props;
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserid, setCurrentUserid] = useState("");
  const [message, setMessage] = useState([]);
  const [session_id, setsession_id] = useState("");
  const [sender_id, setsender_id] = useState("");
  const [reciver_id, setreciver_id] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [lastmessage, setLastmessage] = useState([]);
  const [CustomerTyping, setCustomerTyping] = useState(false);
  const socket = useRef();

  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date(date).toISOString().split("T")[0];

  // ! SOCKET USEEFFECT//////////////////////////////////////////////////////
  useEffect(() => {
    socketConnection();
  }, [currentUserName, chat, chatid]);
  // ! SOCKET USEEFFECT//////////////////////////////////////////////////////

  // ? GET CURRENT MESSAGE USEEFFECT/////////////////////////////////////////
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
          if (response.data.data) {
            setMessage(response.data.data);
            console.log("chat api response", response.data.data);
          } else {
            setMessage([]);
          }
        }
      } catch (error) {
        setMessage([]);
        // errorHandel(error, "/message/getCurrentChatMessage");
      }
    }
    getData();
    setCustomerTyping(false);
  }, [chat, chatid]);
  // ? GET CURRENT MESSAGE USEEFFECT/////////////////////////////////////////

  // *SOCKET CONNECTION/////////////////////////////////////////////////////

  const socketConnection = async () => {
    socket.current = io(SocketUrl + `/${tenantId}`);
    console.log("socket function working");
    const datas = await JSON.parse(localStorage.getItem("tokenAgent"));
    socket.current = io(SocketUrl + `/${tenantId}`);
    socket.current.on("disconnect", (msg) => {
      console.log("socket=> Disconnected");
    });
    socket.current.on("reconnect", () => {
      console.log("socket=> Reconnecting");
    });
    socket.current.on("connect", function () {
      console.log("socket=> Connected");
      if (chat.chat_type != undefined)
        if (chat.chat_type == "internal") {
          console.log("Connected its internal chat");
          let sender_id = chat.senderDetails[0]._id;
          let current_agent_id = datas.id;
          console.log(sender_id, current_agent_id);
          if (sender_id == current_agent_id) {
            console.log("its a sender data");
            socket.current.emit("add-user", datas.id);
          } else {
            console.log("its a receiver data");
            socket.current.emit("add-user", chat.id);
          }
        } else {
          console.log("Connected Its a external chat", datas.id);
          socket.current.emit("add-user", datas.id);
        }
    });
    socket.current.on("msg-receive", (msg) => {
      console.log("INCOMING MESSAGE", msg);
      let updateChat;
      if (chat.chat_type == "internal") {
        setsession_id("");
        setsender_id("");
        setreciver_id("");

        // socket.current.emit("add-user", msg.from);
        if (msg.chatType == "inbound") {
          var i = 0;
          let setActive = props.agentList.filter((lis) => {
            i = i + 1;
            return lis._id == msg.from;
          });

          // updateChat = setActive[0];

          if (chat.id == msg.from) {
            props.setinternalchatnotify(true);
            setCustomerTyping(false);

            setArrivalMessage({
              fromSelf: false,
              session_id: msg.session_id,
              message: msg.msg,
              senderName: msg.senderName,
              sender: msg.to,
              receiver: msg.from,
              time: moment().format(),
              msg_sent_type: msg.msg_sent_type,
              file_name: msg.file_name,
              captions: msg.captions,
            });
          }
          console.log("this is inbound");

          console.log("chat session id", setActive[0].chat_session_id);
        } else {
          let setActive = props.agentList.filter((lis) => {
            return lis.agent == msg.from;
          });
          console.log("New message from" + JSON.stringify(setActive));
          // updateChat = setActive[0];

          if (msg.from == chat.agent) {
            props.setinternalchatnotify(true);
            setCustomerTyping(false);
            setArrivalMessage({
              fromSelf: false,
              session_id: msg.session_id,
              message: msg.msg,
              senderName: msg.senderName,
              sender: msg.to,
              receiver: msg.from,
              time: moment().format(),
              msg_sent_type: msg.msg_sent_type,
              file_name: msg.file_name,
              captions: msg.captions,
            });
          }
        }
      } else {
        setLastmessage(msg);
        // console.log("last-msg testing",chat.id);
        // console.log("last-msg testing",msg.from);
        if (chat.id == msg.from) {
          console.log("last-msg testing", {
            fromSelf: false,
            message: msg.msg,
            session_id: msg.session_id,
            senderName: msg.senderName,
            sender: msg.from,
            receiver: msg.to,
            time: moment().format(),
            msg_sent_type: msg.msg_sent_type,
            file_name: msg.file_name,
            captions: msg.captions,
          });
          setArrivalMessage({
            fromSelf: false,
            message: msg.msg,
            session_id: msg.session_id,
            senderName: msg.senderName,
            sender: msg.from,
            receiver: msg.to,
            time: moment().format(),
            msg_sent_type: msg.msg_sent_type,
            file_name: msg.file_name,
            captions: msg.captions,
          });
          setCustomerTyping(false);
        }
        if (
          (msg.conference && chat.id == msg.conference_id) ||
          (msg.conference && chat.id == msg.to)
        ) {
          setCustomerTyping(false);

          setArrivalMessage({
            fromSelf: true,
            message: msg.msg,
            session_id: msg.session_id,
            senderName: msg.senderName,
            sender: msg.from,
            receiver: msg.to,
            msg_sent_type: msg.msg_sent_type,
            file_name: msg.file_name,
            captions: msg.captions,
          });
        }
      }
    });
    socket.current.on("typing-msg-receive", (msg) => {
      console.log("Typing-msg-receive", msg);
      if (msg.chatdetails.chat_type == "internal") {
        setsession_id(msg.chatdetails.chat_session_id);
        setsender_id(msg.chatdetails.senderDetails[0]._id);
        setreciver_id(msg.chatdetails.senderDetails[0]._id);
        setCustomerTyping(true);
      } else {
        if (chat.id == msg.from) {
          setCustomerTyping(true);
        }
      }
    });
    socket.current.on("get-new-req", (newUser) => {
      console.log("get-new-req", newUser);

      const newReqAgent = [];
      let listrequest = {};

      if (datas.id === newUser.agent) {
        listrequest = newUser;
        console.log("New request", listrequest);

        if (props.contactList && props.contactList2) {
          const filteredArray = props.contactList.filter(
            (item) => item.id !== listrequest.id
          );
          console.log("find accepted>>>>>>>>>>>>>>>", filteredArray);

          const filteredArraynew = props.contactList2.filter(
            (item) => item.id !== listrequest.id
          );
          console.log("find new request!!!!!!!!!!!!!!", filteredArraynew);

          if (filteredArray.length === 0 && filteredArraynew.length === 0) {
            newReqAgent.push(listrequest);
            props.setcontactlist2(newReqAgent);
          }
        }
        newReqAgent.push(listrequest);
        props.setcontactlist2(newReqAgent);
      }
    });

    socket.current.on("recv-internal", async (newUser) => {
      console.log(newUser);
      let lastElement = newUser.pop();
      var oldReqAgent = props.agentList;
      props.setinternalchatrefresh(true);

      oldReqAgent = oldReqAgent.filter((item) => {
        return item.user_id != lastElement.user_id;
      });
      var listrequest = [];
      props.setAgentList(oldReqAgent);
      if (lastElement) {
        if (datas.id == lastElement.reciverDetails[0]._id) {
          listrequest = lastElement;
          oldReqAgent.push(listrequest);
          props.setchatdata(listrequest);
        }
      }
    });
  };
  // *SOCKET CONNECTION/////////////////////////////////////////////////////

  const handleTyping = async () => {
    console.log("Typing Working");
    const data = await JSON.parse(localStorage.getItem("tokenAgent"));
    if (chat.chat_type == "internal") {
      console.log("typing event");
      let sender_id = chat.senderDetails[0]._id;
      let current_agent_id = data.id;
      if (sender_id == current_agent_id) {
        console.log("outbound");
        socket.current.emit("typing-send-msg", {
          to: chat.id,
          from: data.id,
          senderName: data.username,
          chatType: "outbound",
          chatdetails: chat,
        });
      } else {
        console.log("Typing Working inbound");
        socket.current.emit("typing-send-msg", {
          to: chat.agent,
          from: data.id,
          senderName: data.username,
          chatType: "inbound",
          chatdetails: chat,
        });
      }
    } else {
      socket.current.emit("typing-send-msg", {
        to: chat.id,
        from: data.id,
        senderName: data.username,
        chatType: "outbound",
        chatdetails: chat,
      });
    }
  };
  const handleSendMsg = async (msg, msg_type, fileNameForDoc) => {
    if (chat.chat_type == "internal") {
      var contactlist1 = props.agentList;

      console.log(props);
      var newcontactlist1 = [];
      var i = 0;
      var find = 0;
      contactlist1.map((client1, index) => {
        if (client1.id == chat.id) {
          find = i;
          client1.lastmessage = msg;
          client1.lastmessagetime = moment().format("h:mm A");
          client1.currentChat = client1.id == msg.from ? true : false;
          client1.unreadcount = 0;
        }
        newcontactlist1.push(client1);
        i++;
      });

      let newagent = insertAndShift(newcontactlist1, find, 0);

      console.log("newagent", newagent);
      props.setAgentList(newagent);
    } else {
      // alert("work");
      var contactlist = props.contactList;
      var newcontactlist = [];
      var i = 0;
      var find = 0;
      contactlist.map((client, index) => {
        if (client.id == chat.id) {
          find = i;

          client.lastmessage = msg;
          client.lastmessagetime = moment().format("h:mm A");
          client.lastmessageUpdatedat = moment();
          client.currentChat = client.id == msg.from ? true : false;
          client.unreadcount = 0;
        }
        newcontactlist.push(client);
        i++;
      });

      let newexternalcontact = insertAndShift(newcontactlist, find, 0);

      console.log(newexternalcontact);
      props.setcontactlist(newexternalcontact);
    }
    const data = await JSON.parse(localStorage.getItem("tokenAgent"));

    if (chat.chat_type == "internal") {
      let sender_id = chat.senderDetails[0]._id;
      let current_agent_id = data.id;
      if (sender_id == current_agent_id) {
        await axios.post(
          BaseUrl + "/message/addMessage",
          {
            from: data.id,
            to: chat.id,
            message: msg,
            senderName: data.username,
            receiverName: chat.username,
            messageFrom: "fromAgent",
            userType: chat.chat_type,
            session: chat.chat_session_id,
            msg_sent_type: msg_type,
            chatdetails: chat,
            file_name: fileNameForDoc,
            captions: "",
          },
          {
            headers: {
              tenantId: tenantId,
            },
          }
        );

        socket.current.emit("send-msg", {
          to: chat.id,
          session_id: chat.chat_session_id,
          from: data.id,
          senderName: data.username,
          chatType: "outbound",
          msg,
          msgType: "web",
          userType: chat.chat_type,
          msg_sent_type: msg_type,
          chatdetails: chat,
          file_name: fileNameForDoc,
          captions: "",
        });

        socket.current.emit("last-msg-send", {
          to: chat.id,
          from: data.id,
          chatType: "outbound",
          msg,
          senderName: data.username,
          userType: chat.chat_type,
          chatdetails: chat,
          file_name: fileNameForDoc,
          captions: "",
        });
      } else {
        await axios.post(
          BaseUrl + "/message/addMessage",
          {
            from: chat.id,
            to: chat.agent,
            message: msg,
            senderName: data.username,
            receiverName: chat.username,
            messageFrom: "fromClient",
            userType: chat.chat_type,
            session: chat.chat_session_id,
            msg_sent_type: msg_type,
            chatdetails: chat,
            file_name: fileNameForDoc,
            captions: "",
          },
          {
            headers: {
              tenantId: tenantId,
            },
          }
        );

        socket.current.emit("send-msg", {
          to: chat.agent,
          session_id: chat.chat_session_id,
          from: chat.id,
          senderName: data.username,
          chatType: "inbound",
          msg,
          msgType: "web",
          userType: chat.chat_type,
          msg_sent_type: msg_type,
          chatdetails: chat,
          file_name: fileNameForDoc,
          captions: "",
        });

        socket.current.emit("last-msg-send", {
          to: chat.agent,
          from: chat.id,
          chatType: "inbound",
          msg,
          senderName: data.username,
          userType: chat.chat_type,
          chatdetails: chat,
        });
      }
      setCustomerTyping(false);
    } else {
      await axios.post(
        BaseUrl + "/message/addMessage",
        {
          from: data.id,
          to: chat.id,
          message: msg,
          senderName: data.username,
          receiverName: chat.username,
          messageFrom: "fromAgent",
          userType: chat.chat_type,
          session: chat.chat_session_id,
          msg_sent_type: msg_type,
          file_name: fileNameForDoc,
          chatdetails: chat,
          captions: "",
        },
        {
          headers: {
            tenantId: tenantId,
          },
        }
      );

      socket.current.emit("send-msg", {
        to: chat.id,
        from: data.id,
        session_id: chat.chat_session_id,
        senderName: data.username,
        chatType: "outbound",
        msg,
        msgType: "web",
        userType: chat.chat_type,
        msg_sent_type: msg_type,
        chatdetails: chat,
        file_name: fileNameForDoc,
        captions: "",
      });

      socket.current.emit("last-msg-send", {
        to: chat.id,
        from: data.id,
        chatType: "outbound",
        msg,
        senderName: data.username,
        userType: chat.chat_type,
        chatdetails: chat,
      });
    }

    const msgs = [...message];
    msgs.push({
      fromSelf: true,
      message: msg,
      session_id: chat.chat_session_id,
      senderName: data.username,
      receiverName: chat.username,
      to: chat.id,
      sender: data.id,
      time: moment().format(),
      msg_sent_type: msg_type,
      file_name: fileNameForDoc,
      captions: "",
    });

    setCustomerTyping(false);
    setMessage(msgs);
  };

  function insertAndShift(arr, from, to) {
    let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
    arr.splice(to, 0, cutOut);
    return arr;
    // insert it at index 'to'
  }
  const getAvailableAgents = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let userId = JSON.parse(localStorage.getItem("tokenAgent"));
      let passUserId = userId.user_id;
      const data = await axios.post(
        BaseUrl + "/users/getAgents",
        { userId: passUserId },
        {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
            tenantId: tenantId,
          },
        }
      );
      if (data.data.success) {
        props.setavailagent(data.data.data);
      }
    } catch (error) {
      errorhandelApi(error, "/users/getAgents");
    }
  };

  useEffect(() => {
    if (chat && arrivalMessage) {
      if (chat.chat_session_id == arrivalMessage.session_id) {
        arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
      }
    }
  }, [arrivalMessage]);

  // useEffect(() => {
  //   contentRef.current.scrollTop =
  //     contentRef.current.scrollHeight - contentRef.current.clientHeight;
  // }, [spaceContent, arrivalMessage, message]);

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
              {chat &&
              session_id == chat.chat_session_id &&
              chat.chat_type == "internal" &&
              sender_id == chat.senderDetails[0]._id &&
              sender_id != "" &&
              CustomerTyping ? (
                <div class="chat-l">
                  <div class="bot-chat-main d-flex justify-content-start">
                    <div class="chat-message__avatar-frame">
                      <img
                        src={pic}
                        alt="avatar"
                        class="chat-message__avatar"
                      />
                    </div>
                    <div class="d-flex justify-content-start flex-column align-items-start">
                      <div class="bot-chat text-break">
                        <div class="typing-main">
                          <div class="typing typing-1"></div>
                          <div class="typing typing-2"></div>
                          <div class="typing typing-3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              {chat && chat.chat_type != "internal" && CustomerTyping ? (
                <div class="chat-l">
                <div class="bot-chat-main d-flex justify-content-start">
                  <div class="chat-message__avatar-frame">
                    <img
                       src={pic}
                      alt="avatar"
                      class="chat-message__avatar"
                    />
                  </div>
                  <div class="d-flex justify-content-start flex-column align-items-start">
                    <div class="bot-chat text-break">
                      <div class="typing-main">
                        <div class="typing typing-1"></div>
                        <div class="typing typing-2"></div>
                        <div class="typing typing-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ) : (
                <div></div>
              )}
            </div>
            <ChatInput
              handleTyping={handleTyping}
              handleSendMsg={handleSendMsg}
              data={props}
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
