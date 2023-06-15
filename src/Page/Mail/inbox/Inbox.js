import React, { Component } from 'react'
import _ from 'lodash';
import {
    Grid, Container, Box, Tabs, Tab, Paper, IconButton, InputBase, Divider,
    Card, CardHeader, CardContent, Typography, CardActions, Chip, Popover,
    MenuList, MenuItem, ListItemIcon, ListItemText, Fade, CircularProgress,
    Accordion, AccordionSummary, AccordionDetails, Avatar
} from '@mui/material';
import moment from 'moment';
import FileSaver from 'file-saver';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import Email from '../Resources/images/firstemail.png'
import Mail_write from '../Resources/images/new_email.png'
import inbox from '../Resources/images/inbox_second.png'
import drafts from '../Resources/images/draft_new.jpg'
import sentitems from '../Resources/images/dm.png'
import deleteitems from '../Resources/images/trash.png'
import avatar from '../Resources/images/imageicon1.png'
import search from '../Resources/images/search.png'
import reply from '../Resources/images/reply2.png'
import replyall from '../Resources/images/replyall.png'
import forward from '../Resources/images/forward.png'
import pdf from '../Resources/images/pdf.png'
import txt from '../Resources/images/txt.png'
import word from '../Resources/images/word.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import parse from 'html-react-parser';
import '../Resources/css/email.css';
import '../Resources/css/images.css';
import '../Resources/css/util.css';

import SidebarComp from "./SidebarComb"
import Navbar from "../../../components/navbar-components/Navbar";
import Sidebar from "../../../components/sidebar-components/Sidebar";

