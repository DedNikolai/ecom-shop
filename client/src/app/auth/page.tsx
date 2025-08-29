import styles from "./auth.module.css";

export default function AuthPage() {
  return (
    <div className={styles.form}>
      <div className={styles.title}>Auth</div>
      <div className={styles.row}>
        <input className={styles.input} placeholder="email" />
      </div>
      <button className={styles.btn}>Sign in</button>
    </div>
  );
}
