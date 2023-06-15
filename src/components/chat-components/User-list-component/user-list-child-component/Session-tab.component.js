import React, { useEffect, useState } from "react";
import moment from "moment";
import { Card } from "react-bootstrap";
import { RiErrorWarningLine } from "react-icons/ri";
import { setselectedemail } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../../../container/BaseUrl/BaseUrl";
import { BiTransferAlt } from "react-icons/bi";
import { MdOutlineCallMerge } from "react-icons/md";

const mapStateToProps = (state) => {
  return {
    chat: state.data.chat,
    selectedemail: state.data.selectedemail,
  };
};

const Sessiontab = (props) => {
  const [userchathistory, setUserchathistory] = useState([]);

  const getChatHistoryDetails = async () => {
    console.log("sessionId>>>>", props.chat.chat_session_id);
    try {
      const access_token = localStorage.getItem("access_token");
      let session_id = props.chat.chat_session_id;
      const tenantId = localStorage.getItem("TenantId");
      // console.log("session_id<>>>>>>>>>>>>", session_id);
      let data = {
        session_id: session_id,
      };
      const sessions = await axios.post(
        BaseUrl + "/users/listchatHistory",
        data,
        {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
            tenantId: tenantId,
          },
        }
      );

      if (sessions.data.status) {
        // console.log("data new", sessions.data.data);
        setUserchathistory(sessions.data.data);
      } else {
        setUserchathistory([]);
      }
    } catch (error) {
      // errorHandel(error, "/users/listchatHistory")
      console.log("error@@@", error);

      // setSessionexpiredshow(true)
    }
  };

  useEffect(() => {
    getChatHistoryDetails();
  }, [localStorage.getItem('client')]);

  return (
    <>
      <div
        className={props.SessionHistorytab}
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <div className="m-2 file-main">
          <div className="chat-r-file">
            <div className="tab_content_userinfo">
              {userchathistory.length > 0 ? (
                userchathistory.map((item) => (
                  <Card
                    key={item.id}
                    style={{
                      width: "90%",
                      height: "4rem",
                      marginLeft: "20px",
                    }}
                    className="mt-3 pl-3 shadow"
                  >
                    <div
                      className="text-center d-flex mt-3 "
                      style={{ overflowY: "auto" }}
                    >
                      {item.type == "Transfer" ? (
                        <p>
                          <BiTransferAlt size={25} />
                        </p>
                      ) : (
                        <p>
                          <MdOutlineCallMerge size={25} />
                        </p>
                      )}
                      {item.type == "Transfer" ? (
                        <p
                          style={{
                            fontWeight: "bold",
                            paddingLeft: 10,
                            fontSize: 12,
                            fontFamily: "poppins",
                          }}
                        >
                          Chat Transfered From {item.agent} to{" "}
                          {item.destinationAgent}
                        </p>
                      ) : (
                        <p
                          style={{
                            fontWeight: "bold",
                            paddingLeft: 10,
                            fontSize: 12,
                            fontFamily: "poppins",
                          }}
                        >
                          {item.agent} conferenced with {item.destinationAgent}
                        </p>
                      )}
                      <span
                        style={{
                          fontSize: 10,
                          color: "#000",
                          fontWeight: "400",
                          position: "absolute",
                          top: 31,
                          left: "50px",
                          fontFamily: "poppins",
                        }}
                      >
                        {moment(item.time).format("LLL")}
                      </span>
                    </div>
                  </Card>
                ))
              ) : (
                <div>
                  <div
                    className="text-muted d-flex"
                    style={{
                      flexDirection: "column",
                      marginTop: "15%",
                    }}
                  >
                    <span className="mx-auto">
                      <RiErrorWarningLine size={30} />
                    </span>
                    <span className="mx-auto">
                      <h6
                        className="text-muted mt-2"
                        style={{ fontFamily: "poppins" }}
                      >
                        No Session History Found
                      </h6>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, {
  setselectedemail,
})(Sessiontab);
