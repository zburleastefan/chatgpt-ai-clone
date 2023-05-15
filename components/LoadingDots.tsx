import React from "react";
import styles from "../app/loading-dots.module.css";

const LoadingDots = ({
}) => {
  const color = "#11A37F";
  return (
    <div className="justify-center text-3xl font-bold p-1 inline-flex">
      <span className={styles.loading}>
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
        <span style={{ backgroundColor: color }} />
      </span>
    </div>
  );
};

export default LoadingDots;