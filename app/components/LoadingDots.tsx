import React from "react";
import styles from "../loading-dots.module.css";

const LoadingDots = ({
}) => {
  const color = "#11A37F";
  return (
    <div className="flex justify-center p-5">
      <span className={styles.loading}>
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
      </span>
    </div>
  );
};

export default LoadingDots;