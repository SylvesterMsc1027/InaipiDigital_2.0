import React from "react";

const Userlisttab = (props) => {
  return (
    <>
      <li className="nav-item" role="presentation">
        <button
          className={props.tabsproperties}
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
          onClick={() => {
            props.tabonchangehandler(`${props.value}`);
          }}
        >
          {props.value}
        </button>
      </li>
    </>
  );
};

export default Userlisttab;
