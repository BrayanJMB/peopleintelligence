import styles from './CardSlider.module.css';

export default function CardSlider(props) {
  const Icon = props.icon;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Icon color="blue" sx={{ fontSize: '50px' }} />
        <div className={styles.title}>{props.title}</div>
        <div className={styles.details}>
          <p style={{ textAlign: 'center' }}>{props.content}</p>
        </div>
      </div>
    </div>
  );
}
