import { Box, Button, MenuItem, MenuList, Paper, TextField, Typography } from "@mui/material";
import Search from "@mui/icons-material/Search";
import styles from "./SearchInput.module.css";
import CachedItems from "./CachedItems";

const SearchInput = ({
  searchKey,
  setSearchKey,
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
          onKeyDown={handleInputKeyDown}
        />
        <Button variant="contained" disableElevation onClick={handleSearchClick}>
          <Search fontSize="large" />
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
              <MenuItem key={item.code} className={styles.listItem} onClick={() => getItem(item.code)}>
                <span>{item.code}</span>
                <Typography variant="inherit" noWrap>
                  {item.description}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
          <div className={styles.listAll} onClick={handleSearchClick}>Alle Abteilungen Anzeigen</div>
        </Paper>
      )}
    </div>
  );
};

export default SearchInput;
