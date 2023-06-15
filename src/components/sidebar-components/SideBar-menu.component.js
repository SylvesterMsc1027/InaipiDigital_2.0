import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const SideBarMenu = (props) => {
  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  const { pages, value, title } = props;
  return (
    <>
      <BootstrapTooltip title={title} arrow placement="right">
        <li className="nav-item">
          <NavLink
            to={`${pages}`}
            className={({ isActive, isPending }) =>
              isPending
                ? "side-a nav-link"
                : isActive
                ? "side-a nav-link active"
                : "side-a nav-link"
            }
          >
            <i
              className="material-symbols-outlined"
              onClick={() => {
                localStorage.setItem("ChatType", "External");
              }}
            >
              {value}
            </i>
          </NavLink>
        </li>
      </BootstrapTooltip>
    </>
  );
};

export default SideBarMenu;
