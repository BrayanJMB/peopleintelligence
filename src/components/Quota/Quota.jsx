import styles from "./Quota.module.css";

export default function Quota(props) {
  return (
    <div className={styles.segment}>
      <span
        style={{
          marginLeft: "2rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Quota Targeting
      </span>
      <div className={styles.info}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
}
