import FileSaver from 'file-saver';
import {
  SET_SELECTED_COLOR,
  SEND_MESSAGE,
  SHOW_ERROR_ALERT,
  SET_ERROR_DATA,
  SET_UPLOADED_FILE,
  SET_SELECTED_USERNAME,
  SET_SELECTED_EMAIL,
  SET_SELECTED_MOBILE,
  SET_CHAT_ID,
  SET_CHAT_DURATION,
  SET_SELECTED_USERIMAGE,
  TOOGLE_CHAT,
  REFRESH_TOOGLE_CHAT,
  CONF_CHAT_REFRESH,
  INTERNAL_CHAT_REFRESH,
  CHAT_DATA,
  CHAT_DATA_FOR_INTERNAL,
  INTERNAL_CHAT_NOTIFY,
  ONLOAD_CONTACT_REFRESH,
  TYPE_CHAT,
  CHAT_MESSAGE,
  SET_CONTACT_LIST,
  SET_CONTACT_LIST1,
  SET_INTERNAL_EXTERNAL,
  SET_CONTACT_LIST2,
  SET_AGENT_LIST,
  SET_CONF_NOTIFI,
  SET_CONF_NOTIFI_VAL,
  SET_AGENT_AVAIL,
  SET_LOADMORE,
  SET_ADD_TOPIC_INPUT,
  SET_ADD_TOPIC_TOGGLE,
  SET_SELECTED_WHATSAPP,
  SET_SELECTED_FACEBOOK,
  SET_SELECTED_TWITTER,
  SET_SELECTED_TEAMS,
  SET_SELECTED_COMPANY,
  SET_SELECTED_ADDRESS,
  SET_SELECTED_ID,
  SET_EXTERNAL_CHAT_DATA,
  SET_MESSAGE,
} from "./type";

import {FETCH_INBOX_LIST, FETCH_MAIL_CONTENET, DOWNLOAD_MAIL_ATTACHMENT}  from '../../Page/Mail/appList';
import _ from 'lodash';

export const setavailagent = (val) => (dispatch) => {
  dispatch({ type: SET_AGENT_AVAIL, val });
};
export const settogglechat = (val) => (dispatch) => {
  dispatch({ type: TOOGLE_CHAT, val });
};
export const setloadmore = (val) => (dispatch) => {
  dispatch({ type: SET_LOADMORE, val });
};
export const setrefreshtogglechat = (val) => (dispatch) => {
  dispatch({ type: REFRESH_TOOGLE_CHAT, val });
};
export const setconfchatrefresh = (val) => (dispatch) => {
  dispatch({ type: CONF_CHAT_REFRESH, val });
};
export const setinternalchatrefresh = (val) => (dispatch) => {
  dispatch({ type: INTERNAL_CHAT_REFRESH, val });
};
export const setchatdata = (val) => (dispatch) => {
  dispatch({ type: CHAT_DATA, val });
};
export const setchatdataforinternal = (val) => (dispatch) => {
  dispatch({ type: CHAT_DATA_FOR_INTERNAL, val });
};
export const setinternalchatnotify = (val) => (dispatch) => {
  dispatch({ type: INTERNAL_CHAT_NOTIFY, val });
};
export const setonloadContactRefresh = (val) => (dispatch) => {
  dispatch({ type: ONLOAD_CONTACT_REFRESH, val });
};

