import React, { useState } from "react";
import { Popover } from "@mui/material";

const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContainer, setPopoverContainer] = useState(null);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverContainer(event.currentTarget.parentNode);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const PopMenuWrapper = ({ children }) => {
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        container={popoverContainer}
      >
        {children}
      </Popover>
    );
  };

  return { id, openPopover, PopMenuWrapper, handleClosePopover };
};

export { usePopover };
