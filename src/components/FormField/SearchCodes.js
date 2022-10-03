import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./FormField.module.css";
import Search from "../../screens/Search";

const SearchCodes = ({ open, setOpen }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={styles.modal}>
        <Box sx={{ display: "flex", paddingBottom: 2 }}>
          <Typography fontWeight={600} fontSize={24} flex={1}>
            Selected CPV Codes
          </Typography>
          <IconButton color="error" onClick={() => setOpen(false)}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Search />
        <Box sx={{ display: "flex", justifyContent: "end", paddingTop: 4 }}>
          <Button variant="contained">Confirm</Button>
        </Box>
      </div>
    </Modal>
  );
};

export default SearchCodes;