export const setchatid = (val) => (dispatch) => {
  dispatch({ type: SET_CHAT_ID, val });
};
export const setcontactlist = (val) => (dispatch) => {
  dispatch({ type: SET_CONTACT_LIST, val });
};
export const setAgentList = (val) => (dispatch) => {
  dispatch({ type: SET_AGENT_LIST, val });
};
export const setConferenceNotification = (val) => (dispatch) => {
  dispatch({ type: SET_CONF_NOTIFI, val });
};
export const setConferenceNotificationVal = (val) => (dispatch) => {
  dispatch({ type: SET_CONF_NOTIFI_VAL, val });
};
export const setinternalexternal = (val) => (dispatch) => {
  dispatch({ type: SET_INTERNAL_EXTERNAL, val });
};
export const setcontactlist1 = (val) => (dispatch) => {
  dispatch({ type: SET_CONTACT_LIST1, val });
};
export const setcontactlist2 = (val) => (dispatch) => {
  dispatch({ type: SET_CONTACT_LIST2, val });
};
export const setchatduration = (val) => (dispatch) => {
  dispatch({ type: SET_CHAT_DURATION, val });
};
export const setchatmessage = (val) => (dispatch) => {
  dispatch({ type: CHAT_MESSAGE, val });
};
export const setchattype = (val) => (dispatch) => {
  dispatch({ type: TYPE_CHAT, val });
};
export const setselectedusername = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_USERNAME, val });
};
export const setselectedemail = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_EMAIL, val });
};
export const setselectedmobile = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_MOBILE, val });
};
export const setselecteduserimage = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_USERIMAGE, val });
};
export const sendMessage = (val) => (dispatch) => {
  dispatch({ type: SEND_MESSAGE, val });
};
export const toggleErrorAlert = (val) => (dispatch) => {
  dispatch({ type: SHOW_ERROR_ALERT, val });
};
export const setErrorData = (val) => (dispatch) => {
  dispatch({ type: SET_ERROR_DATA, val });
};
export const setUploadedFile = (val) => (dispatch) => {
  console.log("setUploadedFile");
  console.log(val);
  dispatch({ type: SET_UPLOADED_FILE, val });
};
export const setSelectedColor = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_COLOR, val });
};
export const setAddTopicInput = (val) => (dispatch) => {
  dispatch({ type: SET_ADD_TOPIC_INPUT, val });
};
export const setAddTopicToggle = (val) => (dispatch) => {
  dispatch({ type: SET_ADD_TOPIC_TOGGLE, val });
};
export const setselectedwhatsapp = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_WHATSAPP, val });
};
export const setselectedfacebook = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_FACEBOOK, val });
};
export const setselectedtwitter = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_TWITTER, val });
};
export const setselectedteams = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_TEAMS, val });
};
export const setselectedcompany = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_COMPANY, val });
};
export const setselectedadress = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_ADDRESS, val });
};
export const setselectedid = (val) => (dispatch) => {
  dispatch({ type: SET_SELECTED_ID, val });
};
export const setExternalChatData = (val) => (dispatch) => {
  dispatch({ type: SET_EXTERNAL_CHAT_DATA, val });
};
export const setMessage = (val) => (dispatch) => {
  dispatch({ type: SET_MESSAGE, val });
};



/**Email Channel Actions  */
export function InboxList(){
  return (dispatch) => {
    dispatch(EmailIsPending())
    let myHeaders = new Headers();
    //myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    let requestOptions = {
      method: 'GET',
      // mode: 'no-cors',
      // body: "",
      headers: myHeaders,
      // redirect: 'follow'
    };
    fetch(FETCH_INBOX_LIST, requestOptions)
    .then((res) => res.json())
        .then((json) =>{     
            dispatch(InboxListSuccess(json))
        })
        .catch((error) =>{
          dispatch(InboxErrorMessage(error, 'red'))   
        })   
      }
}
export function InboxListSuccess(data){
    return{
      type:'INBOX_MAIL_LIST_GET_SUCCESS',
      InboxDataList:data.Email,
      emaiIsPending:false,     
    }  
}

export function InboxMailShow(obj){
  return (dispatch) => {
    dispatch(EmailIsPending())
    let myHeaders = new Headers();
    //myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    let data = JSON.stringify(obj)
    let requestOptions = {
      method: 'POST',
      // mode: 'no-cors',
      body: data,
      headers: myHeaders,
      // redirect: 'follow'
    };
    fetch(FETCH_MAIL_CONTENET, requestOptions)
    .then((res) => res.json())
        .then((json) =>{     
            dispatch(InboxMailSuccess(json))
        })
        .catch((error) =>{       
            dispatch(InboxErrorMessage(error, 'red'))    
        })   
      }
}
export function InboxMailSuccess(data){
    return{
      type:'INBOX_MAIL_CONTENT_SUCCESS',
      InboxEmailContent:data.Email,
      InboxEmailBody:data.EmailBody,
      emaiIsPending:false,     
    }  
}

export function DownloadAttachment(obj, fileName){
  return (dispatch) => {
    dispatch(EmailIsPending())
    let myHeaders = new Headers();
    // myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    let data = JSON.stringify(obj)
    let requestOptions = {
      method: 'POST',
      // mode: 'no-cors',
      body: data,
      headers: myHeaders,
      // redirect: 'follow'
    };
    fetch(DOWNLOAD_MAIL_ATTACHMENT, requestOptions)
    .then((res) => res.json())
        .then((json) =>{  
          console.log("Dow Res",json)   
          if (json.status == true) {
            setTimeout(() => {
              let file =  `https://gway.release.inaipi.ae/email/files${json.downloadFile}`
              FileSaver.saveAs(file.toString(), fileName);
            }, 2000);
          } 
        })
        .catch((error) =>{
          dispatch(InboxErrorMessage(error, 'red'))    
        })   
      }
}

export function EmailIsPending(){
    return{
      type:'INBOX_PENDING',
      emaiIsPending:true
    }
}
export function InboxErrorMessage(data, color){
  return {
      type:'INBOX_FAILED',
      emailMessage:!_.isEmpty(data) ? data.message :'',
      isPending:false,
      emailShowMessage:true,
      emailShowColor:typeof color !== 'undefined' ? color: 'green'
  }
}
export function InboxErrorMessageClose(){
    return {
        type:'INBOX_FAILED_CLOSE',
        emailShowMessage:false,
        emailMessage:''
    }
}

/***************************** */