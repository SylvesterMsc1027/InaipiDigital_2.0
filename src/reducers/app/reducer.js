import {
  SEND_MESSAGE,
  TOGGLE_RECORDING,
  SET_UPLOADED_FILE,
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
  TYPE_CHAT,
  CHAT_MESSAGE,
  SET_CONTACT_LIST,
  SET_AGENT_LIST,
  SET_CONTACT_LIST1,
  SET_INTERNAL_EXTERNAL,
  SET_CONF_NOTIFI,
  SET_CONF_NOTIFI_VAL,
  ONLOAD_CONTACT_REFRESH,
  SET_CONTACT_LIST2,
  SET_AGENT_AVAIL,
  SET_SELECTED_COLOR,
  SET_LOADMORE,
  SET_SELECTED_USERNAME,
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
  SET_MESSAGE
} from "../../redux/actions/type";

const initialState = {
  externalChatData:[],
  spaceContent: [],
  availAgent:[],
  conferenceType: "",
  client: null,
  selecteduserimage: "",
  uploadedFile: [],
  chatid: "",
  chatduration: "",
  cannedMessage:[],
  showErrorAlert: false,
  errorMessage: "",
  errorData: "",
  showvideocallModal: false,
  internalchatnotify: false,
  onloadContactRefresh: true,
  recording: false,
  togglechat: false,
  refreshtogglechat: false,
  confchatrefresh: false,
  internalchatrefresh: false,
  chat: [],
  chatdataforinternal: [],
  chatType: "",
  chatMessage: [],
  contactList: [],
  contactList1: [],
  internalExternal: 0,
  contactList2: [],
  agentList: [],
  conferenceNotification: false,
  conferenceNotificationVal: "",
  usercolor:'',
  loadmoretoggle: false,
  addTopicInput:'',
  addTopicToggle: false,
  
  selectedusername: "",
  selectedemail: "",
  selectedmobile: "",
  selectedwhatsapp:'',
  selectedfacebook:'',
  selectedtwitter:'',
  selectedteams:'',
  selectedcompany:'',
  selectedaddress:'',
  selectedid:'',



  /** Message **/
  message : [],
  /** Message **/

  /**Email Channel Reducers Variables */
  emaiIsPending:false,
  emailShowMessage:false,
  emailMessage:"",
  emailShowColor:"",
  InboxDataList:[],
  InboxEmailContent:{},
  InboxEmailBody: "",
  NewEmailDataList:[],
  SentItemList:[],
  /***************** */
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
      case SEND_MESSAGE:
      return {
        ...state,
        cannedMessage: action.val,
      };
    case CHAT_DATA:
      return {
        ...state,
        chat: action.val,
      };
      case SET_AGENT_AVAIL:
        return {
          ...state,
          availAgent: action.val,
        };
      
    case CHAT_DATA_FOR_INTERNAL:
      return {
        ...state,
        chatdataforinternal: action.val,
      };
    case INTERNAL_CHAT_NOTIFY:
      return {
        ...state,
        internalchatnotify: action.val,
      };

    case ONLOAD_CONTACT_REFRESH:
      return {
        ...state,
        onloadContactRefresh: action.val,
      };
    case TYPE_CHAT:
      return {
        ...state,
        chatType: action.val,
      };
    case SET_CONTACT_LIST:
      return {
        ...state,
        contactList: action.val,
      };
    case SET_AGENT_LIST:
      return {
        ...state,
        agentList: action.val,
      };
    case SET_CONF_NOTIFI:
      return {
        ...state,
        conferenceNotification: action.val,
      };
    case SET_CONF_NOTIFI_VAL:
      return {
        ...state,
        conferenceNotificationVal: action.val,
      };
    case SET_INTERNAL_EXTERNAL:
      return {
        ...state,
        internalExternal: action.val,
      };
    case SET_CONTACT_LIST1:
      return {
        ...state,
        contactList1: action.val,
      };

    case SET_CONTACT_LIST2:
      return {
        ...state,
        contactList2: action.val,
      };
    case CHAT_MESSAGE:
      return {
        ...state,
        chatMessage: action.val,
      };
    case SET_SELECTED_EMAIL:
      return {
        ...state,
        selectedemail: action.val,
      };
    case SET_SELECTED_MOBILE:
      return {
        ...state,
        selectedmobile: action.val,
      };
    case SET_CHAT_ID:
      return {
        ...state,
        chatid: action.val,
      };
    case SET_CHAT_DURATION:
      return {
        ...state,
        chatduration: action.val,
      };
    case SET_SELECTED_USERIMAGE:
      return {
        ...state,
        selecteduserimage: action.val,
      }; 
       case TOGGLE_RECORDING: {
      return {
        ...state,
        recording: action.val,
      };
    }
     case SET_UPLOADED_FILE: {
      return {
        ...state,
        uploadedFile: [action.val],
      };
    } 
    case TOOGLE_CHAT: {
      return {
        ...state,
        togglechat: action.val,
      };
    }
    case SET_LOADMORE: {
      return {
        ...state,
        loadmoretoggle: action.val,
      };
    }
    case SET_SELECTED_USERNAME:
      return {
        ...state,
        selectedusername: action.val,
      };

    case REFRESH_TOOGLE_CHAT: {
      return {
        ...state,
        refreshtogglechat: action.val,
      };
    }
    case CONF_CHAT_REFRESH: {
      return {
        ...state,
        confchatrefresh: action.val,
      };
    }
    case INTERNAL_CHAT_REFRESH: {
      return {
        ...state,
        internalchatrefresh: action.val,
      };
    }
    case SET_SELECTED_COLOR: {
      return {
        ...state,
        usercolor: action.val,
      };
    }
    case SET_ADD_TOPIC_INPUT: {
      return {
        ...state,
        addTopicInput: action.val,
      };
    }
    case SET_ADD_TOPIC_TOGGLE: {
      return {
        ...state,
        addTopicToggle: action.val,
      };
    }
    case SET_SELECTED_WHATSAPP: {
      return {
        ...state,
        selectedwhatsapp: action.val,
      };
    }
    case SET_SELECTED_FACEBOOK: {
      return {
        ...state,
        selectedfacebook: action.val,
      };
    }
    case SET_SELECTED_TWITTER: {
      return {
        ...state,
        selectedtwitter: action.val,
      };
    }
    case SET_SELECTED_TEAMS: {
      return {
        ...state,
        selectedteams: action.val,
      };
    }
    case SET_SELECTED_COMPANY: {
      return {
        ...state,
        selectedcompany: action.val,
      };
    }
    case SET_SELECTED_ADDRESS: {
      return {
        ...state,
        selectedaddress: action.val,
      };
    }
    case SET_SELECTED_ID: {
      return {
        ...state,
        selectedid: action.val,
      };
    }
    case SET_EXTERNAL_CHAT_DATA: {
      return {
        ...state,
        externalChatData: action.val,
      };
    }
        case SET_MESSAGE: {
      return {
        ...state,
        message: action.val,
      };
    }

 /**Email Channel Reucer case */
 case 'INBOX_PENDING':
  return Object.assign({}, state, {
    emaiIsPending: action.emaiIsPending
  })
case 'INBOX_MAIL_LIST_GET_SUCCESS':
  return Object.assign({}, state, {      
    InboxDataList: action.InboxDataList,
    emaiIsPending: action.emaiIsPending,
  })
case 'INBOX_MAIL_CONTENT_SUCCESS':
  return Object.assign({}, state, {      
    InboxEmailContent: action.InboxEmailContent,
    InboxEmailBody: action.InboxEmailBody,
    emaiIsPending: action.emaiIsPending,
  })
case 'INBOX_FAILED':
  return Object.assign({}, state, {
    emailMessage: action.emailMessage,
    emailShowMessage: action.emailShowMessage,
    emaiIsPending: action.emaiIsPending,
    emailShowColor: action.emailShowColor
  })  
case "INBOX_FAILED_CLOSE":
  return Object.assign({}, state, {
    emailShowMessage: action.emailShowMessage,
    emailMessage: action.emailMessage
  })
/***************************** */

    default:
      return state;
  }
}
