import styles from "./ResultsList.module.css";
import { Accordion, AccordionSummary, AccordionDetails, Box, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import { getCached } from "../../services/cacheService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LabelTree = ({ item, handleCachedItem }) => {
  const [checked, setChecked] = useState(!!getCached(item.code));

  const handleCheckedItem = () => {
    setChecked(handleCachedItem(item));
  };

  return (
    <div className={styles.item} onClick={(e) => e.stopPropagation()}>
      <Checkbox checked={checked} onChange={() => handleCheckedItem(item)} onClick={(e) => e.stopPropagation()} />
      <Box sx={{ width: "100%" }}>
        <div className={styles.itemContent}>
          <strong>{item.code}</strong>
          <Typography variant="inherit" noWrap>
            {item.description}
          </Typography>
        </div>
        <Accordion disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="content" id="header">
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.description}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export default LabelTree;
