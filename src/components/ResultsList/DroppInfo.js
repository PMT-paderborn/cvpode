import styles from "./ResultsList.module.css";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ArrowDropDown";
import ChevronRightIcon from "@mui/icons-material/ArrowDropUp";
import highlighter, { keyExists } from "../../utils/highliter";

const DroppInfo = ({ title, content, synonyme, searchKey }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(keyExists(searchKey, content + synonyme));
  }, []);

  return (
    <div className={styles.dropperWraper} onClick={(e) => e.stopPropagation()}>
      <div className={styles.dropper} onClick={() => setOpen(!open)}>
        {!open && <ChevronRightIcon />}
        {open && <ExpandMoreIcon />}
        {!synonyme && <span>{title}</span>}
        {synonyme && <span>HINWEISE/SYNONYME</span>}
      </div>
      <div className={styles.dropContent + " " + (open ? styles.dropContentOpen : "")}>
        {synonyme && (
          <div>
            <strong>HINWEISE:</strong>
            <br />
          </div>
        )}
        <span dangerouslySetInnerHTML={{ __html: highlighter(searchKey, content) }} />
        {synonyme && (
          <div>
            <br />
            <strong>SYNONYME:</strong>
            <br />
            <span dangerouslySetInnerHTML={{ __html: highlighter(searchKey, synonyme) }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DroppInfo;
