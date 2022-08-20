import styles from "./ResultsList.module.css";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ArrowDropDown";
import ChevronRightIcon from "@mui/icons-material/ArrowDropUp";

const DroppInfo = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.dropperWraper} onClick={(e) => e.stopPropagation()}>
      <div className={styles.dropper} onClick={() => setOpen(!open)}>
        {!open && <ChevronRightIcon />}
        {open && <ExpandMoreIcon />}
        <span>{title}</span>
      </div>
      <div className={styles.dropContent + " " + (open ? styles.dropContentOpen : "")}>{content}</div>
    </div>
  );
};

export default DroppInfo;
