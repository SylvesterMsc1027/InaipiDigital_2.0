import React from "react";
import { Badge } from "react-bootstrap";
import moment from "moment";

const ExternalContactList = (props) => {
  const { contact, index, onclickhandlechangeexternalContact, chatid } = props;
  return (
    <>
      <div
        className={
          contact != undefined
            ? chatid == contact.chat_session_id
              ? "chat-contact d-flex p-1 justify-content-evenly align-items-center border-bottom chat-active"
              : "chat-contact d-flex p-1 justify-content-evenly align-items-center border-bottom"
            : ""
        }
        onClick={() => {
          onclickhandlechangeexternalContact(contact, index);
        }}
        style={{ borderRadius: "10px" }}
      >


        <div className="d-flex justify-content-between w-100">
          <div className="d-flex me-1">
            <div className="col-2 photo me-2 position-relative">
             
              {/* social media icons */}
              {contact.channel === "webchat" ? (
                <div className="twit-bg chat-social d-flex justify-content-center align-items-center">
                  <i className="fa-brands fa-weixin"></i>
                </div>
              ) : contact.channel === "instagram" ? (
                <div className="inst-bg chat-social d-flex justify-content-center align-items-center">
                  <i className="fa-brands fa-instagram"></i>
                </div>
              ) : contact.channel === "from_whatsapp" ? (
                <div className="what-bg chat-social d-flex justify-content-center align-items-center">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
              ) : contact.channel === "voice" ? (
                <div className="what-bg chat-social d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-phone"></i>
                </div>
              ) : contact.channel === "from_facebook" ? (
                <div className="fb-bg chat-social d-flex justify-content-center align-items-center">
                  <i className="fa-brands fa-facebook-f"></i>
                </div>
              ) : contact.channel === "from_twitter" ? (
                <div className="twit-bg chat-social d-flex justify-content-center align-items-center">
                  <i className="fa-brands fa-twitter"></i>
                </div>
              ) : (
                <div className="what-bg chat-social d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-phone"></i>
                </div>
              )}
            </div>
            <div className="chat-content-main d-flex">
              <div className="chat-details me-1">
                <div className="d-flex align-items-center">
                  {/* User Name */}
                  <div className="name d-inline-block text-truncate me-1">
                    {contact.unique_id.username === ""
                      ? contact.unique_id.phonenumber
                      : contact.unique_id.username}
                  </div>

                  {/* online offline icon */}

                  {contact.is_customer_disconnected === true ? (
                    <div className="discont"></div>
                  ) : (
                    <div className="online"></div>
                  )}
                </div>

                {/* last message */}
                <p className="d-inline-block text-truncate mb-0">
                  {contact.lastmessage}
                </p>

                {/* New Message Icons*/}
                <div className="position-relative top container">
                  {contact.unreadcount != 0 && (
                    <Badge pill style={{ fontSize: 9 }} variant="danger">
                      {contact.unreadcount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Last Seen */}
          <div className="chat-time d-flex justify-content-start flex-column align-items-end">
            <p className="mb-0">
              {moment(contact.lastmessageUpdatedat).fromNow()}
            </p>
            <span className="d-flex " style={{ flexDirection: "column" }}>
              {contact.conference ? (
                <span
                  className="chat_type"
                  style={{
                    fontSize: 7,
                    fontWeight: "bold",
                    color: "#ffffffd1"
                  }}
                >
                  Conference
                </span>
              ) : (
                ""
              )}
              {contact.transferred ? (
                <span
                  className="chat_type"
                  style={{
                    fontSize: 7,
                    fontWeight: "bold",
                    color: "#ffffffd1"
                  }}
                >
                  Transfered
                </span>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExternalContactList;
