import { useEffect, useState } from "react";
import styles from "./ResultsList.module.css";

const FixedTopParent = ({ isParent, parentRef, children }) => {
  const [isScrolled, setIsPassed] = useState(false);
  const [parentPosition, setParentPosition] = useState(0);

  const scrollHandler = () => {
    setIsPassed(window.scrollY > parentPosition + 20);
  };

  useEffect(() => {
    const current = parentRef?.current.getBoundingClientRect().top;
    setParentPosition(current > 0 ? current : parentPosition);
  }, []);

  useEffect(() => {
    if (isParent) {
      window.addEventListener("scroll", scrollHandler, { passive: true });
      return () => window.removeEventListener("scroll", scrollHandler);
    }
  }, []);

  if (isParent && isScrolled)
    return (
      <div className={styles.fixedTopParent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    );

  return <>{children}</>;
};

export default FixedTopParent;
