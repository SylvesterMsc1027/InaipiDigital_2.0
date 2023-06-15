import React, { useState } from "react";
import { BiTransferAlt, BiTransfer, BiGitMerge } from "react-icons/bi";
import { MdOutlineCallMerge } from "react-icons/md";
import { BsWhatsapp, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { connect } from "react-redux";
import { setExternalChatData } from "../../../redux/actions/actions";

// Component
import WhatsappModal from "./chat-component-model/Whatsapp-model";
import Transferagentmodel from "./chat-component-model/Transfer-agent-model";
import Transfersupervisormodel from "./chat-component-model/Transfer-supervisor-model";
import Conferanceagentmodel from "./chat-component-model/Conferance-agent-model";
import Conferancesupervisormodel from "./chat-component-model/Conferance-supervisor-model";
import Endchatmodel from "./chat-component-model/End-chat-model";

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    externalChatData: data.externalChatData,
  };
};
const ChatMenu = (props) => {
  const { externalChatData,toggleCard } = props;
  const [whatsappmodalopen, setwhatsappmodalopen] = useState(false);
  const [transferagentmodal, settransferagentmodal] = useState(false);
  const [transfersupervisormodal, settransfersupervisormodal] = useState(false);
  const [conferenceagentmodal, setconferenceagentmodal] = useState(false);
  const [conferencesupervisormodal, setconferencesupervisormodal] =
    useState(false);
  const [endchatmodal, setendchatmodal] = useState(false);

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

  const transferToWhatsapp = () => {
    setwhatsappmodalopen(true);
  };
  const transferToAgent = () => {
    settransferagentmodal(true);
  };
  const transferToSupervisor = () => {
    settransfersupervisormodal(true);
  };
  const ConfrenceToAgent = () => {
    setconferenceagentmodal(true);
  };
  const ConfrenceToSupervisor = () => {
    setconferencesupervisormodal(true);
  };
  const EndChat = () => {
    setendchatmodal(true);
  };
  //  ?
  return (
    <>
      {localStorage.getItem("ChatType") == "External" ? (
        <div className="menucard">
          <BootstrapTooltip
            title="Transfer to Whatsapp"
            arrow
            placement="bottom"
          >
            <button
              type="button"
              className="btn btn-outline-secondary border-0 btn-sm"
              data-tippy-content=" Screen Share"
              onClick={() => {
                transferToWhatsapp();
              }}
            >
              <BsWhatsapp className="icon_top-btn_small" size={20} />
            </button>
          </BootstrapTooltip>

          <BootstrapTooltip title="Transfer to Agent" arrow placement="bottom">
            <button
              type="button"
              className="btn btn-outline-secondary border-0 btn-sm"
              data-tippy-content=" Screen Share"
              onClick={() => {
                transferToAgent("transfer");
              }}
            >
              <BiTransfer className="icon_top-btn_small" size={20} />
            </button>
          </BootstrapTooltip>

          <BootstrapTooltip
            title="Transfer to Supervisor"
            arrow
            placement="bottom"
          >
            <button
              type="button"
              className="btn btn-outline-secondary border-0 btn-sm"
              data-tippy-content=" Screen Share"
              onClick={() => {
                transferToSupervisor("transfer");
              }}
            >
              <BiTransferAlt className="icon_top-btn_small" size={20} />
            </button>
          </BootstrapTooltip>

          <BootstrapTooltip title="Confrence to Agent" arrow placement="bottom">
            <button
              type="button"
              className="btn btn-outline-secondary border-0 btn-sm"
              data-tippy-content=" Screen Share"
              onClick={() => {
                ConfrenceToAgent("conference");
              }}
            >
              <BiGitMerge className="icon_top-btn_small" size={20} />
            </button>
          </BootstrapTooltip>

          <BootstrapTooltip
            title="Confrence to Supervisor"
            arrow
            placement="bottom"
          >
            <button
              type="button"
              className="btn btn-outline-secondary border-0 btn-sm"
              data-tippy-content=" Screen Share"
              onClick={() => {
                ConfrenceToSupervisor("conference");
              }}
            >
              <MdOutlineCallMerge className="icon_top-btn_small" size={20} />
            </button>
          </BootstrapTooltip>

          <BootstrapTooltip title="End Chat" arrow placement="bottom">
            <button
              type="button"
              className="btn btn-outline-secondary border-0 btn-sm"
              data-tippy-content=" Screen Share"
              onClick={() => {
                EndChat();
              }}
            >
              <AiOutlineCloseCircle className="icon_top-btn_small" size={20} />
            </button>
          </BootstrapTooltip>
        </div>
      ) : (
        toggleCard()
      )}

      {/* All Modal */}
      <WhatsappModal
        show={whatsappmodalopen}
        close={() => setwhatsappmodalopen(false)}
      />
      <Transferagentmodel
        show={transferagentmodal}
        close={() => settransferagentmodal(false)}
      />
      <Transfersupervisormodel
        show={transfersupervisormodal}
        close={() => settransfersupervisormodal(false)}
      />
      <Conferanceagentmodel
        show={conferenceagentmodal}
        close={() => setconferenceagentmodal(false)}
      />
      <Conferancesupervisormodel
        show={conferencesupervisormodal}
        close={() => setconferencesupervisormodal(false)}
      />
      <Endchatmodel show={endchatmodal} close={() => setendchatmodal(false)} />
    </>
  );
};

export default connect(mapStateToProps, {
  setExternalChatData,
})(ChatMenu);
