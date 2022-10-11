import { useState } from "react";
import styles from "./FormField.module.css";
import SearchCodes from "./SearchCodes";

const FormField = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>1.2) CPV-CODE</h2>
      <div className={styles.subtitle}>
        <p>CPV-CODE Hauptteil</p>(<span onClick={() => setOpen(true)}>Liste</span>)
      </div>
      <SearchCodes open={open} setOpen={setOpen} />
    </div>
  );
};

export default FormField;
