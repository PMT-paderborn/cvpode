import styles from "./ResultsList.module.css";
import { Box, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { getCached } from "../../services/cacheService";
import highlighter from "../../utils/highliter";

const LabelTree = ({ item, handleCachedItem, caches, searchKey }) => {
  const [checked, setChecked] = useState(!!getCached(item.code));
  const handleCheckedItem = () => setChecked(handleCachedItem(item));

  useEffect(() => {
    setChecked(!!getCached(item.code));
  }, [caches]);

  return (
    <div className={styles.item} onClick={(e) => e.stopPropagation()}>
      <Checkbox checked={checked} onChange={() => handleCheckedItem(item)} onClick={(e) => e.stopPropagation()} />
      <Box sx={{ width: "100%" }}>
        <div className={styles.itemContent}>
          <strong dangerouslySetInnerHTML={{ __html: highlighter(searchKey, item.code) }} />
          <div dangerouslySetInnerHTML={{ __html: highlighter(searchKey, item.description) }} />
        </div>
      </Box>
    </div>
  );
};

export default LabelTree;
