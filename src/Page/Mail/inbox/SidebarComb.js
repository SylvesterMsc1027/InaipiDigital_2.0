import React from 'react'
import { CTooltip } from "@coreui/react";
import Email from '../Resources/images/firstemail.png'
import Mail_write from '../Resources/images/new_email.png'
import inbox from '../Resources/images/inbox_second.png'
import drafts from '../Resources/images/draft_new.jpg'
import sentitems from '../Resources/images/dm.png'
import deleteitems from '../Resources/images/trash.png'
import junkemail from '../Resources/images/error.png'
import { Link } from 'react-router-dom';
import '../Resources/css/email.css';
import '../Resources/css/images.css';


const SidebarComp = () => {
    return (
        < >

            <div className="email-toolbars-wrapper sidenav" id="mySidenav" style={{width: '5rem', height: '100vh'}}>
                <div className="toolbar-header">

                    <input type="text" placeholder="Search.." name="search2" className="form-control rounded-pill mt-3" />

                </div>
                <div className="toolbar-body" >

                    <ul className="toolbar-menu" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>


                        <li className="active">

                            <Link to='/main/mail'>
                                <CTooltip content="Mail" placement="right">
                                    <img src={Email} eight='40px' width='40px' />
                                </CTooltip>
                            </Link>


                        </li>
                        <li>



                            <Link to='/main/newemail'>
                                <CTooltip content="New Mail" placement="right">
                                    <img src={Mail_write} height='40px' width='40px' />
                                </CTooltip>
                            </Link>



                        </li>
                        <li>

                            <Link to='/main/inbox'>
                                <CTooltip content="Inbox" placement="right">

                                    <img src={inbox} eight='40px' width='40px' />
                                </CTooltip>

                            </Link>




                        </li>
                        <li>

                            <Link to='/main/drafts'>
                                <CTooltip content="Drafts" placement="right">

                                    <img src={drafts} eight='40px' width='40px' />
                                </CTooltip>

                            </Link>



                        </li>
                        <li>

                            <Link to='/main/sentitems'>
                                <CTooltip content="Sent Items" placement="right">
                                    <img src={sentitems} eight='40px' width='40px' />
                                </CTooltip>


                            </Link>



                        </li>
                        <li>

                            <Link to='/main/deleteitems'>
                                <CTooltip content="Delete Items" placement="right">

                                    <img src={deleteitems} eight='40px' width='40px' />
                                </CTooltip>

                            </Link>



                        </li>
                        <li>

                            <Link to='/main/junkemail'>
                                <CTooltip content="Junk Emails" placement="right">

                                    <img src={junkemail} eight='40px' width='40px' />
                                </CTooltip>

                            </Link>
                        </li>


                    </ul>

                </div>
            </div>
        </>
    )
}

export default SidebarComp