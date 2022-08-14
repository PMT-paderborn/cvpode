import React, { useState } from "react";
import { Badge, Button, IconButton, MenuItem, MenuList, Modal, Typography } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./SearchInput.module.css";

const CachedItems = ({ caches, handleCachedItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" disableElevation onClick={() => setOpen(true)}>
        <Badge badgeContent={caches?.length} color="secondary">
          <FolderOpenIcon fontSize="medium" />
        </Badge>
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={styles.modal}>
          <Typography fontWeight={600} fontSize={24}>
            Selected CPV Codes
          </Typography>
          {caches?.length == 0 && (
            <Typography textAlign="center" color="#888" my={10}>
              Nothnig Selected yet
            </Typography>
          )}
          <ul>
            {caches.map((item) => (
              <li key={item.code} className={styles.listItem}>
                <IconButton color="error" onClick={() => handleCachedItem(item)}>
                  <DeleteIcon fontSize="medium" />
                </IconButton>
                <Typography fontWeight={600} whiteSpace="nowrap">
                  {item.code}
                </Typography>
                <Typography variant="inherit" noWrap>
                  {item.description}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default CachedItems;
