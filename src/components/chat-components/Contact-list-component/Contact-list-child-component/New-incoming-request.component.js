import React from "react";
import chatIcon from "../../../../assets/assets/images/chat-icon.png";
import chatIconWhatsapp from "../../../../assets/assets/images/whatsapp.png";
import chatIconfacebook from "../../../../assets/assets/images/facebook.png";
import chatIcontwitter from "../../../../assets/assets/images/twitter.png";
import chatIconteams from "../../../../assets/assets/images/teams.png";

const NewIncomingRequest = (props) => {
  const { client, index, visible,currentSelected, acceptClient, rejectchat } = props;
  return (
    <>
      <div className="incomecall_details  p-3">
        <div className="container ">
          <div className="row">
            <div className="col-5 d-flex justify-content-center align-items-center">
              <div className="income-call-icon  d-flex justify-content-center align-items-center">
                <div className="call-animation d-flex justify-content-center align-items-center">
                  <img
                    src={`${
                      client.channel == "webchat"
                        ? chatIcon
                        : client.channel == "from_whatsapp"
                        ? chatIconWhatsapp
                        : client.channel == "from_facebook"
                        ? chatIconfacebook
                        : client.channel == "from_twitter"
                        ? chatIcontwitter
                        : chatIconteams
                    }`}
                    className={`chat_avaya_img ${
                      index === currentSelected ? "iconActive" : ""
                    }`}
                    style={{
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-7">
              <div className="incomeing-details mb-2">
                <small className="text-break">
                  <b>New Chat Request</b>
                </small>
                <p className="text-break font-weight-bold text-light">
                  {client.unique_id ? client.unique_id.username : ""}
                </p>

                {client.transferred ? (
                  <span
                    className="position-relative"
                    style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Transfered
                  </span>
                ) : (
                  <span></span>
                )}
              </div>

              {visible && (
                <div
                  className="btn-group w-100"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-success "
                    id="accept_client_chat"
                    onClick={() => acceptClient(client, index)}
                    style={{margin: '8px',
                      borderRadius: '3.6px',
                      padding: '2px 19px 4.6px 19.6px'}}
                  >
                    <i className="fas fa fa-check"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    id="reject_client_chat"
                    onClick={() =>
                      rejectchat(
                        client.chat_session_id,
                        client.agent,
                        client.id,
                        client.skillset,
                        client.language,
                        client.phonenumber,
                        client.channel
                      )
                    }
                    style={{margin: '8px',
                    borderRadius: '3.6px',
                    padding: '2px 21px 4.6px 21px'}}
                  >
                    <i className="fas fa fa-close"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewIncomingRequest;
