import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

const InternalAgentList = (props) => {
  const { val, index, onclickhandlechangeinternalContact, chatid, agentId } = props;

  return (
    <>
      <div
        className={
          chatid === val.chat_session_id
            ? "chat-contact d-flex p-1 justify-content-evenly align-items-center border-bottom chat-active"
            : "chat-contact d-flex p-1 justify-content-evenly align-items-center border-bottom"
        }
        onClick={() => {
          onclickhandlechangeinternalContact(val, index);
        }}
        style={{ borderRadius: "10px" }}
      >
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex me-1">
            <div className="col-2 photo me-2 position-relative"></div>
            <div className="chat-content-main d-flex">
              <div className="chat-details me-1">
                <div className="d-flex align-items-center">
                  <div className="name d-inline-block text-truncate me-1">
                    {val.reciverDetails[0]._id != agentId
                      ? val.reciverDetails[0].username
                      : val.senderDetails[0].username}
                  </div>
                  <div
                    className={`${
                      val.reciverDetails[0]._id != agentId ?
                          val.reciverDetails[0].agent_status == "Available"
                          ? "online"
                          : val.reciverDetails[0].agent_status == "Connected"
                          ? "offline"
                          : val.reciverDetails[0].agent_status == "Not Available"
                          ? 'discont':
                          ''
                        : val.senderDetails[0].agent_status == "Available"
                        ? "online"
                        : val.senderDetails[0].agent_status == "Connected"
                        ? "offline":val.senderDetails[0].agent_status == "Not Available"
                        ? 'discont':
                        ''
                    }`}
                  ></div>
                </div>
                <p className="d-inline-block text-truncate mb-0">
                  {val.lastmessage}
                </p>
                {val.unreadcount != 0 && (
                  <Badge variant="danger" className="position-relative " pill>
                    {val.unreadcount}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="chat-time d-flex justify-content-start flex-column align-items-end">
            <p className="mb-0">{val.lastmessagetime}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternalAgentList;
