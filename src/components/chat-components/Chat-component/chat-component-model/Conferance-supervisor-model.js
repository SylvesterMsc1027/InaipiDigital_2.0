import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import { BaseUrl } from '../../../../container/BaseUrl/BaseUrl';
import axios from 'axios';

const Conferancesupervisormodel = ({ show, close }) => {


  const [availableAgent, setAvailableAgent] = useState([])
  const [agentTransferId, setAgentTransferId] = useState("agent");
  const [showTransferMod, setShowTransferMod] = useState(false);
  const [checkWhichCall, setCheckWhichCall] = useState("");
  const [showfiltersupervisor, setShowfiltersupervisor] = useState(false);

  const transferAgent = (val) => {
    setCheckWhichCall(val);
    setShowTransferMod(true);
  };

  const handleTransferClose = () => {
    setAgentTransferId("agent");
    setShowTransferMod(false);
  };

  const handleTransfersupervisorClose = () => setShowfiltersupervisor(false);
  const handleTransfersupervisorOpen = (val) => {
    setShowfiltersupervisor(true);
    setCheckWhichCall(val);
  };

  useEffect(() => {
    getAvailableAgents()
  }, [])
  


  const getAvailableAgents = async () => {
    const access_token = localStorage.getItem("access_token");

    try {
      let userId = JSON.parse(localStorage.getItem("tokenAgent"));
      let passUserId = userId.user_id;
      const data = await axios.post(
        BaseUrl + "/users/listSupervisor",
        {},
        {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
            tenantId:localStorage.getItem('TenantId') ,
          },
        }
      );
      if (data.data.status) {
        // props.setavailagent(data.data.data);
        setAvailableAgent(data.data.data)
      }
    } catch (error) {
      // errorHandel(error, "/users/listSupervisor")
      console.log(error);
    }
  };

  
  return (
    <Modal  show={show} size='md' onHide={close} >
      <Modal.Header  style={{ backgroundColor: '#0b3363', color: '#fff' }}>
        <Modal.Title style={{
          fontSize: 15,
          margin: "6px 0 0 0",
          textTransform: "capitalize",
        }}>Conferance To Supervisor</Modal.Title>
        <AiOutlineCloseCircle onClick={close} style={{cursor:'pointer'}}/>
      </Modal.Header>
      <Modal.Body>
        <select
          className="form-select form-select-sm"
          name="availableAgent"
        onChange={(e) => setAgentTransferId(e.target)}
        >
          <option value="agent" selected>
            Available Supervisor
          </option>
          {availableAgent.map((agents) => {
                return (
                  <option value={agents.id}>
                    {agents.username ? agents.username : agents.firstName}
                  </option>
                );
              })}
        </select>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '0px' }}>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={getAvailableAgents}
        >
            {checkWhichCall}
          Conferance
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Conferancesupervisormodel