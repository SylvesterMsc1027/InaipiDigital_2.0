import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import { BaseUrl, newBaseUrlLang } from "../../../../container/BaseUrl/BaseUrl";
import axios from "axios";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { setchatdata,setchatid,setConferenceNotificationVal,setConferenceNotification } from '../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  console.log('state@@@@@@',state)
    return {
      chatid: state.data.chatid,
      chat: state.data.chat,
    };
  };

const Transferagentmodel = ({ show, close,chatid,chat,setConferenceNotificationVal,setConferenceNotification }) => {
  console.log('Chat Id ',chatid)
  console.log('Chat  ',chat)

  const [skilldropdown, setSkilldropdown] = useState([]);
  const [languagedropdown, setLanguagedropdown] = useState([]);
  const [skilldropdownid, setSkilldropdownid] = useState("");
  const [languagedropdownid, setLanguagedropdownid] = useState("");
  const [agentbasedonfilter, setAgentbasedonfilter] = useState([]);
  const [agentTransferId, setAgentTransferId] = useState("agent");
  const [checkWhichCall, setCheckWhichCall] = useState("");
  const [showTransferMod, setShowTransferMod] = useState(false);

  const handleTransferClose = () => {
    setAgentTransferId("agent");
    setShowTransferMod(false);
  };

  const transferAgent = (val) => {
    setCheckWhichCall(val);
    setShowTransferMod(true);
  };

  const skillsetDropdown = () => {
    let data = {
      enabled: true,
    };
    axios
      .post(newBaseUrlLang + "usermodule/clientMaster/skills/list", data, {
        headers: {
          tenantId: localStorage.getItem('TenantId'),
        },
      })
      .then((res) => {
        // console.log("res", res.data.dataList);
        setSkilldropdown(res.data.dataList);
      })
      .catch((error) => {
        // errorHandel(error, "/skills/list")
      });
  };

  const languageDropdownList = () => {
    const access_token = localStorage.getItem("access_token");
    let data = {
      enabled: true,
    };
    axios
      .post(newBaseUrlLang + "usermodule/clientMaster/languages/list", data, {
        headers: {
          tenantId: localStorage.getItem('TenantId'),

          // 'Authorization': 'Bearer ' + access_token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("resLanguage", res);
        setLanguagedropdown(res.data.dataList);
      })
      .catch((error) => {
        console.log('error',error)
        // errorHandel(error, "/languages/list")
      });
  };

  const userBasedonLanguageSkillset = (skillId, languageid) => {
    let userId = JSON.parse(localStorage.getItem("tokenAgent"));
    // alert('id',id)
    const access_token = localStorage.getItem("access_token");
    let data = {
      language_id: languageid ? languageid : languagedropdownid,
      skillset_id: skillId ? skillId : skilldropdownid,
      agent_id: userId.id,
    };
    axios
      .post(BaseUrl + "/users/listUserBySkillsetIdLanguageId", data, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          tenantId: localStorage.getItem('TenantId'),
        },
      })
      .then((res) => {
        if (res.data.status == true) {
          console.log("datacominfg", res.data);
          setAgentbasedonfilter(res.data.data);
        }
      })
      .catch((error) => {
        // errorHandel(error, "/users/listUserBySkillsetIdLanguageId")
        // toast.warn('Server is down,please try after some time', {
        //   position: "top-right",
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   });
        //   if (err.response.status == 401) {
        //     window.location.href = "/";
        //   }

        console.log(error);
      });
  };

  const transferAgentSubmit = async () => {
    try {
      if (chat.is_customer_disconnected) {
       toast.error("Customer is disconnected");
      } else {
        const access_token = localStorage.getItem("access_token");
        let selected_name =
          agentTransferId.options[agentTransferId.selectedIndex].text;
        let selected_val = agentTransferId.value;

        if (selected_name === "agent") {
          alert("select agent");
          return false;
        }

        let old_agent_id = JSON.parse(localStorage.getItem("tokenAgent"));

        let dataToPass = {
          sessionId: chatid,
          agentId: selected_val,
          oldAgentId: old_agent_id.id,
        };

        let message_to_pass;
          message_to_pass =
            "Chat Transferred from " +
            old_agent_id.username +
            " to " +
            selected_name;
          const data = await axios.post(
            BaseUrl + "/users/transferAgent",
            dataToPass,
            {
              headers: {
                Authorization: "Bearer " + access_token,
                "Content-Type": "application/json",
                tenantId: localStorage.getItem('TenantId'),
              },
            }
          );
     

          if (data.data.status) {
            await axios.post(
              BaseUrl + "/message/addMessage",
              {
                from: old_agent_id.id,
                to: chat.id,
                message: message_to_pass,
                senderName: old_agent_id.username,
                receiverName: chat.username,
                messageFrom: "fromAgent",
                userType: chat.chat_type,
                session: chat.chat_session_id,
                msg_sent_type: "NOTIFICATIONS",
              },
              {
                headers: {
                  tenantId: localStorage.getItem('TenantId'),
                },
              }
            );

            toast.success("Chat Transferred success");
            handleTransferClose();
            window.location.reload();
          }
           else {
           
            toast.warn(data.data.message, {
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
     
      }
   
    } catch (error) {
      // errorHandel(error, "/users/conferenceAgent")
    }
  };
 
  useEffect(() => {
    languageDropdownList();
    skillsetDropdown();
    // getAvailableAgents();
  }, []);

  return (


    <Modal  show={show} size="md" onHide={close} >
      <Modal.Header  style={{ backgroundColor: '#0b3363', color: '#fff' }}>
        <Modal.Title style={{
          fontSize: 15,
          margin: "6px 0 0 0",
          textTransform: "capitalize",
        }}>Transfer Agent</Modal.Title>
        <AiOutlineCloseCircle onClick={close} style={{cursor:'pointer'}} />
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between">
          <div className="mx-1 w-50">
            <select
              className="form-select form-select-sm"
              aria-label="Default select example"
            onChange={(e) => {
              setSkilldropdownid(e.target.value);
              userBasedonLanguageSkillset(e.target.value, "");
            }}
            >
              <option selected disabled value="">
                Choose Skillset
              </option>
              {skilldropdown.length > 0 ? (
                    skilldropdown.map((item) => {
                      return (
                        <option id={item.skillId} value={item.skillId}>
                          {item.skillName}
                        </option>
                      );
                    })
                  ) : (
                    <option>No Skillset</option>
                  )}
            </select>
          </div>

          <div className='w-50'>
            <select
              className="form-select form-select-sm"
              aria-label="Default select example"
            onChange={(e) => {
              setLanguagedropdownid(e.target.value);
              userBasedonLanguageSkillset("", e.target.value);
            }}
            >
              <option selected disabled value="">
                Choose language
              </option>
              {languagedropdown.length > 0 ? (
                    languagedropdown.map((item, id) => {
                      return (
                        <option id={item.languageId} value={item.languageId}>
                          {item.languageDesc}
                        </option>
                      );
                    })
                  ) : (
                    <option>No Language</option>
                  )}
            </select>
          </div>
        </div>
        <select
          className="form-select form-select-sm mt-4"
          name="availableAgent"
        onChange={(e) => setAgentTransferId(e.target)}
        >
          <option value="" selected disabled>
            Available Agent
          </option>

          {agentbasedonfilter.map((item) => {
                return (
                  <option id={item.id} value={item.id}>
                    {item.username}
                  </option>
                );
              })}

          {/* agentbasedonfilter */}
        </select>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '0px' }}>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary"
         onClick={transferAgentSubmit}
        >
          {checkWhichCall}
          Transfer
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


export default connect(mapStateToProps, {
  setchatdata,setchatid,setConferenceNotificationVal,setConferenceNotification
})(Transferagentmodel);