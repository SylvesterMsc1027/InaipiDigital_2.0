import React from "react";
import { Routes, Route } from "react-router-dom";
import store from "../src/redux/store";
import { Provider } from "react-redux";
import Login from "../src/Page/login/Login";
import Dashboard from "../src/Page/Dashboard/Dashboard";
import Chat from "../src/Page/Chat/Chat";
import SessioReports from "../src/Page/SessionReports/SessionReports";
import AgentReports from "../src/Page/AgentReports/AgentReport";
import Calenders from "../src/Page/Calenders/Calender";
import Contacts from "../src/Page/Contacts/Contacts";
import DashboardContainer from "../src/Page/Mail/Dashboard/DashboardContainer";
import InboxContainer from "../src/Page/Mail/inbox/InboxContainer";
import NewEmailContainer from "../src/Page/Mail/inbox/NewEmailContainer";
import SentItemsContainer from "../src/Page/Mail/inbox/SentItemsContainer";
import Main from "./Page/Main/Main";
import BankPage from "./Page/BankPage/BankPage";
import PowerBi from "./Page/PowerBi/PowerBi";
import PowerBiDashboard from "./Page/PowerBi Dashboard/PowerBiDashboard";


const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="BankPortal" element={<BankPage />} />
        <Route path="/main" element={<Main />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Chat" element={<Chat />} />
          <Route path="SessioReports" element={<SessioReports />} />
          <Route path="AgentReports" element={<AgentReports />} />
          <Route path="Calenders" element={<Calenders />} />
          <Route path="Contacts" element={<Contacts />} />
          <Route path="mail" element={<DashboardContainer />} />
          <Route path="inbox" element={<InboxContainer />} />
          <Route path="newemail" element={<NewEmailContainer />} />
          <Route path="sentitems" element={<SentItemsContainer />} />
          <Route path="powerBi" element={<PowerBi />} />
          <Route path="powerBiDashboard" element={<PowerBiDashboard />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
