import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiMessageDots } from "react-icons/bi";
import { FaAddressCard, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import "./contact.css";
import { MdAdd } from "react-icons/md";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { BaseUrl } from "../../container/BaseUrl/BaseUrl";


const Contacts = () => {
  const [key, setKey] = useState("contact");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [contactUserName, setContactUserName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactInterest, setContactInterest] = useState("");
  const [contactOccupation, setContactOccupation] = useState("");
  const [contactaddress, setContactAddress] = useState("");

  const [contactList, setContactList] = useState([]);

  const [showContactName, setShowContactName] = useState("");
  const [showContactNameSlice, setShowContactNameSlice] = useState("");
  const [showContactEmail, setShowContactEmail] = useState("");
  const [showContactPhone, setShowContactPhone] = useState("");
  const [showContactAdd, setShowContactAdd] = useState("");

  const [showContactOcc, setShowContactOcc] = useState("");
  const [changeColorBackground, setChangeColorBackground] = useState("");
  const [active, setActive] = useState("1");
  const [search, setSearch] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const searchSpace = (event) => {
    let keyword = event.target.value;
    // console.log(keyword);
    setSearch(keyword);
  };

  const goToChatPage = () => {
    navigate("/chat");
  };

  useEffect(() => {
    listContact();
  }, []);

  const listContact = () => {
    let data = {
      offset: "0",
      limit: "100",
    };

    axios
      .post(BaseUrl + "/contact/listcontactlist", data)
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          let resp = res.data.data;
          let details = [];
          let count_id = 1;
          let randomColors = [
            "#E1F2FB",
            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",
            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",
            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",
            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#E1F2FB",

            "#F3DFE3",
            "#E9B2BC",
            "#F6E5F5",
            "#FBF4F9",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
            "#F3DFE4",
            "#E9B2D4",
            "#F6E5L3",
            "#FBF4T6",
            "#B9CCED",
            "#FEFCF3",
            "#F5EBEO",
            "#FODBDB",
            "#DBA39A",
          ];
          resp.forEach((element, index) => {
            details.push({
              name: element["name"],
              phonenumber: element["phonenumber"],
              email: element["email"],
              occupation: element["occupation"],
              id: element["id"],
              count_id: count_id,
              b_color: randomColors.getRandom(),
            });
            count_id++;
          });
          setContactList(details);
          setShowContactNameSlice(
            res.data.data[0].name.slice(0, 2).toUpperCase()
          );
          setShowContactName(res.data.data[0].name);
          setShowContactEmail(res.data.data[0].email);
          setShowContactPhone(res.data.data[0].phonenumber);
          setShowContactOcc(res.data.data[0].occupation);
          setShowContactAdd(res.data.data[0].address);
        }
      })
      .catch((err) => {
        console.log("try after sometimes");
      });
  };

  const createContact = () => {
    let body = {
      email: contactEmail,
      phonenumber: contactPhoneNumber,
      occupation: contactOccupation,
      address: contactaddress,
      name: contactUserName,
    };
    axios
      .post(
        BaseUrl + "/contact/createcontactlist",
        body
        // {
        //   headers:{
        //     Authorization: "Bearer " + token,
        //     "Content-Type": "application/json",
        //     tenantId: localStorage.getItem("TenantId"),
        //   }
        // }
      )
      .then((res) => {
        console.log(res);
        listContact();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  Array.prototype.getRandom = function (cut) {
    var i = Math.floor(Math.random() * this.length);
    if (cut && i in this) {
      return this.splice(i, 1)[0];
    }
    return this[i];
  };

  const getContactDetails = (e) => {
    setActive(e.count_id);

    setShowContactNameSlice(e.name.slice(0, 2).toUpperCase());
    setShowContactName(e.name);
    setShowContactEmail(e.email);
    setShowContactPhone(e.phonenumber);
    setShowContactOcc(e.occupation);
    setShowContactAdd(e.address);
  };

  return (
    <>
      <div>
        <div className="row ml-5" style={{margin:'2% 0% 0% 4%',}}>
          <div
            className="col-md-3"
            style={{ borderRight: "1px solid grey", height: "340px" }}
          >
            <h5 className="mt-2">Contacts</h5>

            <hr />

            <div className="search" style={{ margin: "0 0 15px 0" }}>
              <input
                type="text"
                placeholder=" Search"
                name="search"
                style={{ width: "100%", padding: "5px 0" }}
                onChange={(e) => searchSpace(e)}
                className="form-control"
              />
            </div>
            <div className="scroll" style={{ height: "70vh" }}>
              {contactList
                .filter((item) => {
                  if (search == null) return item;
                  else if (
                    item.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .reverse()
                .map((item) => (
                  <div
                  key={item.id}
                    className={`d-flex justify-content-start list-chat-contact ${
                      active == item.count_id ? "active-contact" : ""
                    }`}
                    onClick={() => getContactDetails(item)}
                    id={item.count_id}
                  >
                    <div
                      className="text-center d-flex justify-content-center align-items-center"
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "grey",
                        width: "40px",
                        height: "40px",
                        backgroundColor: item.b_color,
                      }}
                    >
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="mt-1 ml-2">
                      <h6>{item.name}</h6>
                      <p
                        style={{
                          textOverflow: "ellipsis",
                          width: "165px",
                          overflow: "hidden",
                        }}
                      >
                        {item.email}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-md-9">
            <div className="rel-action" style={{ paddingRight: "20px" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                }}
              >
                <MdAdd size={20} />
              </button>
            </div>
            <div className="row user-profile-page">
              <div className="col-md-6">
                <div
                  className="row"
                  style={{ marginTop: "20px", padding: "15px 10px" }}
                >
                  <div className="col-md-3 d-flex justify-content-start">
                    <div
                      className="text-center d-flex justify-content-center align-items-center"
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "grey",
                        width: "70px",
                        height: "70px",
                      }}
                    >
                      {showContactNameSlice}
                    </div>
                  </div>
                  <div className="col-md-9">
                    <h4>{showContactName}</h4>
                    <p className="mb-2">Imperium Software Technologies</p>
                    <div className="d-flex justify-content-start align-items-center">
                      <p className="ml-4">
                        <BiMessageDots
                          size="15"
                          style={{ cursor: "pointer" }}
                          onClick={goToChatPage}
                        />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="ml-3"
                  >
                    <Tab eventKey="contact" title="Contact" className="ml-3">
                      <div
                        className="tab_content_contact mb-4 mt-4"
                        style={{
                          backgroundColor: "#f8f9fd ",
                          marginLeft: "0px",
                          color: "#000",
                          width: "69vw",
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <AiOutlineMail
                              style={{
                                position: "absolute",
                                top: "2px",
                                fontSize: "22px",
                              }}
                            />{" "}
                            <div style={{ marginLeft: "32px" }}>
                              <span style={{ fontWeight: "500" }}>Email</span>{" "}
                              <p>{showContactEmail}</p>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12">
                            <IoCallOutline
                              style={{
                                position: "absolute",
                                top: "2px",
                                fontSize: "20px",
                              }}
                            />
                            <div style={{ marginLeft: "32px" }}>
                              <span style={{ fontWeight: "500" }}>
                                Phone Number
                              </span>{" "}
                              <p>{showContactPhone}</p>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-lg-12">
                            <FaBriefcase
                              style={{
                                position: "absolute",
                                top: "2px",
                                fontSize: "20px",
                              }}
                            />
                            <div style={{ marginLeft: "32px" }}>
                              <span style={{ fontWeight: "500" }}>
                                Occupation
                              </span>{" "}
                              <p>{showContactOcc}</p>
                            </div>
                          </div>

                          <div className="col-lg-12 mt-4">
                            <FaAddressCard
                              style={{
                                position: "absolute",
                                top: "2px",
                                fontSize: "20px",
                              }}
                            />
                            <div style={{ marginLeft: "32px" }}>
                              <span style={{ fontWeight: "500" }}>Address</span>{" "}
                              <p className="address_area">Bangalore</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>

                    <Tab eventKey="files" title="Files" className="ml-3">
                      {/* <Files /> */}
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header className=" text-white" style={{ background: "#0b3363" }}>
          <Modal.Title>Add contacts</Modal.Title>
          <span className="mt-2">
            <ImCross onClick={handleClose} />
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="requiredLabel"> Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    onChange={(e) => setContactUserName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="requiredLabel">
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" placeholder="Enter Status" />
                </Form.Group> */}
              </Form>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="requiredLabel">Address</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Enter Address"
                  onChange={(e) => setContactAddress(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="requiredLabel">Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setContactPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                {" "}
                <Form.Label className="requiredLabel">Interest</Form.Label>
                <select
                  className="form-control form-select"
                  onChange={(e) => setContactInterest(e.target.value)}
                >
                  <option selected>Select Interest</option>
                  <option value="Account Open">Account Open</option>
                  <option value="Loan">Loan</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="requiredLabel">Occupation</Form.Label>

                <select
                  className="form-control form-select"
                  onChange={(e) => setContactOccupation(e.target.value)}
                >
                  <option selected>Select Occupation</option>
                  <option value="Employed">Employed</option>
                  <option value="Self Employed">Self Employed</option>
                </select>
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Created At</Form.Label>
                <Form.Control type="text" placeholder="Enter number" />
              </Form.Group> */}
            </div>
          </div>
        </Modal.Body>
        <div className="d-flex  justify-content-end">
          <Button className="btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              createContact();
              setShow(false);
              listContact();
            }}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Contacts;
