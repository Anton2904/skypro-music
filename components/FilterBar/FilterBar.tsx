import styles from './FilterBar.module.css';

export function FilterBar() {
  return (
    <div className={styles.filter}>
      <span className={styles.title}>Искать по:</span>
      <button type="button" className={styles.button}>
        исполнителю
      </button>
      <button type="button" className={styles.button}>
        году выпуска
      </button>
      <button type="button" className={styles.button}>
        жанру
      </button>
    </div>
  );
}
