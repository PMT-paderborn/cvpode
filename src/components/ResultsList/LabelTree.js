import styles from "./ResultsList.module.css";
import { Box, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCached } from "../../services/cacheService";

const LabelTree = ({ item, handleCachedItem, caches, searchKey }) => {
  const [checked, setChecked] = useState(!!getCached(item.code));

  const handleCheckedItem = () => {
    setChecked(handleCachedItem(item));
  };

  useEffect(() => {
    setChecked(!!getCached(item.code));
  }, [caches]);

  const renderCode = (code) => {
    if (code.includes(searchKey)) {
      const startedAt = code.indexOf(searchKey);
      return (
        code.substr(0, startedAt) +
        `<b>${code.substr(startedAt, searchKey.length)}</b>` +
        code.substr(startedAt, searchKey.length)
      );
    }

    return code;
  };

  return (
    <div className={styles.item} onClick={(e) => e.stopPropagation()}>
      <Checkbox checked={checked} onChange={() => handleCheckedItem(item)} onClick={(e) => e.stopPropagation()} />
      <Box sx={{ width: "100%" }}>
        <div className={styles.itemContent}>
          <Typography variant="inherit">
            <strong dangerouslySetInnerHTML={{__html: renderCode(item.code)}}></strong>
            {item.description}
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default LabelTree;
