import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ToggleButton from '@mui/material/ToggleButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Email from '../Resources/images/firstemail.png'
import Mail_write from '../Resources/images/new_email.png'
import inbox from '../Resources/images/inbox_second.png'
import drafts from '../Resources/images/draft_new.jpg'
import sentitems from '../Resources/images/dm.png'
import deleteitems from '../Resources/images/trash.png'
import junkemail from '../Resources/images/error.png'
import bold from '../Resources/images/bold1.png'
import italic from '../Resources/images/italic.png'
import underline from '../Resources/images/line.png'
import avatar from '../Resources/images/imageicon1.png'
import highlight from '../Resources/images/highlight.png'
import fontcolour from '../Resources/images/fontcolour.png'
import bullets from '../Resources/images/bullet.png'
import numberBullets from '../Resources/images/number.png'
import leftIndent from '../Resources/images/leftindent.png'
import rightIndent from '../Resources/images/rightindent.png'
import moreOptions from '../Resources/images/moreoptions.png'
import search from '../Resources/images/search.png'
import reply from '../Resources/images/reply2.png'
import replyall from '../Resources/images/replyall.png'
import forward from '../Resources/images/forward.png'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import '../Resources/css/email.css'
import { CTooltip } from '@coreui/react';
import SidebarComp from './SidebarComb';
import Navbar from "../../../components/navbar-components/Navbar";
import Sidebar from "../../../components/sidebar-components/Sidebar";

