import React, { useState, useRef, useEffect, createRef } from "react";
import { connect } from "react-redux";
import { Button, Modal, Form, Card } from "react-bootstrap";

import axios from "axios";
import "./Chat-Style/chat.css";
import { ImCross } from "react-icons/im";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AudioRecorder } from "react-audio-voice-recorder";

import { toast, ToastContainer } from "react-toastify";
import { BaseUrl, errorApi } from "../../../container/BaseUrl/BaseUrl";
import { setchatdata, settogglechat } from "../../../redux/actions/actions";
import { AiOutlinePlus } from "react-icons/ai";

import Foroutsideclick from "./Foroutsideclick";
import Emoji from "./Emoji.component";

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    contactList: data.contactList,
    chat: data.chat,
    togglechat: data.togglechat,
  };
};
const ChatInput = (props) => {
  const tenantId = localStorage.getItem("TenantId");
  const [msg, setMsg] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const [fileTypeStore, setFileTypeStore] = useState("");
  const [fileUploadName, setfileUploadName] = useState("");
  const [fileSendName, setfileSendName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cannedmessagediv, setCannedmessagediv] = useState(false);
  const [showcannedmodal, setShowcannedmodal] = useState(false);
  const [showMessage, setShowMessage] = useState([]);
  const [createMsg, setCreateMsg] = useState("");
  const [voiceRecord, setVoiceRecord] = useState(true);
  const [recordnum, setRecordnum] = useState("1");
  const [recorddata, setRecorddata] = useState("");
  const [preview, setPreview] = useState(true);
  const [src, setSrc] = useState("");
  const [cannemessagestore, setCannemessagestore] = useState("");
  const handleClosecannedmessage = () => setShowcannedmodal(false);
  const handleShowcannedmessage = () => setShowcannedmodal(true);
  const [recorder, setRecorder] = useState(null);
  const menuRef = useRef();

  // ! This Section is for emoji
  const inputRef = createRef();
  // const [message, setmessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPosition, setcursorPosition] = useState();
  const onEmojiClick = (e) => {
    setShowPicker(!showPicker)
    const ref = inputRef.current;
    ref.focus();
    const start = msg.substring(0, ref.selectionStart);
    const end = msg.substring(ref.selectionEnd);
    const text = start + e.emoji + end;
    setMsg(text);
    setcursorPosition(start.length + e.emoji.length);
  };
  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  // ! This Section is for emoji

  // * audio functionality
  const [ShowAudioPreview, setShowAudioPreview] = useState(false);
  const [audioUrl, setaudioUrl] = useState([]);
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setaudioUrl(url);
    setShowAudioPreview(!ShowAudioPreview);
  };
  const deletebutton = () => {
    setaudioUrl([]);
    setShowAudioPreview(false);
  };
  // * audio functionality

  useEffect(() => {
    retrieveScannedMsg();
  }, [props.disconnect]);

  const showCannedmessage = () => {
    setCannedmessagediv(true);
    console.log("click");
  };

  const showuserNotification = () => {
    console.log("Value ", cannedmessagediv);
    setCannedmessagediv(!cannedmessagediv);
  };

  const closeuserNotification = () => {
    setCannedmessagediv(false);
  };

  const errorHandel = async (error, endpoint) => {
    const tenantID = localStorage.getItem("TenantId");
    try {
      const payload = {
        servicename: "DCCCHAT",
        logs: error,
        description: endpoint,
      };

      const header = {
        headers: {
          // Authorization: "Bearer " + token,
          // "Content-Type": "application/json",
          tenantid: tenantID,
        },
      };
      const { data } = await axios.post(
        errorApi + "/UIlogs/createLogs",
        payload,
        header
      );
      if (data.status) {
        // console.log("from error api", data);
      }
    } catch (error) {
      // console.log("error", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFileTypeStore("");
  };
  const handleShow = () => setShow(true);

  const sendChat = (event) => {
    if (event.keyCode === 13) {
      
      event.preventDefault();
      if (props.data.chat.is_customer_disconnected) {
        toast.error(
          "Customer is disconnected you can't send message",
          toastOptions
        );
      } else {
        if (!preview) {
          setVoiceRecord(true);
          setPreview(true);
          const fileUploaded = recorddata;
          let formData = new FormData();
          let fileName = `audio.wav`;
          let file = new File([fileUploaded], fileName);
          formData.append("file", file, fileName);

          const url = "https://qacc.inaipi.ae/v1/fileServer/uploadMedia";

          formData.append(
            "userID",
            props.data.chat.unique_id
              ? props.data.chat.unique_id.id
              : props.data.chat.senderDetails[0]._id
          );
          formData.append("clientApp", "InapiWebchat");
          formData.append("channel", "webchat");
          formData.append("sessionId", props.data.chat.chat_session_id);
          formData.append("sentBy", "Agent");
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              tenantId: "123456",
            },
          };

          axios
            .post(url, formData, config)
            // setLoading(true)
            .then((response) => {
              if (response.data.status) {
                setLoading(false);
                let pic_url = response.data.data.signedUrl;
                let mediaType = response.data.data.mediaType.toUpperCase();
                props.handleSendMsg(pic_url, "AUDIO", "");
                setFile("");
                setFileTypeStore("");
              }
            })
            .catch((error) => {
              errorHandel(error, "/fileServer/uploadMedia");
              toast.error(
                "Sorry,the file you are trying to upload is too big(maximum size is 3072KB)",
                toastOptions
              );
            });
        }
        if (msg.length > 0 && msg.length < 1000) {
          props.handleSendMsg(msg, "TEXT", "");
          setMsg("");
        } else if (msg.length > 1000) {
          toast.error(
            "You'll need to shorten your message to send it",
            toastOptions
          );
        }
      }
    }
  };
  const sendChatButton = (event) => {
    if (props.data.chat.is_customer_disconnected) {
      toast.error(
        "Customer is disconnected you can't send message",
        toastOptions
      );
    } else {
      if (!preview) {
        setVoiceRecord(true);
        setPreview(true);
        const fileUploaded = recorddata;
        let formData = new FormData();
        let fileName = `audio.wav`;
        let file = new File([fileUploaded], fileName);
        formData.append("file", file, fileName);

        const url = "https://qacc.inaipi.ae/v1/fileServer/uploadMedia";

        formData.append(
          "userID",
          props.data.chat.unique_id
            ? props.data.chat.unique_id.id
            : props.data.chat.senderDetails[0]._id
        );
        formData.append("clientApp", "InapiWebchat");
        formData.append("channel", "webchat");
        formData.append("sessionId", props.data.chat.chat_session_id);
        formData.append("sentBy", "Agent");
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            tenantId: "123456",
          },
        };

        axios
          .post(url, formData, config)
          // setLoading(true)
          .then((response) => {
            if (response.data.status) {
              setLoading(false);
              let pic_url = response.data.data.signedUrl;
              let mediaType = response.data.data.mediaType.toUpperCase();
              props.handleSendMsg(pic_url, "AUDIO", "");
              setFile("");
              setFileTypeStore("");
            }
          })
          .catch((error) => {
            errorHandel(error, "/fileServer/uploadMedia");
            toast.error(
              "Sorry,the file you are trying to upload is too big(maximum size is 3072KB)",
              toastOptions
            );
          });
      }
      if (msg.length > 0 && msg.length < 1000) {
        props.handleSendMsg(msg, "TEXT", "");
        setMsg("");
      } else if (msg.length > 1000) {
        toast.error(
          "You'll need to shorten your message to send it",
          toastOptions
        );
      }
    }
  };

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    let reader = new FileReader();
    const fileUploaded = event.target.files[0];
    console.log("fileUploaded<<<<<<<<<<<>>>>>>>>", fileUploaded);
    const fileType = fileUploaded.type;
    console.log("fileUploaded", fileType);
    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "video/webmp",
      "audio/mp3",
      "audio/wav",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/.docx",
    ];

    if (fileUploaded.size > 3000000) {
      toast.warn("Choose File Below 3mb", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // toast.warn('Choose File Below 5mb')
    } else if (allowedFormats.includes(fileType)) {
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setFile(fileUploaded);
      };

      reader.readAsDataURL(fileUploaded);
      let split_fileType = event.target.files[0].type.split("/");
      let fileTypeToShow;

      setFileTypeStore(split_fileType[0]);

      setfileUploadName(fileUploaded);
      setfileSendName(event.target.files[0].name);
      handleShow();
    } else {
      toast.warn("Invalid File Format");
    }
  };

  const retrieveScannedMsg = () => {
    let data = {
      offset: "0",
      limit: "10",
    };
    const access_token = localStorage.getItem("access_token");
    axios
      .post(BaseUrl + "/scannedMessage/listMessage", data, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          tenantId: tenantId,
        },
      })
      .then((res) => {
        if (res.status) {
          if (res.data.data) {
            let resp = res.data.data;
            // console.log(resp);
            setShowMessage(resp);
          }
        }
      })
      .catch((error) => {
        console.log("try after sometimes");
        errorHandel(error, "/scannedMessage/listMessage");
      });
  };

  const create_contact = () => {
    const access_token = localStorage.getItem("access_token");
    let data = {
      message: createMsg,
    };
    axios
      .post(BaseUrl + "/scannedMessage/createMessage", data, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          tenantId: tenantId,
        },
      })
      .then((res) => {
        if (res.status) {
          toast.success("The message is successfully canned");

          setTimeout(() => {
            retrieveScannedMsg();
            setShowcannedmodal(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log("try after sometimes");
        errorHandel(error, "/scannedMessage/createMessage");
      });
  };

  const sendFile = () => {
    let send_file;
    if (fileUploadName.name) {
      send_file = fileUploadName;
      setLoading(true);
    } else {
      send_file = file;
    }
    const url = "https://qacc.inaipi.ae/v1/fileServer/uploadMedia";
    const formData = new FormData();
    formData.append("file", send_file);
    formData.append(
      "userID",
      props.data.chat.unique_id
        ? props.data.chat.unique_id.id
        : props.data.chat.senderDetails[0]._id
    );
    formData.append("clientApp", "InapiWebchat");
    formData.append("channel", "webchat");
    formData.append("sessionId", props.data.chat.chat_session_id);
    formData.append("sentBy", "Agent");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        tenantId: "123456",
      },
    };

    axios
      .post(url, formData, config)
      // setLoading(true)
      .then((response) => {
        if (response.data.status) {
          setLoading(false);
          let pic_url = response.data.data.signedUrl;
          let mediaType = response.data.data.mediaType.toUpperCase();
          props.handleSendMsg(pic_url, mediaType, fileSendName);
          setFile("");
          setFileTypeStore("");
        }
      })
      .catch((error) => {
        errorHandel(error, "/fileServer/uploadMedia");
        toast.error(
          "Sorry,the file you are trying to upload is too big(maximum size is 3072KB)",
          toastOptions
        );
      });

    handleClose();
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const getId = (item) => {
    console.log("selectedMessage", item.message);
    // setSelectedcannedmsg(item.message)
    // sendChat(setMsg(item.message))
    setMsg(item.message);
    setCannemessagestore(item.message);
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div
        className={
          ShowAudioPreview
            ? "d-none"
            : "chatbox-popup__footer d-flex align-items-center mt-1 justify-content-evenly"
        }
      >
        {/* Emoji Button */}
        <div className="smiley btn-sm border-0 me-2 ">
          <i
            className="fa-regular fa-face-smile"
            onClick={() => {
              inputRef.current.focus();
              setShowPicker(!showPicker);
            }}
          ></i>
          {showPicker && <Emoji onEmojiClick={onEmojiClick} />}
        </div>
        {/* Emoji Button */}

        {/* Input Button */}
        <div className="chat-textarea">
          <textarea
            type="text"
            ref={inputRef}
            value={msg}
            onKeyDown={(e) => {
              sendChat(e);
            }}
            onChange={(e) => {
              props.handleTyping();
              setMsg(e.target.value);
            }}
            placeholder="Enter your message..."
          ></textarea>
        </div>
        {/* Input Button */}

        {/* Mic Button */}
        <div className="smiley btn-sm border-0 " style={{ padding: "4px 0px" }}>
          <AudioRecorder
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
          />
        </div>
        {/* Mic Button */}

        {/* File Button */}
        <div className="smiley uplode me-1 ">
          <label className="attch-label btn-sm border-0" htmlFor="attach">
            <i className="fas fa-paperclip" style={{ cursor: "pointer" }}></i>
          </label>
          <input
            className="form-control"
            type="file"
            id="attach"
            onChange={handleChange}
          />
        </div>
        {/* File Button */}

        {/* Canned Message */}
        <div className="smiley uplode me-2">
          <div
            className="attch-label btn-sm border-0"
            onClick={showuserNotification}
          >
            <i className="fa-regular fa-message"></i>
          </div>
        </div>
        {/* Canned Message */}

        {/* Send Message Button */}
        <div className="smiley chat-sent">
          <button
            type="button"
            onClick={sendChatButton}
            className="btn btn-chatsent d-flex justify-content-center align-items-center btn-sm"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        {/* Send Message Button */}
      </div>

      {ShowAudioPreview && (
        <div className="chatbox-popup__footer d-flex align-items-center mt-1 justify-content-evenly">
          <div className="smiley btn-sm border-0 deleteiconOnHover">
            <i className="fa-solid fa-trash" onClick={deletebutton}></i>
          </div>
          <div className="smiley chat-textarea">
            <audio className="audio-element" src={audioUrl} controls />
          </div>
          <div className="smiley btn-sm border-0 ">
            <span
              className="material-symbols-outlined sendiconOnHover mt-1 "
              onClick={(e) => {
                setShowAudioPreview(false);
                sendChatButton(e)
              }}
            >
              send
            </span>
          </div>
        </div>
      )}

      {cannedmessagediv && (
        <div className="canned_div position-relative d-flex float-end bg-light">
          {/* <Foroutsideclick onClickOutside={closeuserNotification}> */}
          <Card
            style={{
              height: "17rem",
              width: "17rem",
              zIndex: 0,
              overflowY: "scroll",
              padding: "15px",
            }}
            className="mt-2"
          >
            <div className="d-flex justify-content-between mt-1 ml-2">
              <h5 className="mt-2 text-center" style={{ fontSize: "1rem" }}>
                Canned Message
              </h5>
              <Button
                className="mr-2"
                style={{ fontSize: "10px", backgroundColor: "#00498f" }}
                onClick={handleShowcannedmessage}
              >
                <AiOutlinePlus />
              </Button>
            </div>

            {showMessage.map((item) => (
              <Card
                onClick={() => {
                  getId(item);
                  closeuserNotification();
                }}
                style={{
                  width: "95%",
                  height: "3rem",
                  marginLeft: "10px",
                  cursor: "pointer",

                  // marginBottom:'10rem'
                }}
                className="mt-2"
              >
                <div className="text-center d-flex justify-content-around my-auto">
                  <p style={{ fontWeight: "bold", padding: "10px 0px" }}>
                    {item.message}
                  </p>
                </div>
              </Card>
            ))}
          </Card>
          {/* </Foroutsideclick> */}
        </div>
      )}

      {/* canned message modal */}
      <Modal
        show={showcannedmodal}
        onHide={handleClosecannedmessage}
        className="cannded_msg"
      >
        <Modal.Header
          style={{
            backgroundColor: "#294e9f",
            color: "white",
            marginTop: "-1px",
          }}
        >
          <Modal.Title>Canned Message</Modal.Title>
          <span className="mt-2">
            <ImCross
              onClick={() => {
                setShowcannedmodal(false);
              }}
            />
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Canned Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Message"
                onChange={(e) => setCreateMsg(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <div className="d-flex p-2 justify-content-end">
          <Button variant="primary" onClick={create_contact}>
            Submit
          </Button>
        </div>
      </Modal>
      {/* canned message modal */}

      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header
          style={{
            padding: "10px 0 0 10px",
            margin: 0,
            height: "42px",
            backgroundColor: "#2951cf",
          }}
        >
          <Modal.Title className="w-100">
            <div className="d-flex justify-content-between align-items-center text-dark">
              <span className="mb-3 text-white">Preview</span>
              <AiOutlineCloseCircle
                size={15}
                className="me-2 mb-2"
                style={{ cursor: "pointer" }}
                onClick={handleClose}
                color="white"
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        {loading ? (
          <div
            className="spinner-border  d-flex justify-content-center align-items-center mx-auto"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Modal.Body
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "12rem",
            }}
          >
            {" "}
            {fileTypeStore == "image" && (
              <img
                style={{ width: "100%", height: "10rem" }}
                src={imagePreviewUrl}
              />
            )}
            {fileTypeStore == "audio" && (
              <audio
                className="preview_audio"
                controls
                src={imagePreviewUrl}
              ></audio>
            )}
            {fileTypeStore == "video" && (
              <video width="220" height="150" controls muted onloadstart={true}>
                <source src={imagePreviewUrl} type="video/mp4"></source>
              </video>
            )}
            {fileTypeStore == "application" && (
              <div
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <a href={imagePreviewUrl} target="_blank">
                  {fileSendName}
                </a>
              </div>
            )}
          </Modal.Body>
        )}
        <Modal.Footer className="imgPreview" style={{ padding: 0 }}>
          <div>
            {" "}
            <Button
              onClick={() => {
                handleClose();
                setFileTypeStore("");
              }}
              className="closeBtnImg me-2"
              size="sm"
              variant="secondary"
            >
              Close
            </Button>
            <Button onClick={sendFile} className="saveButtonImg me-2" size="sm">
              Send
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Preview Model */}
    </>
  );
};
export default connect(mapStateToProps, {
  setchatdata,
  settogglechat,
})(ChatInput);
