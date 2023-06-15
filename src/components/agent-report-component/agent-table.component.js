import React from "react";
import moment from "moment";

const agenttable = (props) => {
  return (
    <>
      <table className="table table-sm  table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Agent Name</th>
            <th scope="col">Break Time</th>
            <th scope="col">Active Time</th>
            <th scope="col">Completed</th>
            <th scope="col">Active Chat</th>
            <th scope="col">Date</th>
            <th scope="col">Transfered Out</th>
            <th scope="col">Transfered In</th>
          </tr>
        </thead>
        <tbody>
          {props.agentdata.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  {item.agent_id == null ||
                  item.agent_id == undefined ||
                  item.agent_id == ""
                    ? "--"
                    : item.agent_id.username}
                </td>
                <td>
                  {moment(item.total_break_time, "seconds").format("hh:mm:ss")}
                </td>
                <td>
                  {" "}
                  {moment(item.total_active_time, "seconds").format("hh:mm:ss")}
                </td>
                <td>{item.total_completed}</td>
                <td>
                  {item.total_active_chat_count == null ||
                  item.total_active_chat_count == undefined ||
                  item.total_active_chat_count == "" ||
                  item.total_active_chat_count == 0
                    ? 0
                    : item.total_active_chat_count}
                </td>
                <td>{moment(item.created_at).format("ll")}</td>
                <td>
                  {item.total_transfered_out == null ||
                  item.total_transfered_out == undefined ||
                  item.total_transfered_out == "" ||
                  item.total_transfered_out == 0
                    ? 0
                    : item.total_transfered_out}
                </td>
                <td>
                  {item.total_transfered_in == null ||
                  item.total_transfered_in == undefined ||
                  item.total_transfered_in == "" ||
                  item.total_transfered_in == 0
                    ? 0
                    : item.total_transfered_in}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default agenttable;
