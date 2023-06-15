import React, { useEffect, useRef, useState } from "react";
import "../../assets/chatasset/assets/styles/chat.css";
import "../../assets/chatasset/assets/styles/style.css";
import moment from "moment";
import { errorhandelApi } from "../../ApiCall/ErrorHandelApi";
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
} from "../../redux/actions/actions";
import io from "socket.io-client";
import axios from "axios";
import { BaseUrl, SocketUrl, errorApi } from "../../container/BaseUrl/BaseUrl";

// Component
import Contactlist from "../../components/chat-components/Contact-list-component/Contact-list.component";
import ChatComponent from "../../components/chat-components/Chat-component/Chat.component";
import Userlist from "../../components/chat-components/User-list-component/User-list.component";

const mapStateToProps = (state) => {
  return {
    spaceContent: state.data.spaceContent,
    chatid: state.data.chatid,
    refreshtogglechat: state.data.refreshtogglechat,
    chatdata: state.data.chatdata,
    selecteduserimage: state.data.selecteduserimage,
    togglechat: state.data.togglechat,
    usercolor: state.data.usercolor,
    uploadedFile: state.data.uploadedFile,
    internalExternal: state.data.internalExternal,
    chat: state.data.chat,
    availAgent: state.data.availAgent,
    selectedusername: state.data.selectedusername,
    selectedemail: state.data.selectedemail,
    selectedmobile: state.data.selectedmobile,
    selectedwhatsapp: state.data.selectedwhatsapp,
    selectedfacebook: state.data.selectedfacebook,
    selectedtwitter: state.data.selectedtwitter,
    selectedteams: state.data.selectedteams,
    selectedcompany: state.data.selectedcompany,
    selectedaddress: state.data.selectedaddress,
    selectedid: state.data.selectedid,
    agentList:state.data.agentList,
    message:state.data.message,
  };
};
const Chat = (props) => {
  let tenantId = localStorage.getItem("TenantId");
  const { chat, chatid, agentList } = props;
  const contentRef = useRef();
  const { spaceContent } = props;
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserid, setCurrentUserid] = useState("");
  const [message, setMessage] = useState([]);
  const [session_id, setsession_id] = useState("");
  const [sender_id, setsender_id] = useState("");
  const [reciver_id, setreciver_id] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [lastmessage, setLastmessage] = useState([]);
  const [chatEmail, setChatEmail] = useState("");
  const [CustomerTyping, setCustomerTyping] = useState(false);
  const socket = useRef();

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

  useEffect(() => {
    socketConnection();
  }, [currentUserName, chat, chatid]);

  socket.current = io(SocketUrl + `/${tenantId}`);

  const socketConnection = async () => {
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
      console.log("Connected");
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
          console.log("Connected Its a external chat",datas.id);
          socket.current.emit("add-user", datas.id);
        }
    });
    socket.current.on("msg-receive", (msg) => {
      console.log("INCOMING MESSAGE",msg);
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
      console.log("Typing-msg-receive",msg)

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
      console.log(newUser)
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

      console.log(props)
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


      console.log("newagent",newagent);
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
        arrivalMessage && props.setMessage((prev) => [...prev, arrivalMessage]);
      }
    }
  }, [arrivalMessage]);

  // useEffect(() => {
  //   contentRef.current.scrollTop =
  //     contentRef.current.scrollHeight - contentRef.current.clientHeight;
  // }, [spaceContent, arrivalMessage, message, agentList]);

  return (
    <>
      <section className="dashboard overflow-hidden">
        <div className="container-fluid">
          <div className="wapper_sub">
            <div className="sub_wapper">
              <div className="container-fluid p-0">
                <div className="row dvh-89">
                  {/* Contact list */}
                  <Contactlist />
                  {/* Chat */}
                  <ChatComponent handleTyping={handleTyping} handleSendMsg={handleSendMsg} data={props}/>
                  {/* User Details */}
                  {localStorage.getItem("ChatType") == "Internal" ? (
                    ""
                  ) : (
                    <Userlist />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default connect(mapStateToProps, {
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
  setMessage
})(Chat);
