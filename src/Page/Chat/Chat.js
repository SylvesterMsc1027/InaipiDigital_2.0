import React from "react";
import "../../assets/chatasset/assets/styles/chat.css";
import "../../assets/chatasset/assets/styles/style.css";

// Component
import Contactlist from "../../components/chat-components/Contact-list-component/Contact-list.component";
import ChatComponent from "../../components/chat-components/Chat-component/Chat.component";
import Userlist from "../../components/chat-components/User-list-component/User-list.component";

const Chat = () => {
  return (
    <>
      <section className="dashboard overflow-hidden">
        <div className="container-fluid">
          <div className="wapper_sub">
            <div className="sub_wapper">
              <div className="container-fluid p-0">
                <div className="row dvh-89">
                  {/* Contact list */}
                  <Contactlist />
                  {/* Chat */}
                  <ChatComponent />
                  {/* User Details */}
                  {localStorage.getItem("ChatType") == "Internal" ? (
                    ""
                  ) : (
                    <Userlist />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
