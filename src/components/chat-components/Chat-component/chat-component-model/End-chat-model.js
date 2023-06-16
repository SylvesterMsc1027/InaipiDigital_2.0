import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { setchatid, setchatdata } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../../../container/BaseUrl/BaseUrl";

const mapStateToProps = (state) => {
  return {
    chatid: state.data.chatid,
    chat: state.data.chat,
  };
};

const Endchatmodel = ({ show, close, chatid, chat }) => {
  const [reasonerror, setreasonerror] = useState(false);
  const [commentserror, setcommentserror] = useState(false);
  const [comments, setComments] = useState("");
  const [reason, setReason] = useState("");

  const endChat = () => {
    if (reason === "") {
      setreasonerror(true);
      setcommentserror(false);
    } else if (comments === "") {
      setreasonerror(false);
      setcommentserror(true);
    } else {
      window.location.reload(true);
      let userId = JSON.parse(localStorage.getItem("tokenAgent"));
      let agentId = userId.id;
      let data = {
        chat_session_id: chat.chat_session_id,
        chatendby: "Agent",
        reason: reason,
        comment: comments,
        agent_id: agentId,
      };
      axios
        .post(BaseUrl + "/message/endchat", data, {
          headers: {
            tenantId: localStorage.getItem("TenantId"),
          },
        })
        .then((res) => {
          localStorage.removeItem('client')
          console.log("chat ended", res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Modal show={show} size="md" onHide={close}>
      <Modal.Header

        style={{ backgroundColor: "#0b3363", color: "#fff" }}
      >
        <Modal.Title
          style={{
            fontSize: 15,
            margin: "6px 0 0 0",
            textTransform: "capitalize",
          }}
        >
          End Chat
        </Modal.Title>
        <AiOutlineCloseCircle onClick={close} style={{cursor:'pointer'}}/>
      </Modal.Header>
      <Modal.Body>
        <div className="form">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setReason(e.target.value)}
          >
            <option selected>Select reason</option>
            <option value="Disconnected">Disconnected</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Technical Issue">Technical Issue</option>
          </select>
          {reasonerror ? (
            <span className="text-danger">Choose a reason*</span>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <div className="form-floating">
            <input
              className="form-control"
              onChange={(e) => setComments(e.target.value)}
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              // onKeyPress={(event) => { handleKeyPress(chatid, event) }}
              style={{ height: "100px" }}
            ></input>
            <label for="floatingTextarea2">Comments</label>
            {commentserror ? (
              <span className="text-danger">Fill the required field *</span>
            ) : (
              ""
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "0px" }}>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={endChat}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, {
  setchatdata,
  setchatid,
})(Endchatmodel);
