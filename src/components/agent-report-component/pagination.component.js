import React from "react";
import { Pagination } from "@mui/material";

const pagination = (props) => {
  return (
    <>
      <div className="mt-3 mb-3">
        <Pagination
          count={Math.ceil(props.pagination / 5)}
          page={props.page}
          color="info"
          shape="rounded"
          type="number"
          style={{ float: "right" }}
          onChange={props.handleChange}
        />
      </div>
    </>
  );
};

export default pagination;