export default class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameObj: { 'first': 'Belvin' },
            name: 'Bell ',
            inboxContent: {},
            inboxContentAttchment: props.InboxEmailContent,
            inboxContentBody: props.InboxEmailBody,
            inboxDataList: []
        };
    }

    componentDidMount() {
        this.props.InboxList()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.InboxEmailContent, this.props.InboxEmailContent)) {
            this.setState({ inboxContentAttchment: this.props.InboxEmailContent })
        }
        if (!_.isEqual(prevProps.InboxEmailBody, this.props.InboxEmailBody)) {
            this.setState({ inboxContentBody: this.props.InboxEmailBody })
        }
    }

    handleClick = (value) => {
        if (!_.isEmpty(value)) {
            let obj = {
                'id': value._id
            }
            this.setState({ inboxContent: value, inboxContentAttchment: {}, inboxContentBody: '' })
            this.props.InboxMailShow(obj)
        }
        // Moment.globalFormat.titleFormat="D MMM YYYY";       
    }

    openActionView = (e, value) => {
        this.setState({ actionView: true, anchorEl: e.currentTarget, valueIndex: value })
    }
    closeActionView = () => {
        this.setState({ actionView: false, anchorEl: null, valueIndex: {} })
    }

    downloadDoc = () => {
        const { valueIndex } = this.state
        if (!_.isEmpty(valueIndex)) {
            let obj = {
                'url': valueIndex.url,
                'extension': valueIndex.extension
            }
            this.props.DownloadAttachment(obj, valueIndex.filename)


            // let file = 'https://gway.release.inaipi.ae/email/files/download/file_53264.xlsx'
            // FileSaver.saveAs(file,'name.txt');


            // const link = document.createElement('a');
            // link.href = 'https://gway.release.inaipi.ae/email/files/download/file_53264.xlsx';
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);

            // const url = 'https://gway.release.inaipi.ae/email/files/download/file_53264.xlsx'
            // url.blob().then(function (myBlob) {
            //     window.URL = window.webkitURL || window.URL;
            //     var a = document.createElement('a');
            //     a.href = window.URL.createObjectURL(myBlob);
            //     a.download = "name.xlsx"
            //     a.click();
            //  });
        }
    }
    openDocument = () => {
        const { valueIndex } = this.state
        if (!_.isEmpty(valueIndex)) {
            // window.open('https://www.codexworld.com', '_blank');
            window.open(valueIndex.url, '_blank');
        }
    }

    EmailAttachmentContent(data) {
        const imageFormat = ['png', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'svg', 'gif']
        if (!_.isEmpty(data.attachments)) {
            return (
                <>
                    <Grid container spacing={1}>
                        {_.map(_.filter(data.attachments, { 'location': 'attachment' }), (val, i) => {
                            if (imageFormat.includes(val.location)) {
                                return (
                                    <Grid item xs={3}>
                                        <div className="attachment_container">
                                            <img src={val.url} alt="Avatar" className="image_attachment" />
                                            <div class="attachment_overlay">
                                                <div class="attachment_text">{val.filename}<span className='float-r'> <IconButton className='text-white' onClick={(e) => this.openActionView(e, val)} > <ExpandMoreIcon /> </IconButton>  </span></div>
                                            </div>
                                        </div>
                                    </Grid>
                                )
                            }
                        })}
                    </Grid>

                    <Grid container spacing={1}>
                        {_.map(_.filter(data.attachments, { 'location': 'attachment' }), (val, i) => {
                            if (!imageFormat.includes(val.location)) {
                                return (
                                    <Grid item xs={4}>
                                        <Paper >
                                            <MenuItem >
                                                <ListItemIcon className='attachment_Preview_image'>
                                                    <img src={(val.extension === 'pdf') ? pdf : ((val.extension === 'docx') ? word : ((val.extension === 'xls') ? word : txt))} height='20px' weight='20px' />
                                                </ListItemIcon>
                                                <ListItemText className='attachment_el_text'>{val.filename}</ListItemText>
                                                <Typography variant="body2" color="text.secondary">
                                                    <IconButton onClick={(e) => this.openActionView(e, val)}  > <ExpandMoreIcon /> </IconButton>
                                                </Typography>
                                            </MenuItem>
                                        </Paper>
                                    </Grid>
                                )
                            }
                        })}
                    </Grid>
                </>
            )

        }
    }

    render() {
        const { InboxDataList } = this.props;
        const { inboxContent, actionView, anchorEl, inboxContentAttchment, inboxContentBody } = this.state
        let processedHtml = ''
        if (inboxContentBody) {
            processedHtml = inboxContentBody.replace(/\s+/g, ' ').trim();
        }


        return (
            <>
                <div>
                    <Sidebar />
                </div>
                <Navbar />
                <div className='row mx-5' style={{ backgroundColor: "#ffffff" }}>
                    <div className='col-md-1' >
                        <SidebarComp />
                    </div>

                    <div className='col-md-11'>
                        <div className="email-app card-margin">
                            <div className="rowtwo" id="rowtwo">
                                <div className="email-list-wrapper">
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
                                            <ul className="email-list">
                                                {_.map(InboxDataList, (val, i) => {
                                                    return (
                                                        <li key={i} className="email-list-item" onClick={() => this.handleClick(val)}>
                                                            <img src={avatar} alt="Profile Picture" />
                                                            <div className="email-content">
                                                                <div className="recipient">
                                                                    <div className="recipient-name">{val.fromList}</div>
                                                                </div>
                                                                <div href="#" className="email-subject">{val.subject}</div>
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
                                                                <span className="email-time">{moment(val.receivedTime).format('M/D/YYYY h:mm A')}</span>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                <div className="email-desc-wrapper">
                                    <div className="title-subject">
                                        <h6>{inboxContent.subject}</h6>
                                    </div>
                                    <Accordion>
                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            <Typography>
                                                <div className="email-header">
                                                    <img src={avatar} alt="Profile Picture" />
                                                    <div className="address">
                                                        <p className="recipient" id="from"> {inboxContent.fromList} </p>
                                                        <p className="recipient" id="to"><span>To:{inboxContent.toList}</span></p>
                                                        {inboxContent.ccList ?
                                                            <p className="recipient" id="cc"><span>Cc:{inboxContent.ccList}</span></p> : null}
                                                        <p className="recipient" id="date">
                                                            <span><h6>{moment(inboxContent.receivedTime).format('MMMM Do YYYY, h:mm A')}</h6></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {!_.isEmpty(inboxContentAttchment) ?
                                                this.EmailAttachmentContent(inboxContentAttchment)
                                                : null}
                                            <Typography>
                                                <div className="mailcontent">
                                                    <div className="email-body" >
                                                        {parse(processedHtml)}
                                                    </div>
                                                    <div className="email-action">
                                                        <button className="btn btn-base"> <img src={reply} /> Reply &nbsp;</button>
                                                        <button className="btn btn-base"> <img src={replyall} /> Reply All &nbsp;</button>
                                                        <button className="btn btn-base"> <img src={forward} /> Forward</button>
                                                    </div>
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                                <Popover id='simple-popover' open={actionView} anchorEl={anchorEl} onClose={this.closeActionView}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Paper sx={{ width: 200, maxWidth: '100%' }}>
                                        <MenuList>
                                            <MenuItem onClick={this.openDocument}>
                                                <ListItemIcon>
                                                    <VisibilityIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>Preview</ListItemText>
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={this.downloadDoc}>
                                                <ListItemIcon>
                                                    <DownloadIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>Download</ListItemText>
                                            </MenuItem>
                                            <Divider />
                                        </MenuList>
                                    </Paper>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

