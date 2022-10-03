import { InputBase, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./FormField.module.css";
import SearchCodes from "./SearchCodes";
import { getAllCache, removeCache, clearCache } from "../../services/cacheService";

const FormField = () => {
  const [open, setOpen] = useState(false);
  const [caches, setCaches] = useState(getAllCache());

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>1.2) CPV-CODE</h2>
      <div className={styles.subtitle}>
        <p>CPV-CODE Hauptteil</p>(<span onClick={() => setOpen(true)}>Liste</span>)
      </div>
      <div className={styles.inputGroup}>
        {caches?.length === 0 && (
          <InputBase id="input-text-input" placeholder="3412100" className={styles.input} />
        )}
        {caches?.length > 0 && (
          <ul>
            {caches.map((item) => (
              <li key={item.code} title={item.code + " - " + item.description}>
                {item.code}
              </li>
            ))}
          </ul>
        )}
      </div>
      <SearchCodes open={open} setOpen={setOpen} />
    </div>
  );
};

export default FormField;
