import { Badge, Button, Menu, MenuItem, MenuList, Paper, Popper, TextField } from "@mui/material";
import Search from "@mui/icons-material/Search";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import styles from "./SearchInput.module.css";
import { useRef, useState } from "react";

const SearchInput = ({ searchKey, setSearchKey, error, handleSearch }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.root}>

      <div className={styles.container}>
        <TextField
          id="input-text-input"
          variant="filled"
          label="Find CVP code"
          value={searchKey}
          helperText={error}
          onChange={(e) => setSearchKey(e.target.value)}
          className={styles.input}
        />

        <Button variant="contained" disableElevation>
          <Search fontSize="large" />
        </Button>

        <Button variant="contained" disableElevation>
          <Badge badgeContent={1} color="secondary">
            <FolderOpenIcon fontSize="medium" />
          </Badge>
        </Button>
      </div>

      <Paper className={styles.lists}>
        <MenuList open={open}>
          <MenuItem>Test</MenuItem>
        </MenuList>
      </Paper>
      
    </div>
  );
};

export default SearchInput;
