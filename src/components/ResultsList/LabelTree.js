import styles from "./ResultsList.module.css";
import { Box, Checkbox } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getCached } from "../../services/cacheService";
import highlighter from "../../utils/highliter";
import FixedTopParent from "./FixedTopParent";
import DroppInfo from "./DroppInfo";

const LabelTree = ({ item, handleCachedItem, caches, searchKey }) => {
  const [checked, setChecked] = useState(!!getCached(item.code));

  const handleCheckedItem = () => setChecked(handleCachedItem(item));

  const ref = useRef();

  useEffect(() => {
    setChecked(!!getCached(item.code));
  }, [caches]);
  
  return (
    <FixedTopParent isParent={!item.parent_id} parentRef={ref}>
      <div ref={ref} className={styles.item} onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={checked} onChange={() => handleCheckedItem(item)} onClick={(e) => e.stopPropagation()} />
        <Box sx={{ width: "100%" }}>
          {!item.parent_id && getDepartmentLabel(item.code)}
          <p className={styles.itemContent}>
            <strong dangerouslySetInnerHTML={{ __html: highlighter(searchKey, item.code) }} />
            <span dangerouslySetInnerHTML={{ __html: highlighter(searchKey, item.description) }} />
          </p>
        </Box>
      </div>
      {item.synonyme && <DroppInfo title="synonyme" content={item.synonyme} />}
      {item.hintweise && <DroppInfo title="hintweise" content={item.hintweise} />}
    </FixedTopParent>
  );
};

const getDepartmentLabel = (code) => {
  code = parseFloat(code.replace("-", "."));
  let styles = {
    color: "white",
    fontSize: "12px",
    borderRadius: "3px",
    textTransforom: "uppercase",
    paddingRight: "5px",
    paddingLeft: "5px",
    paddingTop: "2px",
    paddingBottom: "2px",
  };

  if (code < 44000000) return <span style={{ ...styles, backgroundColor: "#f44336" }}>Lieferleistungen</span>;
  if (code > 48000000.8) return <span style={{ ...styles, backgroundColor: "#009688" }}>Bauleistungen</span>;
  if (code == 45000000.7) return <span style={{ ...styles, backgroundColor: "##009688" }}>Dienstleistungen</span>;
};

export default LabelTree;
