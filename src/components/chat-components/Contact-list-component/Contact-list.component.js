import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CSpinner } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BaseUrl } from "../../../container/BaseUrl/BaseUrl";
import { connect } from "react-redux";
import {
  setselectedusername,
  setselectedemail,
  setselectedmobile,
  setselectedwhatsapp,
  setselectedfacebook,
  setselectedtwitter,
  setselectedteams,
  setselectedcompany,
  setselectedadress,
  setselectedid,
  setselecteduserimage,
  setchatdata,
  setchattype,
  setchatid,
  setchatduration,
  setrefreshtogglechat,
  setcontactlist,
  setcontactlist2,
  setonloadContactRefresh,
  setconfchatrefresh,
  setinternalexternal,
  settogglechat,
  setAgentList,
  setinternalchatnotify,
  setinternalchatrefresh,
  setSelectedColor,
  setloadmore,
  setAddTopicInput,
  setAddTopicToggle,
  setExternalChatData,
} from "../../../redux/actions/actions";
import axios from "axios";
import { RiErrorWarningLine } from "react-icons/ri";

// Api
import {
  getDataOnloadApi,
  getDataApi,
  acceptClientApi,
  getDataAfterAcceptClientApi,
  rejectChatApi,
  getInternalAgentsApi,
  getAllInternalAgentsApi,
  getAllInternalAgentsApi2,
  createInternalChatApi,
} from "../../../ApiCall/ChatApi";
import { logoutApi } from "../../../ApiCall/LogoutApi";
// Component
import NewIncomingRequest from "./Contact-list-child-component/New-incoming-request.component";
import ExternalContactList from "./Contact-list-child-component/External-ContactList.component";
import NonActiveAgent from "./Contact-list-child-component/NonActiveAgent.component";
import InternalAgentList from "./Contact-list-child-component/Internal-AgentList.component";

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    selectedusername: data.selectedusername,
    contactList: data.contactList,
    chatduration: data.chatduration,
    chatid: data.chatid,
    contactList2: data.contactList2,
    chat: data.chat,
    onloadContactRefresh: data.onloadContactRefresh,
    confchatrefresh: data.confchatrefresh,
    internalExternal: data.internalExternal,
    agentList: data.agentList,
    internalchatrefresh: data.internalchatrefresh,
    internalchatnotify: data.internalchatnotify,
    usercolor: state.data.usercolor,
    loadmoretoggle: state.data.loadmoretoggle,
    externalChatData: state.data.externalChatData,
  };
};

