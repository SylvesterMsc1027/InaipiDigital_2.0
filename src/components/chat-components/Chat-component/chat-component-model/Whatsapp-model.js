import React, { useState } from "react";
import "./Model-Style/modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BaseUrl } from '../../../../container/BaseUrl/BaseUrl'
import axios from "axios";
import {errorhandelApi} from '../../../../ApiCall/ErrorHandelApi'
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { setchatdata, setchatid } from "../../../../redux/actions/actions";

const mapStateToProps = (state) => {
  // console.log('state@@@@@@', state.data)
  return {
    chatid: state.data.chatid,
    chat: state.data.chat,
  };
};

const WhatsappModal = ({ show, close, chatid, chat }) => {
  console.log('Chat Id ', chatid)
  console.log('Chat  ', chat)
  const [phonenumber, setPhonenumber] = useState();


  const handleTransferWhatsapp = async () => {
    let old_agent_id = JSON.parse(localStorage.getItem("tokenAgent"));
    if (chat.is_customer_disconnected) {
      alert('chat is disconnect')
      toast.error("Customer is disconnected");
    } else {
      alert('hiii inside else')
      const access_token = localStorage.getItem("access_token");
      try {
        let dataToPass = {
          chat_session_id: chatid,
          phonenumber: phonenumber,
        };

        const data = await axios.post(
          BaseUrl + "/users/transfertoWhatsapp",
          dataToPass,
          {
            headers: {
              Authorization: "Bearer " + access_token,
              "Content-Type": "application/json",
              tenantId: localStorage.getItem('TenantId'),
            },
          }
        );
        // if (confirm("Chat Transferred success")) {
        let message_to_pass;
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

          toast.success("Chat Transferred to whatsapp sucessfully");
          window.location.reload();
        } else {
          toast.error("Enter a Valid Number");
          window.location.reload();
        }
      } catch (error) {
        errorhandelApi(error, "/users/transfertoWhatsapp")
        console.log(error);
      }
    }
  };



  return (
    <>
      <Modal show={show} size="md" onHide={close} >
        <Modal.Header style={{ backgroundColor: '#0b3363', color: '#fff' }}>
          <Modal.Title style={{
            fontSize: 15,
            margin: "6px 0 0 0",
            textTransform: "capitalize",
          }}>Transfer WhatsApp</Modal.Title>
          <AiOutlineCloseCircle onClick={close} style={{cursor:'pointer'}}/>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            placeholder="Enter your phone number"
            onChange={(e) => setPhonenumber(e.target.value)}
          ></input>
        </Modal.Body>
        <div className="container w-100">
          <Button
            variant="primary"
            onClick={() => { handleTransferWhatsapp() }}
            size="sm"
            className="mb-2 float-end"
          >
            Transfer
          </Button>
        </div>
      </Modal>



    </>
  );
};

export default connect(mapStateToProps, {
  setchatdata, setchatid
})(WhatsappModal);
