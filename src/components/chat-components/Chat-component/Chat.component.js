import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Chat-Style/chat.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import { connect } from "react-redux";
import {
  setselectedusername,
  setchatdata,
  setExternalChatData,
  setcontactlist,
} from "../../../redux/actions/actions";

// Component
import ChatMenu from "./Chat-Menu.component";
import Message from "./Message.component";
import Endchatmodel from "./chat-component-model/End-chat-model";

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    selectedusername: data.selectedusername,
    chatdata: data.chatdata,
    externalChatData: data.externalChatData,
    contactList: data.contactList,
  };
};
const ChatComponent = (props) => {
  const { handleTyping, handleSendMsg, data } = props;
  // Tooltip
  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  const [outsideclickclosecard, setOutsideclickclosecard] = useState(false);
  const [endchatmodal, setendchatmodal] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const toggleCard = () => {
    setShowCard(!showCard);
  };
  const closeuserNotification = () => {
    setOutsideclickclosecard(false);
  };
  const showallbuttondiv = () => {
    setOutsideclickclosecard(true);
    console.log("click");
  };

  const EndChat = () => {
    setendchatmodal(true);
  };

  return (
    <>
      {localStorage.getItem("ChatType") == "External" ? (
        props.contactList.length > 0 ? (
          <div className="col-md-4 pt-3 px-0 border-end">
            <div className="border-bottom p-0">
              <div className="chat-profile d-flex justify-content-between align-items-center p-2">
                <div>
                  <div className="d-flex me-1">
                    <div
                      className="col-2 photo me-2 position-relative"
                      style={{ width: "40px" }}
                    >
                      {props.externalChatData.is_customer_disconnected ==
                        true &&
                      localStorage.getItem("ChatType") == "External" ? (
                        <div
                          className="online2-bg online2 d-flex justify-content-center align-items-center"
                          style={{ backgroundColor: "red" }}
                        ></div>
                      ) : (
                        <div className="online2-bg online2 d-flex justify-content-center align-items-center"></div>
                      )}
                    </div>
                    <div className="chat-user-main d-flex">
                      <div className="chat-details me-1">
                        <div className="d-flex align-items-center">
                          <div className="name d-inline-block text-truncate me-1">
                            {props.selectedusername}
                          </div>
                        </div>
                        <p className="d-inline-block text-truncate mb-0">
                          {props.externalChatData.is_customer_disconnected ==
                          true
                            ? "Offline"
                            : "Online"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {/* Menu Dot */}
                  {localStorage.getItem("ChatType") == "External" ? (
                    props.externalChatData.is_customer_disconnected == false ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-outline-secondary border-0 btn-sm"
                          data-tippy-content=" Screen Share"
                          onClick={() => {
                            toggleCard();
                          }}
                        >
                          <BsThreeDotsVertical
                            className="icon_top-btn_small"
                            size={20}
                          />
                        </button>
                      </>
                    ) : (
                      <BootstrapTooltip
                        title="End Chat"
                        arrow
                        placement="bottom"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary border-0 btn-sm"
                          data-tippy-content=" Screen Share"
                          onClick={() => {
                            EndChat();
                          }}
                        >
                          <AiOutlineCloseCircle
                            className="icon_top-btn_small"
                            size={20}
                          />
                        </button>
                      </BootstrapTooltip>
                    )
                  ) : (
                    <></>
                  )}

                  {showCard && <ChatMenu toggleCard={toggleCard} />}
                </div>
              </div>
            </div>

            <Message
              handleTyping={handleTyping}
              handleSendMsg={handleSendMsg}
              data={data}
            />
          </div>
        ) : (
          <></>
        )
      ) : (
        <div className={"col-md-9 pt-3 px-0 border-end"}>
          <div className="border-bottom p-0">
            <div className="chat-profile d-flex justify-content-between align-items-center p-2">
              <div>
                <div className="d-flex me-1">
                  <div
                    className="col-2 photo me-2 position-relative"
                    style={{ width: "40px" }}
                  >
                    {props.externalChatData.is_customer_disconnected == true &&
                    localStorage.getItem("ChatType") == "External" ? (
                      <div
                        className="online2-bg online2 d-flex justify-content-center align-items-center"
                        style={{ backgroundColor: "red" }}
                      ></div>
                    ) : (
                      <div className="online2-bg online2 d-flex justify-content-center align-items-center"></div>
                    )}
                  </div>
                  <div className="chat-user-main d-flex">
                    <div className="chat-details me-1">
                      <div className="d-flex align-items-center">
                        <div className="name d-inline-block text-truncate me-1">
                          {props.selectedusername}
                        </div>
                      </div>
                      <p className="d-inline-block text-truncate mb-0">
                        {props.externalChatData.is_customer_disconnected == true
                          ? "Offline"
                          : "Online"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* Menu Dot */}
                {localStorage.getItem("ChatType") == "External" ? (
                  props.externalChatData.is_customer_disconnected == false ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-0 btn-sm"
                        data-tippy-content=" Screen Share"
                        onClick={() => {
                          toggleCard();
                        }}
                      >
                        <BsThreeDotsVertical
                          className="icon_top-btn_small"
                          size={20}
                        />
                      </button>
                    </>
                  ) : (
                    <BootstrapTooltip title="End Chat" arrow placement="bottom">
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-0 btn-sm"
                        data-tippy-content=" Screen Share"
                        onClick={() => {
                          EndChat();
                        }}
                      >
                        <AiOutlineCloseCircle
                          className="icon_top-btn_small"
                          size={20}
                        />
                      </button>
                    </BootstrapTooltip>
                  )
                ) : (
                  <></>
                )}

                {showCard && <ChatMenu toggleCard={toggleCard} />}
              </div>
            </div>
          </div>

          <Message
            handleTyping={handleTyping}
            handleSendMsg={handleSendMsg}
            data={data}
          />
        </div>
      )}

      <Endchatmodel show={endchatmodal} close={() => setendchatmodal(false)} />
    </>
  );
};

export default connect(mapStateToProps, {
  setcontactlist,
  setselectedusername,
  setchatdata,
  setExternalChatData,
})(ChatComponent);
