import "./Toast.css";
import React from "react";
import { FcOk, FcHighPriority } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";
import toast from "react-hot-toast";

const Toast = ({ id, msg, isSuccess }) => {
  const closeToast = () => {
    if (id) {
      toast.remove(id);
    }
  };

  return (
    <div className="toast-container flex-center pd-1x ">
      {isSuccess ? (
        <FcOk className="t3" />
      ) : (
        <span className="error-icon flex-center">
          <FcHighPriority className="t3" />
        </span>
      )}
      <p className="t4 toast-msg mg-left-2x">{msg}</p>
      <GrFormClose
        className="t3 mg-left-2x pointer toast-close"
        onClick={closeToast}
      />
    </div>
  );
};

export const callToast = (msg, isSuccess = true) => {
  toast.custom((toast) => (
    <Toast id={toast.id} msg={msg} isSuccess={isSuccess} />
  ));
};
