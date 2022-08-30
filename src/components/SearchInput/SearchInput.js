import {
  Box,
  Button,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import SearchIcon from "../../Icons/SearchIcon";
import styles from "./SearchInput.module.css";
import CachedItems from "./CachedItems";

const SearchInput = ({
  searchKey,
  setSearchKey,
  reloadSearch,
  handleSearchClick,
  searchItems,
  getItem,
  errorMessage,
  caches,
  handleCachedItem,
}) => {
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const onClickInputHandler = () => {
    reloadSearch();
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <InputBase
          id="input-text-input"
          placeholder="Find CVP code"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className={styles.input}
          onKeyDown={handleInputKeyDown}
          onClick={onClickInputHandler}
        />
        <Button variant="contained" disableElevation onClick={handleSearchClick}>
          <SearchIcon fontSize="small" />
        </Button>
        <CachedItems caches={caches} handleCachedItem={handleCachedItem} />
      </div>
      <p className={styles.error}>{errorMessage}</p>

      {searchItems?.length > 0 && (
        <Paper className={styles.lists}>
          <Box sx={{ borderBottom: "1px solid #eee", padding: 2 }}>
            <Typography fontWeight={600} fontSize={14}>
              Ergebnisse in CPV-codes ({searchItems.length} Treffer)
            </Typography>
          </Box>
          <MenuList open={searchItems.length} className={styles.listItems}>
            {searchItems.map((item) => (
              <MenuItem key={item.code} className={styles.listItem} onClick={() => getItem(item)}>
                <span>{item.code}</span>
                <Typography variant="inherit" noWrap>
                  {item.description}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
          <div className={styles.listAll} onClick={handleSearchClick}>
            Alle Abteilungen Anzeigen
          </div>
        </Paper>
      )}
    </div>
  );
};

export default SearchInput;