export default class NewEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameObj: { 'first': 'Belvin' },
            name: 'Bell ',
            emails: [],
            from: { mailId: "Acct.user@gmail.com" },
            to: [],
            toInputValue: '',
            cc: [],
            ccInputValue: '',
            bcc: [],
            bccInputValue: '',
            toError: false,
            ccError: false,
            bccError: false,
            inputText: '',
            formattedText: ''
        };
        this.inputRef = React.createRef();
    }

    handleMouseUp = () => {
        const input = this.inputRef.current;
        const selectedText = input.value.substring(
            input.selectionStart,
            input.selectionEnd
        );
        this.setState({ formattedText: selectedText });
    };
    handleButtonClick = () => {
        const { inputText, formattedText } = this.state;
        const formatted = inputText.replace(
            formattedText,
            `<b>${formattedText}</b>`
        );
        this.setState({ inputText: formatted, formattedText: formatted });
    };

    handleButtonClickItalic = () => {
        const { inputText, formattedText } = this.state;
        const formatted = inputText.replace(
            formattedText,
            `<em>${formattedText}</em>`
        );
        this.setState({ inputText: formatted, formattedText: formatted });
    };
    handleButtonClickUnderline = () => {
        const { inputText, formattedText } = this.state;
        const formatted = inputText.replace(
            formattedText,
            `<u>${formattedText}</u>`
        );
        this.setState({ inputText: formatted, formattedText: formatted });
    };

    handleInputChange = (event) => {
        this.setState({ inputText: event.target.value });
    };
    onToChange = (e, value) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let errorEmail = value.find((email) => !regex.test(email));
        if (errorEmail) {
            this.setState({ toInputValue: errorEmail, toError: true });
        }
        else {
            this.setState({ toError: false });
        }

        this.setState({ to: value.filter((email) => regex.test(email)) });
    }
    onCcChange = (e, value) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let errorEmail = value.find((email) => !regex.test(email));
        if (errorEmail) {
            this.setState({ ccInputValue: errorEmail, ccError: true });
        }
        else {
            this.setState({ ccError: false });
        }
        this.setState({ cc: value.filter((email) => regex.test(email)) });
    }
    onBccChange = (e, value) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let errorEmail = value.find((email) => !regex.test(email));
        if (errorEmail) {
            this.setState({ bccInputValue: errorEmail, bccError: true });
        }
        else {
            this.setState({ bccError: false });
        }
        this.setState({ bcc: value.filter((email) => regex.test(email)) });
    }
    onToInputChange = (e, newValue) => {
        this.setState({ toInputValue: newValue });
    }
    onCcInputChange = (e, newValue) => {
        this.setState({ ccInputValue: newValue });
    }
    onBccInputChange = (e, newValue) => {
        this.setState({ bccInputValue: newValue });
    }

    render() {
        const { from, to, toInputValue, toError, cc, ccInputValue, ccError, bcc, bccInputValue, bccError } = this.state;
        const mailAddress = [
            {
                title: 'rangitha.s@cognicx.com',
                mailid: 'rangitha.s@cognicx.com'
            },
            { title: 'belvin.d@cognicx.com' },
            { title: 'vinoth.s@cognicx.com' },
            { title: 'test@gmail.com' },
            { title: 'nandhini.e@cognicx.com' },
            { title: "indumathi.p@cognicx.com" },
            { title: 'hinduja.d@cognicx.com' },

        ];

        return (


            <>

                <div>
                    <Sidebar />
                </div>
                <Navbar />

                <div>



                    <div className='row mx-5' style={{ backgroundColor: "#ffffff" }}>
                        <div className='col-md-1'>
                            <SidebarComp />

                        </div>
                        <div className='col-md-11'>

                            <div class="side-margin">
                                <div className="rowtwo" id="rowtwo">
                                    <div className="email-list-wrapper" style={{ width: '20rem' }}>
                                        <div id="email-app-body" className="email-list-scroll-container ps ps--active-y">
                                            <div className="focused">


                                                <div className="circle">
                                                    <div className="checkmark"></div>
                                                </div>



                                                <div>
                                                    <h6>Focused &nbsp; &nbsp;</h6>
                                                </div>
                                                <div>
                                                    <h6>Other &nbsp; &nbsp;</h6>
                                                </div>
                                                <div>
                                                    <h6>Filter &nbsp; &nbsp;</h6>
                                                </div>
                                            </div>

                                            <div className="email-list-cont">
                                                <ul className="email-list" style={{ marginBottom: '5rem' }}>
                                                    <li className="email-list-item">
                                                        {/* <img src={avatar} alt="Profile Picture" /> */}
                                                        <div className="email-content">
                                                            <div className="recipient">
                                                                <a href="#" className="recipient-name">Pepper</a>
                                                            </div>
                                                            <a href="#" className="email-subject">Hi all the document that are missing is from the same &nbsp;</a>
                                                        </div>
                                                        <div className="email-footer">
                                                            <div className="email-action">
                                                                <a href="#" className="important">

                                                                </a>
                                                                <a href="#" className="starred">

                                                                </a>
                                                                <a href="#" className="attachment">

                                                                </a>
                                                            </div>
                                                            <span className="email-time">11:50 AM</span>
                                                        </div>
                                                    </li>
                                                    <li className="email-list-item active">
                                                        {/* <img src={avatar} alt="Profile Picture" /> */}
                                                        <div className="email-content">
                                                            <div className="recipient">
                                                                <a href="#" className="recipient-name">Poul Smith</a>
                                                            </div>
                                                            <a href="#" className="email-subject">Hi all the document that are missing is from the same &nbsp;</a>
                                                        </div>
                                                        <div className="email-footer">
                                                            <div className="email-action">
                                                                <a href="#" className="important">

                                                                </a>
                                                                <a href="#" className="starred">

                                                                </a>
                                                                <a href="#" className="attachment">



                                                                </a>
                                                            </div>
                                                            <span className="email-time">11:50 AM</span>
                                                        </div>
                                                    </li>
                                                    <li className="email-list-item">
                                                        <img src={avatar} alt="Profile Picture" />
                                                        <div className="email-content">
                                                            <div className="recipient">
                                                                <a href="#" className="recipient-name">Edwin Jarvis</a>
                                                            </div>
                                                            <a href="#" className="email-subject">Hi all the document that are missing is from the same &nbsp;</a>
                                                        </div>
                                                        <div className="email-footer">
                                                            <div className="email-action">
                                                                <a href="#" className="important">

                                                                </a>
                                                                <a href="#" className="starred">

                                                                </a>
                                                                <a href="#" className="attachment">



                                                                </a>
                                                            </div>
                                                            <span className="email-time">11:50 AM</span>
                                                        </div>
                                                    </li>
                                                    <li className="email-list-item">
                                                        <img src={avatar} alt="Profile Picture" />
                                                        <div className="email-content">
                                                            <div className="recipient">
                                                                <a href="#" className="recipient-name">Jim Ward</a>
                                                            </div>
                                                            <a href="#" className="email-subject">Hi all the document that are missing is from the same &nbsp;</a>
                                                        </div>
                                                        <div className="email-footer">
                                                            <div className="email-action">
                                                                <a href="#" className="important">

                                                                </a>
                                                                <a href="#" className="starred">

                                                                </a>
                                                                <a href="#" className="attachment">



                                                                </a>
                                                            </div>
                                                            <span className="email-time">11:50 AM</span>
                                                        </div>
                                                    </li>
                                                    <li className="email-list-item">
                                                        <img src={avatar} alt="Profile Picture" />
                                                        <div className="email-content">
                                                            <div className="recipient">
                                                                <a href="#" className="recipient-name">D Jango</a>
                                                            </div>
                                                            <a href="#" className="email-subject">Hi all the document that are missing is from the same &nbsp;</a>
                                                        </div>
                                                        <div className="email-footer">
                                                            <div className="email-action">
                                                                <a href="#" className="important">

                                                                </a>
                                                                <a href="#" className="starred">

                                                                </a>
                                                                <a href="#" className="attachment">



                                                                </a>
                                                            </div>
                                                            <span className="email-time">11:50 AM</span>
                                                        </div>
                                                    </li>
                                                    <li className="email-list-item">
                                                        <img src={avatar} alt="Profile Picture" />
                                                        <div className="email-content">
                                                            <div className="recipient">
                                                                <a href="#" className="recipient-name">Tom Harward</a>
                                                            </div>
                                                            <a href="#" className="email-subject">Hi all the document that are missing is from the same &nbsp;</a>
                                                        </div>
                                                        <div className="email-footer">
                                                            <div className="email-action">
                                                                <a href="#" className="important">

                                                                </a>
                                                                <a href="#" className="starred">

                                                                </a>
                                                                <a href="#" className="attachment">



                                                                </a>
                                                            </div>
                                                            <span className="email-time">11:50 AM</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="email-desc-wrapper " >

                                        <div className="mailcontent" style={{ width: '100%' }}>

                                            <>

                                                <InputGroup size="sm" className="mb-3">
                                                    <InputGroup.Text id="inputGroup-sizing-sm">To</InputGroup.Text>

                                                    <Stack spacing={{}} sx={{ width: 740 }}>
                                                        <Autocomplete
                                                            multiple
                                                            size="small"
                                                            onChange={this.onToChange}
                                                            value={to}
                                                            inputValue={toInputValue}
                                                            onInputChange={this.onToInputChange}
                                                            options={mailAddress.map((option) => option.title)}
                                                            freeSolo
                                                            renderInput={(params) => (
                                                                <TextField {...params}
                                                                    name="toAddr"
                                                                    variant="standard"
                                                                    type="email"
                                                                    error={toError}
                                                                />
                                                            )} />
                                                    </Stack>
                                                </InputGroup>
                                                <InputGroup size="sm" className="mb-3">
                                                    <InputGroup.Text id="inputGroup-sizing-sm">Cc</InputGroup.Text>

                                                    <Stack spacing={{}} sx={{ width: 740 }}>
                                                        <Autocomplete
                                                            multiple
                                                            size="small"
                                                            onChange={this.onCcChange}
                                                            value={cc}
                                                            inputValue={ccInputValue}
                                                            onInputChange={this.onCcInputChange}
                                                            options={mailAddress.map((option) => option.title)}
                                                            freeSolo
                                                            renderInput={(params) => (
                                                                <TextField {...params}
                                                                    name="ccAddr"
                                                                    variant="standard"
                                                                    type="email"
                                                                // error={ccError}
                                                                />
                                                            )} />
                                                    </Stack>
                                                </InputGroup>
                                                <InputGroup size="sm" className="mb-3">
                                                    <InputGroup.Text id="inputGroup-sizing-sm">Bcc</InputGroup.Text>

                                                    <Stack spacing={{}} sx={{ width: 740 }}>
                                                        <Autocomplete
                                                            multiple
                                                            size="small"
                                                            onChange={this.onBccChange}
                                                            value={bcc}
                                                            inputValue={bccInputValue}
                                                            onInputChange={this.onBccInputChange}
                                                            options={mailAddress.map((option) => option.title)}
                                                            freeSolo
                                                            renderInput={(params) => (
                                                                <TextField {...params}
                                                                    name="bccAddr"
                                                                    variant="standard"
                                                                    type="email"
                                                                    error={bccError}
                                                                />
                                                            )} />
                                                    </Stack>
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        placeholder="Add a Subject"
                                                        aria-label="Add a Subject"
                                                        aria-describedby="basic-addon2"
                                                    />
                                                </InputGroup>
                                                <br />
                                            </>
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: this.state.inputText }} />
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control as="textarea" rows={10}

                                                        type="text"
                                                        value={this.state.inputText}
                                                        onChange={this.handleInputChange}
                                                        ref={this.inputRef}
                                                        onMouseUp={this.handleMouseUp}
                                                        style={{ width: "700px", height: "280px" }}
                                                    />
                                                </Form.Group>


                                            </div>
                                            <div className="email-action-newEmail">

                                                <SplitButton
                                                    variant="primary"
                                                    title="Send"
                                                    id="segmented-button-dropdown-1">
                                                    <Dropdown.Item href="#">Send</Dropdown.Item>
                                                    <Dropdown.Item href="#">Schedule Send</Dropdown.Item>

                                                </SplitButton>
                                                &nbsp;
                                                <button
                                                    variant="light"
                                                    className="btn btn-warning">Discard
                                                </button>
                                                &nbsp;

                                                <div className="palette-option">
                                                    <label class="attachment">
                                                        <input type="file" /><AttachFileIcon />
                                                    </label>
                                                </div>
                                                &nbsp;
                                                <div className="palette-option">
                                                    <label class="attachment">
                                                        <input type="file" />
                                                        <InsertPhotoIcon />
                                                    </label>
                                                </div>

                                                <div className="palette-option1">
                                                    <select className="font-list">
                                                        <option>Arial</option>
                                                        <option>Calibri</option>
                                                        <option>Times New Roman</option>
                                                    </select>
                                                </div>
                                                <div className="palette-option1">
                                                    <select className="font-list">
                                                        <option>8</option>
                                                        <option>9</option>
                                                        <option>10</option>
                                                    </select>
                                                </div>
                                                <div className="palette-option1">
                                                    <ToggleButton value="bold" aria-label="bold" size="small" id="fnt-style">
                                                        <FormatBoldIcon onClick={this.handleButtonClick} />
                                                    </ToggleButton>
                                                </div>
                                                <div className="palette-option1">
                                                    <ToggleButton value="italic" aria-label="italic" size="small" id="fnt-style">
                                                        <FormatItalicIcon onClick={this.handleButtonClickItalic} />
                                                    </ToggleButton>
                                                </div>
                                                <div className="palette-option1">
                                                    <ToggleButton value="underlined" aria-label="underlined" size="small" id="fnt-style">
                                                        <FormatUnderlinedIcon onClick={this.handleButtonClickUnderline} />
                                                    </ToggleButton>
                                                </div>
                                                <div className="palette-option1">
                                                    <ToggleButton value="highlight" aria-label="highlight" size="small" id="fnt-style">
                                                        <BorderColorIcon />
                                                    </ToggleButton>
                                                </div>
                                                <div className="palette-option1">
                                                    <ToggleButton value="colortext" aria-label="colortext" size="small" id="fnt-style">
                                                        <FormatColorTextIcon />
                                                    </ToggleButton>
                                                </div>
                                                <div className="palette-option1">
                                                    <ToggleButton value="listbulleted" aria-label="listbulleted" size="small" id="fnt-style">
                                                        <FormatListBulletedIcon />
                                                    </ToggleButton>
                                                </div>
                                                <div className="palette-option1">
                                                    <ToggleButton value="listnumbered" aria-label="listnumbered" size="small" id="fnt-style">
                                                        <FormatListNumberedIcon />
                                                    </ToggleButton>
                                                </div>
                                                <div className="palette-option1">
                                                    <ToggleButton value="indentincrease" aria-label="indentincrease" size="small" id="fnt-style">
                                                        <FormatIndentIncreaseIcon />
                                                    </ToggleButton>
                                                </div>
                                                <div className="palette-option1">
                                                    <ToggleButton value="indentdecrease" aria-label="indentdecrease" size="small" id="fnt-style">
                                                        <FormatIndentDecreaseIcon />
                                                    </ToggleButton>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>



            </>



        )
    }
}
