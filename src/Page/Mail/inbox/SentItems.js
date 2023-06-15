import React, { Component } from 'react'
import avatar from '../Resources/images/imageicon1.png';
import reply from '../Resources/images/reply2.png'
import replyall from '../Resources/images/replyall.png'
import forward from '../Resources/images/forward.png'
import '../Resources/css/email.css'
import '../Resources/css/images.css'
import SidebarComp from './SidebarComb';
import Navbar from "../../../components/navbar-components/Navbar";
import Sidebar from "../../../components/sidebar-components/Sidebar";
export default class SentItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
             nameObj  : {'first':'Belvin'},
             name : 'Bell '
        };
      }      
    
  render() {
    const {InboxDataList} = this.props;
      return (

        <>
            <div>
                <Sidebar />
            </div>
            <Navbar />
            <div className='row mx-5' style={{backgroundColor:"#ffffff"}}>
                <div className='col-md-1'>
                    <SidebarComp/>
                </div>
                <div className='col-md-11' >
                    <div className='side-margin'>
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
                                            <li className="email-list-item">
                                                <img src={avatar} alt="Profile Picture" />
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
                                                <img src={avatar} alt="Profile Picture" />
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

                                                            {/*<path
                                                            d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48">
                                                        </path>*/}

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

                                                            {/*<path
                                                            d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48">
                                                        </path>*/}

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

                                                            {/*<path
                                                            d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48">
                                                        </path>*/}

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

                                                            {/*<path
                                                            d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48">
                                                        </path>*/}

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

                                                            {/*<path
                                                            d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48">
                                                        </path>*/}

                                                        </a>
                                                    </div>
                                                    <span className="email-time">11:50 AM</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="email-desc-wrapper">
                                <>
                                    <div className="title-subject">
                                        {/* <div style="padding-left: 1rem;"> */}
                                        <h6>Test Mail</h6>
                                        {/* </div> */}
                                    </div>
                                    <div className="mailcontent">
                                        <div className="email-header">
                                            <img src={avatar} alt="Profile Picture" />
                                            <div className="address">
                                                <p className="recipient"> Paul Smith </p>
                                                <p className="recipient"><span>To:</span> Account User &lt;acct.user@gmail.com&gt;</p>
                                                <div className="recipient">Dec 1, 2019 12:02 PM</div>

                                            </div>
                                        </div>
                                        &nbsp;
                                        <div className="email-body">
                                            <p>Hi Account User,</p>
                                            <p>
                                                Today we turned up the last chapter from our management program offered by JCCP held in Tokya Japan.
                                            </p>
                                            <p>
                                                The program under the title showed us the plan for energy transistion and decarbonization
                                            </p>
                                            <p>
                                                Thanks &amp; Regards <br />
                                                Paul Smith
                                            </p>
                                        </div>
                                        <div className="email-action">
                                            <button className="btn btn-base"> <img src={reply} /> Reply &nbsp;</button>
                                            <button className="btn btn-base"> <img src={replyall} /> Reply All &nbsp;</button>
                                            <button className="btn btn-base"> <img src={forward} /> Forward</button>
                                        </div>
                                    </div>
                                    {/* {InboxDataList ?
                        <InboxDataList tableDataList={InboxDataList} actions={this.props}  />
                        :null} */}
                                </>
                                
                                <>
                                <div className="title-subject">
                                    {/* <div style="padding-left: 1rem;"> */}
                                    {/* <h6>Email Management</h6> */}
                                    {/* </div> */}
                                </div>
                                <div className="mailcontent">
                                    <div className="email-header">
                                        <img src={avatar} alt="Profile Picture" />
                                        <div className="address">
                                            <p className="recipient"> Jim Ward </p>
                                            <p className="recipient"><span>To:</span> Account User &lt;acct.user@gmail.com&gt;</p>
                                            <div className="recipient">Nov 30, 2019 5:10 PM</div>

                                        </div>
                                    </div>
                                    &nbsp;
                                    <div className="email-body">
                                        <p>Hi Account User,</p>
                                        <p>
                                            Today we turned up the last chapter from our management program offered by JCCP held in Tokya Japan.
                                        </p>
                                        <p>
                                            The program under the title showed us the plan for energy transistion and decarbonization
                                        </p>
                                        <p>
                                            Thanks &amp; Regards <br />
                                            Jim Ward
                                        </p>
                                    </div>
                                    {/* <div className="email-action">
                                        <button className="btn btn-base"> <img src={reply} /> Reply &nbsp;</button>
                                        <button className="btn btn-base"> <img src={replyall} /> Reply All &nbsp;</button>
                                        <button className="btn btn-base"> <img src={forward} /> Forward</button>
                                    </div> */}
                                </div>
                                {/* {InboxDataList ?
                        <InboxDataList tableDataList={InboxDataList} actions={this.props}  />
                        :null} */}
                            </>
                            <>
                                <div className="title-subject">
                                    {/* <div style="padding-left: 1rem;"> */}
                                    {/* <h6>Email Management</h6> */}
                                    {/* </div> */}
                                </div>
                                <div className="mailcontent">
                                    <div className="email-header">
                                        <img src={avatar} alt="Profile Picture" />
                                        <div className="address">
                                            <p className="recipient"> Pepper </p>
                                            <p className="recipient"><span>To:</span> Account User &lt;acct.user@gmail.com&gt;</p>
                                            <div className="recipient">Nov 30, 2019 5:10 PM</div>

                                        </div>
                                    </div>
                                    &nbsp;
                                    <div className="email-body">
                                        <p>Hi Account User,</p>
                                        <p>
                                            Today we turned up the last chapter from our management program offered by JCCP held in Tokya Japan.
                                        </p>
                                        <p>
                                            The program under the title showed us the plan for energy transistion and decarbonization
                                        </p>
                                        <p>
                                            Thanks &amp; Regards <br />
                                            Pepper
                                        </p>
                                    </div>
                                    {/* <div className="email-action">
                                        <button className="btn btn-base"> <img src={reply} /> Reply &nbsp;</button>
                                        <button className="btn btn-base"> <img src={replyall} /> Reply All &nbsp;</button>
                                        <button className="btn btn-base"> <img src={forward} /> Forward</button>
                                    </div> */}
                                </div>
                                {/* {InboxDataList ?
                        <InboxDataList tableDataList={InboxDataList} actions={this.props}  />
                        :null} */}
                            </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
  }
}
