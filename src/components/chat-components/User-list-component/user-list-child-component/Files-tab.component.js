import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import { setselectedemail } from "../../../../redux/actions/actions";
import { RiErrorWarningLine } from "react-icons/ri";

const mapStateToProps = (state) => {
  return {
    chat: state.data.chat,
    selectedemail: state.data.selectedemail,
  };
};


const FilesTab = (props) => {
  const [filename, setFilename] = useState([]);

  useEffect(() => {
    allfile();
  }, [localStorage.getItem("client")]);
  const allfile = () => {
    // console.log('wertytrewerfgIDDDD<<<<<<<<',props.chat.unique_id.id)
    let data = {
      userId: props.chat.unique_id ? props.chat.unique_id.id : "",
    };
    axios
      .post("https://qacc.inaipi.ae/v1/fileServer/getMediaUserId", data, {
        headers: {
          TenantId: "123456",
        },
      })
      .then((res) => {
        // console.log("resPdf", res);
        setFilename(res.data.data);
      })
      .catch((err) => {
        // errorHandel(err, "/fileServer/getMediaUserId")
        // console.log("err");
      });
  };

  return (
    <>
      <div
        className={props.FilesTab}
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <div className="m-2 file-main">
          <div className="chat-r-file">
            {filename.length > 0 ? (
              filename.map((item) => {
                return (
                  <div className="row m-2 border p-2 justify-content-center align-items-center bg-white">
                    <div className="col-2">
                      <i className="fas fa-file fs-31 text-primary"></i>
                    </div>
                    <div className="col-7">
                      <div>
                        <p className="mb-0 fw-bold fs-14">
                          {item.path.split("/")}
                        </p>
                      </div>
                      <div>
                        <p className="fs-12 mb-0 fw-light text-secondary">
                          {moment(item.createdDate).format("l   hh:mm:s A")}
                        </p>
                      </div>
                    </div>
                    <div className="col-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-0"
                        data-tippy-content="Download"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </div>
                );
              })
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
                      No Files Found
                    </h6>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, {
  setselectedemail,
})(FilesTab);