const Contactlist = (props) => {
  let permission = JSON.parse(localStorage.getItem("permission"));
  let result = permission.find(
    (item) => item === "EXT_CHAT" || item === "IN_CHAT"
  );
  let indexNum = localStorage.getItem("indexOf");
  const tenantId = localStorage.getItem("TenantId");
  const navigate = useNavigate();
  const socket = useRef();
  const [availAgent, setAvailAgent] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [agentTransferId, setAgentTransferId] = useState("agent");
  const { selectedusername, chat, chatid, onloadContactRefresh } = props;
  const handleTransferClose = () => setShowTransferMod(false);
  const handleTransferOpen = (session) => {
    setSessionId(session);
    setShowTransferMod(true);
  };
  const [showTransferMod, setShowTransferMod] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [oldId, setOldId] = useState("");
  const [currentuser, setCurrentUser] = useState();
  const [visible, setVisible] = useState(true);
  const [accept, setAccept] = useState(false);
  const [internalClient, setInternalClient] = useState([]);
  const [internalClientFiltered, setInternalClientFiltered] = useState([]);
  const [intervalId, setIntervalId] = useState(0);
  const [agentContactList, setAgentContactList] = useState([]);
  const [nonActiveAgents, setNonActiveAgents] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [internalspinner, setInternalspinner] = useState(false);
  const [searchterm, setSearchterm] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (!localStorage.getItem("tokenAgent")) {
      navigate("/");
    } else {
      getDataOnload();
      getInternalAgents();
      getData();
      let acceptClient = JSON.parse(localStorage.getItem("client"));
      if (acceptClient != null) {
        onclickhandlechangeexternalContact(acceptClient, 0);
      }
    }
    if (props.confchatrefresh) {
      clearInterval(intervalId);
      getDataAfterAcceptClient();
    }
    if (props.internalchatrefresh) {
      getAllInternalAgents("not_create");
    }
  }, [props.confchatrefresh, props.internalchatrefresh]);

  // const AutoReject = async () => {
  //   const currentTime = moment();
  //   props.contactList2.forEach((request) => {
  //     const requestArrivalTime = moment(request.arrival_at);
  //     const diffInMinutes = currentTime.diff(requestArrivalTime, "minutes");
  //     if (diffInMinutes >= 2) {
  //       rejectchat(
  //         request.chat_session_id,
  //         request.agent,
  //         request.id,
  //         request.skillset,
  //         request.language,
  //         request.phonenumber,
  //         request.channel
  //       );
  //     }
  //   });
  // };
  // setInterval(AutoReject, 5000);

  const getDataOnload = () => {
    try {
      const datas = JSON.parse(localStorage.getItem("tokenAgent"));
      setCurrentUser(JSON.stringify(datas));
      setAgentId(datas.id);
      getDataOnloadApi()
        .then((res) => {
          // console.log("response from get Data On load", res);
          if (res.data.length > 0 && res.data) {
            props.setcontactlist(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getData = () => {
    getDataApi()
      .then((res) => {
        console.log("response from GetData", res);
        if (res.data.status) {
          props.setcontactlist2(res.data.data);
        }
      })
      .catch((err) => {
        // console.log(err);
      });

    var value = true;
  };

  const acceptClient = (client) => {
    localStorage.setItem("client", JSON.stringify(client));
    let filteredArray = props.contactList2.filter((item) => {
      return item.id !== client.id;
    });
    props.setcontactlist2(filteredArray);
    const data = JSON.parse(localStorage.getItem("tokenAgent"));
    const res = acceptClientApi(client)
      .then((res) => {
        console.log("Chat Accepted", res);
        if (res.data.status) {
          clearInterval(intervalId);
          getDataAfterAcceptClient();
          // window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setAccept((prev) => !prev);
  };

  const getDataAfterAcceptClient = () => {
    const datas = JSON.parse(localStorage.getItem("tokenAgent"));
    try {
      props.setconfchatrefresh(false);
      setCurrentUser(JSON.stringify(datas));
      getDataAfterAcceptClientApi()
        .then((data) => {
          console.log("get Data After Accept Client>>>>>>>", data);
          props.setcontactlist(data.data);
          props.setonloadContactRefresh(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  const rejectchat = (
    chat_session_id,
    agentid,
    id,
    skillset,
    language,
    phone,
    channel
  ) => {
    let filteredArray = props.contactList2.filter((item) => {
      return item.id !== id;
    });
    props.setcontactlist2(filteredArray);
    let userId = JSON.parse(localStorage.getItem("tokenAgent"));
    let passUserId = userId.user_id;
    let data = {
      chat_session_id: chat_session_id,
      userID: passUserId,
      agentID: agentid,
      skillset: skillset,
      language: language,
      phone: phone,
      channel: channel,
      session_id: id,
    };
    rejectChatApi(data)
      .then((res) => {
        // console.log("chat rejected");
        window.location.reload(true);
      })
      .catch((err) => {
        window.location.reload(true);
        if (err.status == 401) {
          window.location.href = "/";
        }
      });
  };

  const updateCount = (id) => {
    props.contactList.map((contact, index) => {
      if (contact.id === id) {
        contact.unreadcount = 0;
      }
      if (contact.id === oldId) {
        contact.unreadcount = 0;
      }
    });
  };

  const updateCount1 = (id) => {
    props.agentList.map((contact, index) => {
      if (contact.id === id) {
        contact.unreadcount = undefined;
      }
      if (contact.id === oldId) {
        contact.unreadcount = undefined;
      }
    });
  };

  const getInternalAgents = () => {
    getInternalAgentsApi()
      .then((res) => {
        // console.log("getInternalAgents", res);
        if (res.data.success) {
          let internalAgents = res.data.data;
          let getCurrentAgent = JSON.parse(localStorage.getItem("tokenAgent"));
          let UserId = getCurrentAgent.user_id;
          let filterAgents = internalAgents.filter((data) => {
            return UserId != data.user_id;
          });
          setInternalClient(filterAgents);
          getAllInternalAgents("not_create");
        } else {
          setInternalClient([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllInternalAgents = (val) => {
    props.setinternalchatrefresh(false);
    const datas = JSON.parse(localStorage.getItem("tokenAgent"));
    getAllInternalAgentsApi(val).then((res) => {
      let agents = res.data.data;
      setAgentId(datas.id);
      getAllInternalAgentsApi2()
        .then((data1) => {
          // console.log("getAllInternalAgents2", data1);
          if (data1.data.success) {
            let internalAgentss = data1.data.data;
            let getCurrentAgent = JSON.parse(
              localStorage.getItem("tokenAgent")
            );
            let UserId = getCurrentAgent.user_id;
            let filterAgents = internalAgentss.filter((data) => {
              return UserId != data.user_id;
            });
            const nonActiveAgents = filterAgents.filter(
              (f) =>
                !agents.some(
                  (d) =>
                    d.user_id == f.user_id || d.senderDetails[0]._id == f.id
                )
            );
            // console.log("nonActiveAgents", nonActiveAgents);
            setNonActiveAgents(nonActiveAgents);
          }
          props.setAgentList(agents);
          setAgentContactList(agents);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const createInternalChat = (UserId) => {
    try {
      // setInternalspinner(true);
      createInternalChatApi(UserId).then((data) => {
        // console.log("createInternalChat", data);
        if (data.data.success) {
          setInternalspinner(false);
          let details = data.data.session;
          let arr = {
            _id: details.id,
            id: details.id,
            phonenumber: details.phonenumber,
            email: details.email,
            channel: details.channel,
            chat_type: "internal",
            chat_session_id: details.chat_session_id,
            user_id: details.user_id,
            agent: details.agent,
            reciverDetails: [
              {
                _id: details.receiver_id,
                username: "",
              },
            ],
            senderDetails: [
              {
                _id: details.sender_id,
                username: "",
              },
            ],
          };
          props.setinternalchatnotify(false);
          props.setchatdata(arr);
          props.setchatid(data.data.data.chat_session_id);
          props.setrefreshtogglechat(true);
          props.setselectedmobile(data.data.data.phonenumber);
          props.setselectedemail(data.data.data.email);
          props.setselectedusername(data.data.data.username);
          props.setchattype("WEBCHAT");
        }
        setInternalClientFiltered([]);
        setTimeout(() => {
          getAllInternalAgents("create");
        }, 1000);
      });
    } catch (error) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  let randomColors = [
    "#E1F2FB",
    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",
    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",
    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",
    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#E1F2FB",

    "#F3DFE3",
    "#E9B2BC",
    "#F6E5F5",
    "#FBF4F9",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
    "#F3DFE4",
    "#E9B2D4",
    "#F6E5L3",
    "#FBF4T6",
    "#B9CCED",
    "#FEFCF3",
    "#F5EBEO",
    "#FODBDB",
    "#DBA39A",
  ];

  const onclickhandlechangeexternalContact = (contact, index) => {
    props.setExternalChatData(contact);
    localStorage.setItem("client", JSON.stringify(contact));
    setOldId(contact.id);
    updateCount(contact.id);
    props.setchatid(contact.chat_session_id);
    props.setselectedusername(
      contact.unique_id.username == ""
        ? contact.unique_id.phonenumber
        : contact.unique_id.username
    );
    props.setchatdata(contact);
    props.setchattype("WEBCHAT");
    props.setSelectedColor(randomColors[index]);
    props.setselectedmobile(
      contact.unique_id.phonenumber == ""
        ? "Empty"
        : contact.unique_id.phonenumber
    );
    props.setselectedemail(
      contact.unique_id.email == "" ? "Empty" : contact.unique_id.email
    );
    props.setselectedwhatsapp(
      contact.unique_id.whatsappnumber == ""
        ? "Empty"
        : contact.unique_id.whatsappnumber
    );
    props.setselectedfacebook(
      contact.unique_id.facebookId == ""
        ? "Empty"
        : contact.unique_id.facebookId
    );
    props.setselectedtwitter(
      contact.unique_id.twitterId == "" ? "Empty" : contact.unique_id.twitterId
    );
    props.setselectedteams(
      contact.unique_id.teamsId == "" ? "Empty" : contact.unique_id.teamsId
    );
    props.setselectedcompany(
      contact.unique_id.company == "" ? "Empty" : contact.unique_id.company
    );
    props.setselectedadress(
      contact.unique_id.address == "" ? "Empty" : contact.unique_id.address
    );
    props.setselectedid(
      contact.unique_id.id == "" ? "Empty" : contact.unique_id.id
    );
    props.setAddTopicInput("");
    props.setAddTopicToggle("");
    props.setinternalchatnotify(false);
    props.setrefreshtogglechat(true);
    props.setloadmore(false);
  };
  const onclickhandlechangeinternalContact = (val, index) => {
    setOldId(val.id);
    updateCount1(val.id);
    props.setchatdata(val);
    props.setinternalchatnotify(false);
    props.setchatid(val.chat_session_id);
    props.setrefreshtogglechat(true);
    props.setselectedmobile(val.phonenumber);
    props.setselectedemail(val.email);
    props.setselectedusername(
      val.reciverDetails[0]._id != agentId
        ? val.reciverDetails[0].username
        : val.senderDetails[0].username
    );

    props.setchattype("WEBCHAT");
    props.setSelectedColor(randomColors[index]);
    props.setloadmore(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
    localStorage.setItem("Tabclicked", newValue);
    props.setinternalexternal(newValue);
    if (newValue == 1) {
      localStorage.setItem("ChatType", "Internal");
      if (props.agentList.length != 0) {
        props.setrefreshtogglechat(true);
        props.setinternalchatnotify(false);
        props.settogglechat(false);
        props.setchatdata(props.agentList[0]);
        props.setchattype("WEBCHAT");

        props.setchatid(props.agentList[0].chat_session_id);
        props.setselectedmobile(props.agentList[0].phonenumber);
        props.setselectedemail(props.agentList[0].email);

        props.setselectedusername(
          props.agentList[0].reciverDetails[0]._id != agentId
            ? props.agentList[0].reciverDetails[0].username
            : props.agentList[0].senderDetails[0].username
        );

        props.setloadmore(false);
      } else {
        props.setselectedusername("");
        props.setchatid("");
      }
    } else {
      localStorage.setItem("ChatType", "External");
      if (props.contactList[0]) {
        props.setrefreshtogglechat(true);
        props.setinternalchatnotify(false);
        props.settogglechat(false);
        props.setchatdata(props.contactList[0]);
        props.setchattype("WEBCHAT");

        props.setchatid(props.contactList[0].chat_session_id);
        props.setselectedmobile(props.contactList[0].unique_id.phonenumber);
        props.setselectedemail(props.contactList[0].unique_id.email);

        props.setselectedusername(props.contactList[0].unique_id.username);

        props.setrefreshtogglechat(true);
        props.setinternalchatnotify(false);
        props.settogglechat(true);
        props.setloadmore(false);
      } else {
        props.setselectedusername("");
        props.setselectedemail("");
        props.setchatid("");
        props.setchatdata([]);
      }
    }
  };


  console.log('agentList',props.agentList)
  return (
    <>
      <div className="col-md-3 border-end mt-3 ">
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            marginBottom: "10px",
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="External" sx={{ width: "137px" }} />
            <Tab label="Internal" sx={{ width: "137px" }} />
          </Tabs>
        </Box>

        {value == 0 && (
          <>
            {props.contactList2
              .filter((val) => {
                return val.id !== props.contactList2.id;
              })
              .map((client, index) => {
                return (
                  <NewIncomingRequest
                    key={client.id}
                    client={client}
                    index={index}
                    visible={visible}
                    currentSelected={currentSelected}
                    acceptClient={acceptClient}
                    rejectchat={rejectchat}
                  />
                );
              })}

            <div className="chat-users">
              {props.contactList.length > 0 ? (
                props.contactList.map((contact, index) =>
                  contact != undefined ? (
                    <ExternalContactList
                      key={contact.id}
                      contact={contact}
                      index={contact}
                      onclickhandlechangeexternalContact={
                        onclickhandlechangeexternalContact
                      }
                      chatid={chatid}
                    />
                  ) : (
                    <div></div>
                  )
                )
              ) : (
                <div className="chat-users" style={{ marginTop: "70%" }}>
                  <div
                    className="text-muted d-flex justify-content-center"
                    style={{ flexDirection: "column" }}
                  >
                    <span className="mx-auto">
                      <RiErrorWarningLine size={30} />
                    </span>
                    <span className="mx-auto">
                      <h6
                        className="text-muted mt-2"
                        style={{ fontFamily: "poppins" }}
                      >
                        No Chat Found
                      </h6>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {value == 1 && (
          <>
            {internalspinner && (
              <div
                className="d-flex justify-content-center position-absolute h-100"
                style={{
                  background: "white",
                  opacity: "0.8",
                  zIndex: 999,
                  width: "92%",
                }}
              >
                <CSpinner
                  color="primary"
                  style={{ top: "25%", position: "relative" }}
                />
              </div>
            )}
            {/* Search Input */}
            <div className="nav-item d-flex mb-2">
              <div className="chat-search rounded position-relative w-100">
                <input
                  className=" form-control color_b"
                  type="search"
                  style={{
                    height: "30px",
                    paddingLeft: "24px",
                    borderRadius: "14px",
                  }}
                  placeholder="Search People"
                  aria-label="Search People"
                  onChange={(e) => {
                    setSearchterm(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* list of contact */}
            <div className="chat-users">
              {props.agentList
                .filter((val) => {
                  if (searchterm == "") {
                    return val;
                  } else if (
                    val.reciverDetails[0].username
                      .toLowerCase()
                      .includes(searchterm.toLowerCase())
                  ) {
                    return val;
                  }
                })

                .map((val, index) => {
                  return (
                    <InternalAgentList
                      key={val.id}
                      val={val}
                      index={index}
                      chatid={chatid}
                      agentId={agentId}
                      onclickhandlechangeinternalContact={
                        onclickhandlechangeinternalContact
                      }
                    />
                  );
                })}
            </div>
            <div style={{ marginBottom: "15vh" }}>
              {nonActiveAgents
                .filter((client) => {
                  if (searchterm == "") {
                    return client;
                  } else if (
                    client.username
                      .toLowerCase()
                      .includes(searchterm.toLowerCase())
                  ) {
                    return client;
                  }
                })
                .map((client, index) => {
                  return (
                    <NonActiveAgent
                      key={client.id}
                      client={client}
                      createInternalChat={createInternalChat(client.user_id)}
                      setInternalspinner={setInternalspinner}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default connect(mapStateToProps, {
  setselectedusername,
  setselectedwhatsapp,
  setselectedfacebook,
  setselectedtwitter,
  setselectedteams,
  setselectedcompany,
  setselectedadress,
  setselectedid,
  setselectedemail,
  setselectedmobile,
  setrefreshtogglechat,
  setselecteduserimage,
  setchatdata,
  setchatid,
  setchatduration,
  setchattype,
  setcontactlist,
  setcontactlist2,
  setonloadContactRefresh,
  setconfchatrefresh,
  setinternalexternal,
  settogglechat,
  setAgentList,
  setinternalchatrefresh,
  setinternalchatnotify,
  setSelectedColor,
  setloadmore,
  setAddTopicInput,
  setAddTopicToggle,
  setExternalChatData,
})(Contactlist);
