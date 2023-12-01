import React, { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

const Alert = () => {
  const { alert } = useContext(AlertContext);
  return (
    alert !== null && (
      <p className="flex items-start mb-2 space-x-2">
        <span>😁</span>
        <span className="flex-1 text-base font-semibold leading-7">
          <strong>{alert.msg}</strong>
        </span>
      </p>
    )
  );
};

export default Alert;
