import { Badge, Box, Button, MenuItem, MenuList, Paper, TextField, Typography } from "@mui/material";
import Search from "@mui/icons-material/Search";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import styles from "./SearchInput.module.css";

const SearchInput = ({ searchKey, setSearchKey, handleSearch, searchItems, getItem, errorMessage }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <TextField
          id="input-text-input"
          variant="filled"
          label="Find CVP code"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className={styles.input}
        />

        <Button variant="contained" disableElevation onClick={handleSearch}>
          <Search fontSize="large" />
        </Button>

        <Button variant="contained" disableElevation>
          <Badge badgeContent={0} color="secondary">
            <FolderOpenIcon fontSize="medium" />
          </Badge>
        </Button>
      </div>
      <p className={styles.error}>{errorMessage}</p>

      {searchItems?.length > 0 && (
        <Paper className={styles.lists}>
          <MenuList open={searchItems.length}>
            {searchItems.map((item) => (
              <MenuItem key={item.code} className={styles.listItem} onClick={() => getItem(item.code)}>
                <span>{item.code}</span>
                <Typography variant="inherit" noWrap>
                  {item.description}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      )}
    </div>
  );
};

export default SearchInput;
