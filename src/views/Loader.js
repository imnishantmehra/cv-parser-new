import Spinner from "react-bootstrap/Spinner";
import React from "react";
function Loader() {
  return (
    <>
      <div className="loader-container">
        <Spinner
          style={{ color: "#405cf5" }}
          animation="border"
          role="status"
        />
      </div>
    </>
  );
}

export default Loader;
