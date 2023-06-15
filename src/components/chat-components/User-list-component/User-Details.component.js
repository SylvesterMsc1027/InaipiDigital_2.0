import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Button } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { SiMicrosoftteams } from "react-icons/si";

import axios from "axios";
import { BaseUrl } from "../../../container/BaseUrl/BaseUrl";
import { errorhandelApi } from "../../../ApiCall/ErrorHandelApi";
import { connect } from "react-redux";
import {
  setselectedusername,
  setselectedemail,
  setselectedmobile,
  setselectedwhatsapp,
  setselectedfacebook,
  setselectedtwitter,
  setselectedteams,
  setselectedcompany,
  setselectedadress,
  setselectedid,
} from "../../../redux/actions/actions";

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    selectedusername: data.selectedusername,
    selectedemail: data.selectedemail,
    selectedmobile: data.selectedmobile,
    selectedwhatsapp: data.selectedwhatsapp,
    selectedfacebook: data.selectedfacebook,
    selectedtwitter: data.selectedtwitter,
    selectedteams: data.selectedteams,
    selectedcompany: data.selectedcompany,
    selectedaddress: data.selectedaddress,
    selectedid: data.selectedid,
  };
};

const UserDetails = (props) => {
  const [editUserModal, setEditUserModal] = useState(false);
  const [editemail, seteditemail] = useState(props.selectedemail);
  const [editusername, seteditusername] = useState(props.selectedusername);
  const [editmobile, seteditmobile] = useState(props.selectedmobile);
  const [editwhatsapp, seteditwhatsapp] = useState(props.selectedwhatsapp);
  const [editfacebook, seteditfacebook] = useState(props.selectedfacebook);
  const [edittwitter, setedittwitter] = useState(props.selectedtwitter);
  const [editteams, seteditteams] = useState(props.selectedteams);
  const [editcompany, seteditcompany] = useState(props.selectedcompany);
  const [editaddress, seteditaddress] = useState(props.selectedaddress);

  const updateEditvalueModel = () => {
    setEditUserModal(!editUserModal);
  };
  const updateEditvalue = async () => {
    const tokenAgent = JSON.parse(localStorage.getItem("tokenAgent"));
    const agent_ID = tokenAgent.id;
    const access_token = localStorage.getItem("access_token");
    let body = {
      username: editusername,
      email: editemail,
      phonenumber: editmobile,
      whatsappnumber: editwhatsapp,
      facebookId: editfacebook,
      twitterId: edittwitter,
      teamsId: editteams,
      address: editaddress,
      company: editcompany,
      id: props.selectedid,
      agent_id: agent_ID,
    };

    axios
      .post(BaseUrl + "/users/updateClient", body, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          tenantId: localStorage.getItem("TenantId"),
        },
      })
      .then((res) => {
        updateEditvalueModel();
        window.location.reload(true);
      })

      .catch((error) => {
        errorhandelApi(error, "/users/updateClient");
        console.log(error);
      });
  };

  useEffect(()=>{
    seteditemail(props.selectedemail)
    seteditusername(props.selectedusername)
    seteditmobile(props.selectedmobile)
    seteditwhatsapp(props.selectedwhatsapp)
    seteditfacebook(props.selectedfacebook)
    setedittwitter(props.selectedtwitter)
    seteditteams(props.selectedteams)
    seteditcompany(props.selectedcompany)
    seteditaddress(props.selectedaddress)
  },[localStorage.getItem('client')])


  return (
    <>
      <div className="d-flex ">
        <div className="col-2 photo me-2 position-relative">
          <div
            className="twit-bg chat-social d-flex justify-content-center align-items-center"
            onClick={() => {
              updateEditvalueModel();
            }}
            style={{
              background: "#292b2d",
              position: "absolute",
              top: "0",
              right: " 0",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              color: "white",
              fontSize: "9px",
              cursor: "pointer",
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
        </div>

        <div className="details-user-all">
          <div className="name d-inline-block text-truncate">
            {props.selectedusername == ""
              ? ""
              : props.selectedusername}
          </div>

          <div className="row row-cols-2 details-user-sub">
            <div className="col use-cont d-flex">
              <div className="d-flex align-items-start">
                <div>
                  <i className="fa-solid fa-envelope me-2"></i>
                </div>

                <p>
                  {props.selectedemail == ""
                    ? ""
                    : props.selectedemail}
                </p>
              </div>
            </div>
            <div className="col use-cont d-flex">
              <div className="d-flex align-items-start">
                <div>
                  <i className="fa-solid fa-mobile me-2"></i>
                </div>
                <p>
                  {" "}
                  {props.selectedmobile == ""
                    ? ""
                    : props.selectedmobile}
                </p>
              </div>
            </div>
            <div className="col use-cont d-flex">
              <div className="d-flex align-items-start">
                <div>
                  <i className="fa-brands fa-whatsapp me-2"></i>
                </div>
                <p>
                  {" "}
                  {props.selectedwhatsapp == ""
                    ? ""
                    : props.selectedwhatsapp}
                </p>
              </div>
            </div>
            <div className="col use-cont d-flex">
              <div className="d-flex align-items-start">
                <div>
                  <i className="fa-brands fa-facebook-f"></i>
                </div>
                <p>
                  {" "}
                  {props.selectedfacebook == ""
                    ? ""
                    : props.selectedfacebook}
                </p>
              </div>
            </div>
            <div className="col use-cont d-flex">
              <div className="d-flex align-items-start">
                <div>
                  <SiMicrosoftteams style={{color:'gray'}} className="me-1"/>
                </div>
                <p>
                  {" "}
                  {props.selectedteams == ""
                    ? ""
                    : props.selectedteams}
                </p>
              </div>
            </div>
            <div className="col use-cont d-flex">
              <div className="d-flex align-items-start">
                <div>
                  <i className="fa-brands fa-twitter"></i>
                </div>
                <p>
                  {" "}
                  {props.selectedtwitter == ""
                    ? ""
                    : props.selectedtwitter}
                </p>
              </div>
            </div>
            <div className="col use-cont d-flex">
              <div className="d-flex align-items-start">
                <div>
                  <i className="fa-solid fa-building"></i>
                </div>
                <p>
                  {props.selectedcompany == ""
                    ? ""
                    : props.selectedcompany}
                </p>
              </div>
            </div>
            <div className="col use-cont d-flex">
              <div className="d-flex align-items-start">
                <div>
                  <i className="fa-solid fa-location-dot me-2"></i>
                </div>
                <p>
                  {props.selectedaddress == ""
                    ?'' 
                    : props.selectedaddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editUserModal && (
        <Draggable handle=".handle">
          <div
            className="card"
            style={{
              position: "absolute",
              width: "50%",
              zIndex: "999",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "2px 2px 20px grey",
              marginRight: "200px",
              marginTop: "-40px",
              top: "100px",
              left: "300px",
            }}
          >
            <div className="card-header handle" style={{ backgroundColor: "#0b3363" }}>
              <h4 style={{ fontSize: "20px", color: "white" }}>
                <strong>Edit User</strong>
              </h4>
              <div>
                <AiOutlineCloseCircle
                  onClick={() => {
                    setEditUserModal(false);
                  }}
                  size="20px"
                  style={{
                    float: "right",
                    marginTop: "-25px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>

            <div className="card-body">
              <div className="row g-2">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGrid"
                      value={editusername}
                      onChange={(e) => seteditusername(e.target.value)}
                    />
                    <label for="floatingInputGrid">Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputGrid"
                      value={editemail}
                      onChange={(e) => seteditemail(e.target.value)}
                    />
                    <label for="floatingInputGrid">Email address</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGrid"
                      value={editmobile}
                      onChange={(e) => seteditmobile(e.target.value)}
                    />
                    <label for="floatingInputGrid">Phone</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGrid"
                      value={editwhatsapp}
                      onChange={(e) => seteditwhatsapp(e.target.value)}
                    />
                    <label for="floatingInputGrid">Whatsapp</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGrid"
                      value={editfacebook}
                      onChange={(e) => seteditfacebook(e.target.value)}
                    />
                    <label for="floatingInputGrid">facebook</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputGrid"
                      value={edittwitter}
                      onChange={(e) => setedittwitter(e.target.value)}
                    />
                    <label for="floatingInputGrid">Twitter</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGrid"
                      value={editteams}
                      onChange={(e) => seteditteams(e.target.value)}
                    />
                    <label for="floatingInputGrid">Teams</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGrid"
                      value={editcompany}
                      onChange={(e) => seteditcompany(e.target.value)}
                    />
                    <label for="floatingInputGrid">Company</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGrid"
                      value={editaddress}
                      onChange={(e) => seteditaddress(e.target.value)}
                    />
                    <label for="floatingInputGrid">Address</label>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  className="btn btn-primary btn-md float-end mt-3"
                  onClick={() => {
                    updateEditvalue();
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default connect(mapStateToProps, {
  setselectedusername,
  setselectedemail,
  setselectedmobile,
  setselectedwhatsapp,
  setselectedfacebook,
  setselectedtwitter,
  setselectedteams,
  setselectedcompany,
  setselectedadress,
  setselectedid,
})(UserDetails);
