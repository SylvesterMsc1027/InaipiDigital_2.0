import React, { useState } from "react";

import { connect } from "react-redux";
import {
  setcontactlist,
} from "../../../redux/actions/actions";

// Component
import UserDetails from "./User-Details.component";
import Userlisttab from "./User-list-tab.component";
import Interactiontab from "./user-list-child-component/Interaction-tab.component";
import Sessiontab from "./user-list-child-component/Session-tab.component";
import SmartXTab from './user-list-child-component/SmartX-tab.component';
import Tickethistory from './user-list-child-component/Ticket-history.component';
import FilesTab from "./user-list-child-component/Files-tab.component";



const mapStateToProps = (state) => {
  const { data } = state;
  return {
    contactList: data.contactList,
  };
};
const Userlist = (props) => {
  const [InteractionHistory, setInteractionHistory] =
    useState("nav-link active");
  const [InteractionHistorytab, setInteractionHistorytab] = useState(
    "tab-pane fade show active"
  );
  const [SessionHistory, setSessionHistory] = useState("nav-link");
  const [SessionHistorytab, setSessionHistorytab] =
    useState("tab-pane fade show");
  const [SmartX, setSmartX] = useState("nav-link");
  const [SmartXtab, setSmartXtab] = useState("tab-pane fade show");
  const [Files, setFiles] = useState("nav-link");
  const [Filestab, setFilestab] = useState("tab-pane fade show");
  const [Ticket, setTicket] = useState("nav-link");
  const [TicketTab, setTicketTab] = useState("tab-pane fade show");

  const tabonchangehandler = (value) => {
    console.log('tab value',value)
    switch (value) {
      case "InteractionHistory":
        setInteractionHistory("nav-link active");
        setInteractionHistorytab("tab-pane fade show active");
        setSessionHistory("nav-link");
        setSessionHistorytab("tab-pane fade");
        setSmartX("nav-link");
        setSmartXtab("tab-pane fade");
        setFiles("nav-link");
        setFilestab("tab-pane fade");
        setTicket("nav-link");
        setTicketTab("tab-pane fade");
        break;
      case "SessionHistory":
        setInteractionHistory("nav-link ");
        setInteractionHistorytab("tab-pane fade");
        setSessionHistory("nav-link active");
        setSessionHistorytab("tab-pane fade show active");
        setSmartX("nav-link");
        setSmartXtab("tab-pane fade");
        setFiles("nav-link");
        setFilestab("tab-pane fade");
        setTicket("nav-link");
        setTicketTab("tab-pane fade");

        break;
      case "SmartX":
        setInteractionHistory("nav-link ");
        setInteractionHistorytab("tab-pane fade");
        setSessionHistory("nav-link");
        setSessionHistorytab("tab-pane fade");
        setSmartX("nav-link active");
        setSmartXtab("tab-pane fade show active");
        setFiles("nav-link");
        setFilestab("tab-pane fade");
        setTicket("nav-link");
        setTicketTab("tab-pane fade");
        break;
      case "Ticket":
        setInteractionHistory("nav-link ");
        setInteractionHistorytab("tab-pane fade");
        setSessionHistory("nav-link");
        setSessionHistorytab("tab-pane fade");
        setSmartX("nav-link ");
        setSmartXtab("tab-pane fade show ");
        setFiles("nav-link");
        setFilestab("tab-pane fade");
        setTicket("nav-link active");
        setTicketTab("tab-pane fade show active");

        break;
      default:
        setInteractionHistory("nav-link ");
        setInteractionHistorytab("tab-pane fade show ");
        setSessionHistory("nav-link");
        setSessionHistorytab("tab-pane fade show ");
        setSmartX("nav-link");
        setSmartXtab("tab-pane fade");
        setFiles("nav-link active");
        setFilestab("tab-pane fade show active");
        setTicket("nav-link");
        setTicketTab("tab-pane fade");
    }
  };



  return (
    <>
      {props.contactList.length > 0 ?<div className="col-md-5  px-0">
        <div className="details-user-chat borde r-bottom p-0">
          <div className="chat-profile d-flex justify-content-between align-items-center p-2">
            <UserDetails />
          </div>
        </div>

        <div className="chat-tabs">
          <ul
            className="nav nav-pills border-bottom border-top p-2"
            id="pills-tab"
            role="tablist"
          >
            <Userlisttab
              tabsproperties={InteractionHistory}
              tabonchangehandler={tabonchangehandler}
              value={"InteractionHistory"}
            />
            <Userlisttab
              tabsproperties={SessionHistory}
              tabonchangehandler={tabonchangehandler}
              value={"SessionHistory"}
            />
            <Userlisttab
              tabsproperties={SmartX}
              tabonchangehandler={tabonchangehandler}
              value={"SmartX"}
            />
            <Userlisttab
              tabsproperties={Files}
              tabonchangehandler={tabonchangehandler}
              value={"Files"}
            />
            <Userlisttab
              tabsproperties={Ticket}
              tabonchangehandler={tabonchangehandler}
              value={"Ticket"}
            />
          </ul>

          <div className="tab-content" id="pills-tabContent">
            <Interactiontab InteractionHistorytab={InteractionHistorytab} />
            <Sessiontab SessionHistorytab={SessionHistorytab} />
            <SmartXTab SmartXTab={SmartXtab}/>
            <FilesTab FilesTab={Filestab}/>
            <Tickethistory TicketTab={TicketTab}/>
          </div>
        </div>
      </div>
      :
      <></>
      }
    </>
  );
};


export default connect(mapStateToProps, {
  setcontactlist,
})(Userlist);