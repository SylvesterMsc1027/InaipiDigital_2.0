import React, { Component } from "react";
import _ from "lodash";
import ToggleButton from "@mui/material/ToggleButton";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../Resources/css/email.css";
import "../Resources/css/images.css";
import "../Resources/css/util.css";
import SidebarComp from "../inbox/SidebarComb";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      passwordtype: false,
    };
  }

  openNav = () => {
    var sideNavElement = document.getElementById("mySidenav");
    var rowTwoElement = document.getElementById("rowtwo");
    var docWidth = document.documentElement.clientWidth;

    if (document.body.offsetWidth > 1024) {
      if (sideNavElement.clientWidth > 0) {
        sideNavElement.style.display = "none";
        rowTwoElement.style.left = "0";
        rowTwoElement.style.width = docWidth + "px";
      } else {
        sideNavElement.style.display = null;
        rowTwoElement.style.left = "253px";
        rowTwoElement.style.width = docWidth - 255 + "px";
      }
    }
  };

  render() {
    return (
      <>
        <div className="row mx-5" style={{ backgroundColor: "#ffffff" }}>
          <div className="col-md-1">
            <SidebarComp />
          </div>
          <div className="col-md-11">
            <div className="email-app card-margin">
              <div class="side-margin">
                <div className="rowone">
                  <div className="email-home-menu">
                    <input
                      className="form-control w-25 rounded-pill"
                      placeholder="Search..."
                    />

                    <div className="d-flex justify-content-center align-items-center mx-2">
                      <span className="fw-bold mx-1">Home</span>
                      <span className="fw-bold mx-1">Format </span>
                      <span className="fw-bold mx-1">View </span>
                    </div>
                  </div>
                  <div className="card email-edit-palette p-3">
                    <div className="palette">
                      <span className="sideNav-btn" onClick={this.openNav}>
                        &#9776; &nbsp;
                      </span>
                      <div className="palette-option d-flex align-items-center  ms-2">
                        <a href="/newemail" className="text-decoration-none">
                          {/*<img src={Mail_write} />*/}New Email &nbsp;
                        </a>
                      </div>
                      <div className="palette-option ms-4">
                        <select className="font-list">
                          <option>Arial</option>
                          <option>Calibri</option>
                          <option>Times New Roman</option>
                        </select>
                      </div>
                      <div className="palette-option">
                        <select className="font-list">
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="bold"
                          aria-label="bold"
                          size="small"
                          id="fnt-style"
                        ></ToggleButton>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="italic"
                          aria-label="italic"
                          size="small"
                          id="fnt-style"
                        >
                          <FormatItalicIcon />
                        </ToggleButton>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="underlined"
                          aria-label="underlined"
                          size="small"
                          id="fnt-style"
                        >
                          <FormatUnderlinedIcon />
                        </ToggleButton>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="highlight"
                          aria-label="highlight"
                          size="small"
                          id="fnt-style"
                        >
                          <BorderColorIcon />
                        </ToggleButton>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="colortext"
                          aria-label="colortext"
                          size="small"
                          id="fnt-style"
                        >
                          <FormatColorTextIcon />
                        </ToggleButton>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="listbulleted"
                          aria-label="listbulleted"
                          size="small"
                          id="fnt-style"
                        >
                          <FormatListBulletedIcon />
                        </ToggleButton>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="listnumbered"
                          aria-label="listnumbered"
                          size="small"
                          id="fnt-style"
                        >
                          <FormatListNumberedIcon />
                        </ToggleButton>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="indentincrease"
                          aria-label="indentincrease"
                          size="small"
                          id="fnt-style"
                        >
                          <FormatIndentIncreaseIcon />
                        </ToggleButton>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="indentdecrease"
                          aria-label="indentdecrease"
                          size="small"
                          id="fnt-style"
                        >
                          <FormatIndentDecreaseIcon />
                        </ToggleButton>
                      </div>
                      <div className="palette-option">
                        <ToggleButton
                          value="morehoriz"
                          aria-label="morehoriz"
                          size="small"
                          id="fnt-style"
                        >
                          <MoreHorizIcon />
                        </ToggleButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
