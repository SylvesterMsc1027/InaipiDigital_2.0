import React from "react";
import facebook from "../../assets/assets/images/facebook.png";
import whatsapp from "../../assets/assets/images/whatsapp.png";
import webchat from "../../assets/assets/images/chat-icon.png";
import twitter from "../../assets/assets/images/twitter.png";
import teams from "../../assets/assets/images/teams.png";
import voice from "../../assets/assets/images/voice.png";
import moment from "moment";
import { Badge } from "react-bootstrap";

const sessiontable = (props) => {
  return (
    <>
      <table className="table table-sm  table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Channel</th>
            <th scope="col">Status</th>
            <th scope="col">Conference</th>
            <th scope="col">Transfered</th>
            <th scope="col">Skillset</th>
            <th scope="col">Language</th>
            <th scope="col">Agent Name</th>
            <th scope="col">Chat InitiatedAt</th>
            <th scope="col">Chat StartedAt</th>
            <th scope="col">Chat EndedAt</th>
            <th scope="col">Transfered Agent Name</th>
            <th scope="col">Conferance Agent Name</th>
          </tr>
        </thead>
        <tbody>
          {props.sessionreport.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone_number}</td>
                <td>{item.email}</td>
                <td>
                  {item.channel == "webchat" ? (
                    <img className="icons-size" src={webchat} alt="webchat" />
                  ) : item.channel == "from_whatsapp" ? (
                    <img className="icons-size" src={whatsapp} alt="webchat" />
                  ) : item.channel == "from_twitter" ? (
                    <img className="icons-size" src={twitter} alt="webchat" />
                  ) : item.channel == "voice" ? (
                    <img className="icons-size" src={voice} alt="webchat" />
                  ) : item.channel == "from_facebook" ? (
                    (
                      <img
                        className="icons-size"
                        src={facebook}
                        alt="webchat"
                      />
                    ) || item.channel == "from_teams"
                  ) : (
                    <img className="icons-size" src={teams} alt="webchat" />
                  )}
                </td>
                <td>
                  {item.status == "chatEnded" ? (
                    <Badge variant="secondary">Completed</Badge>
                  ) : (
                    <Badge variant="success">Active </Badge>
                  )}
                </td>
                <td>{item.conference == true ? "true" : "false"}</td>
                <td>{item.transferred == true ? "true" : "false"}</td>
                <td>{item.skillset}</td>
                <td>{item.language}</td>
                {/* <td>{item.agent_name[0]?item.agent_name[0]:item.agent_name}</td> */}
                <td>{item.agent_name ? item.agent_name : ""}</td>
                {/* agent_name */}
                <td>{moment(item.chat_arrival_at).format("L hh:mm:ss A")}</td>
                <td>{moment(item.chat_started_at).format("L hh:mm:ss A")}</td>
                <td>
                  {item.chat_ended_at == null ||
                  item.chat_ended_at == undefined ||
                  item.chat_ended_at == ""
                    ? "--"
                    : moment(item.chat_ended_at).format("L hh:mm:ss A")}
                </td>
                <td>
                  {item.transfer_agent_name == null ||
                  item.transfer_agent_name == undefined ||
                  item.transfer_agent_name == ""
                    ? "--"
                    : item.transfer_agent_name[0]}
                </td>
                <td>
                  {item.conference_agent_name == null ||
                  item.conference_agent_name == undefined ||
                  item.conference_agent_name == ""
                    ? "--"
                    : item.conference_agent_name[0]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default sessiontable;
