import React from "react";

const NonActiveAgent = (props) => {
    const { client,createInternalChat,setInternalspinner } = props;
  return (
    <>
      <div
        className="chat-contact d-flex p-2 justify-content-evenly align-items-center border-bottom"
        onClick={() => {
          setInternalspinner(true);
          setTimeout(() => {
            createInternalChat(client.user_id, client.id);
          }, 2000);
        }}
        style={{ borderRadius: "10px" }}
      >
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex me-1">
            <div
              className="photo  me-2 position-relative"
              style={{ width: "35px" }}
            ></div>

            <div className="chat-content-main d-flex">
              <div className="chat-details me-1">
                <div className="d-flex align-items-center">
                  <div className="name d-inline-block text-truncate me-1">
                    {client ? client.username : ""}
                  </div>
                  <div
                    className={`${
                      client.agent_status == "Available"
                        ? "online"
                        : client.agent_status == "Not Available"
                        ? "offline"
                        : "busy"
                    }`}
                  ></div>
                </div>
                <p className="d-inline-block text-truncate mb-0"></p>
              </div>
            </div>
          </div>

          <div className="chat-time d-flex justify-content-start flex-column align-items-end"></div>
        </div>
      </div>
    </>
  );
};

export default NonActiveAgent;
