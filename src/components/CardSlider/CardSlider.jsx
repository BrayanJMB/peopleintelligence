import styles from "./CardSlider.module.css";

export default function CardSlider(props) {
  const Icon = props.icon;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Icon color="blue" sx={{ fontSize: "50px" }} />
        <div className={styles.title}>{props.title}</div>
        <div className={styles.details}>
          {props.content.map((val, key) => {
            return (
              <p key={key} style={{ textAlign: "center" }}>
                {val}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
