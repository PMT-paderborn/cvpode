import styles from "./ResultsList.module.css";
import { Box, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCached } from "../../services/cacheService";

const LabelTree = ({ item, handleCachedItem, caches }) => {
  const [checked, setChecked] = useState(!!getCached(item.code));

  const handleCheckedItem = () => {
    setChecked(handleCachedItem(item));
  };

  useEffect(() => {
    setChecked(!!getCached(item.code));
  }, [caches]);

  return (
    <div className={styles.item} onClick={(e) => e.stopPropagation()}>
      <Checkbox checked={checked} onChange={() => handleCheckedItem(item)} onClick={(e) => e.stopPropagation()} />
      <Box sx={{ width: "100%" }}>
        <div className={styles.itemContent}>
          <Typography variant="inherit">
            <strong>{item.code}</strong>
            {item.description}
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default LabelTree;
