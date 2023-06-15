import { combineReducers } from 'redux';
import InboxReducer from '../Inbox/InboxReducer';


const appReducer = combineReducers({
    InboxReducer
});

const rootReducer = (state, action) => {  
    return appReducer(state, action);
}

export default rootReducer;