import styles from "../styles/Home.module.css";

export default function Loader() {
  return (
    <div className={styles.main}>
      <div className={styles.centerLoader}>
        <div className={styles.ldsRoller}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
