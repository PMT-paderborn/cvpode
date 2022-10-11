import { Box, Button, Modal, Typography } from "@mui/material";
import styles from "./FormField.module.css";
import Search from "../../screens/Search";
import { getAllCache } from "../../services/cacheService";

const SearchCodes = ({ open, setOpen }) => {
  const confirmIt = () => {
    const event = new CustomEvent("selectedCpvCode", {
      detail: getAllCache(),
    });
    window.dispatchEvent(event);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={styles.modal}>
        <Box sx={{ display: "flex", paddingBottom: 0 }}>
          <Typography fontWeight={600} fontSize={24} flex={1}>
            Selected CPV Codes
          </Typography>
        </Box>
        <Search />
        <Box sx={{ display: "flex", justifyContent: "end", paddingTop: 4 }}>
          <Button variant="contained" onClick={confirmIt}>
            Confirm
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default SearchCodes;
