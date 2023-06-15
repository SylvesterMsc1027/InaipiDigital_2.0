import React from "react";
import SideBarMenu from "./SideBar-menu.component";

const Sidebar = () => {
  let agentRole = JSON.parse(localStorage.getItem("tokenAgent"));
  let permission = JSON.parse(localStorage.getItem("permission"));

  return (
    <>
      {agentRole.role == "Supervisor" ? (
        <aside className="aside_left animate__animated" style={{ zIndex: 1 }}>
          <div className="logo-aside">
            <a href="#">
              <img src="#" alt="" />
            </a>
          </div>
          <nav className="navbar navbar-nav side-nav  pt-0 w-100">
            <ul className="navbar-nav w-100" style={{ marginLeft: "0px" }}>
              {permission.find(
                (element) => element.moduleName === "Dashboard"
              ) ? (
                <SideBarMenu
                  title={"Dashboard"}
                  pages={"/main/Dashboard"}
                  value={"grid_view"}
                />
              ) : (
                ""
              )}

              {permission.find((element) => element.moduleName === "Chat") ? (
                <SideBarMenu
                  title={"Chat"}
                  pages={"/main/Chat"}
                  value={"sms"}
                />
              ) : (
                ""
              )}

              {permission.find(
                (element) => element.moduleName === "Sessionreport"
              ) ? (
                <SideBarMenu
                  title={"Sessionreport"}
                  pages={"/main/SessioReports"}
                  value={"leaderboard"}
                />
              ) : (
                ""
              )}

              {permission.find(
                (element) => element.moduleName === "Agentreport"
              ) ? (
                <SideBarMenu
                  title={"Agentreport"}
                  pages={"/main/AgentReports"}
                  value={"table_chart"}
                />
              ) : (
                ""
              )}

              {permission.find(
                (element) => element.moduleName === "Calender"
              ) ? (
                <SideBarMenu
                  title={"Calender"}
                  pages={"/main/Calenders"}
                  value={"calendar_month"}
                />
              ) : (
                ""
              )}

              {permission.find(
                (element) => element.moduleName === "Contact"
              ) ? (
                <SideBarMenu
                  title={"Contact"}
                  pages={"/main/Contacts"}
                  value={"person"}
                />
              ) : (
                ""
              )}
              {permission.find(
                (element) => element.moduleName === "powerBi"
              ) ? (
                <SideBarMenu
                  title={"powerBi"}
                  pages={"/main/powerBi"}
                  value={"signal_cellular_alt"}
                />
              ) : (
                ""
              )}
              {permission.find(
                (element) => element.moduleName === "PowerBiDashboard"
              ) ? (
                <SideBarMenu
                  title={"PowerBiDashboard"}
                  pages={"/main/powerBiDashboard"}
                  value={"signal_cellular_alt"}
                />
              ) : (
                ""
              )}
            </ul>
          </nav>
        </aside>
      ) : (
        <aside className="aside_left animate__animated " style={{ zIndex: 1 }}>
          <div className="logo-aside">
            <a href="#">
              <img src="#" alt="" />
            </a>
          </div>
          <nav className="navbar navbar-nav side-nav pt-0 w-100">
            <ul className="navbar-nav w-100" style={{ marginLeft: "0px" }}>
              {permission.find(
                (element) => element.moduleName === "Dashboard"
              ) ? (
                <SideBarMenu
                  title={"Dashboard"}
                  pages={"/main/Dashboard"}
                  value={"grid_view"}
                />
              ) : (
                ""
              )}

              {permission.find((element) => element.moduleName === "Chat") ? (
                <SideBarMenu
                  title={"Chat"}
                  pages={"/main/Chat"}
                  value={"sms"}
                />
              ) : (
                ""
              )}

              {permission.find(
                (element) => element.moduleName === "Sessionreport"
              ) ? (
                <SideBarMenu
                  title={"Sessionreport"}
                  pages={"/main/SessioReports"}
                  value={"leaderboard"}
                />
              ) : (
                ""
              )}

              {permission.find(
                (element) => element.moduleName === "Calender"
              ) ? (
                <SideBarMenu
                  title={"Calender"}
                  pages={"/main/Calenders"}
                  value={"calendar_month"}
                />
              ) : (
                ""
              )}

              {permission.find(
                (element) => element.moduleName === "Contact"
              ) ? (
                <SideBarMenu
                  title={"Contact"}
                  pages={"/main/Contacts"}
                  value={"person"}
                />
              ) : (
                ""
              )}

              {permission.find((element) => element.moduleName === "Mail") ? (
                <SideBarMenu
                  title={"mail"}
                  pages={"/main/mail"}
                  value={"mail"}
                />
              ) : (
                ""
              )}

              {permission.find(
                (element) => element.moduleName === "powerBi"
              ) ? (
                <SideBarMenu
                  title={"powerBi"}
                  pages={"/main/powerBi"}
                  value={"signal_cellular_alt"}
                />
              ) : (
                ""
              )}
              {permission.find(
                (element) => element.moduleName === "PowerBiDashboard"
              ) ? (
                <SideBarMenu
                  title={"PowerBiDashboard"}
                  pages={"/main/PowerBiDashboard"}
                  value={"signal_cellular_alt"}
                />
              ) : (
                ""
              )}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
