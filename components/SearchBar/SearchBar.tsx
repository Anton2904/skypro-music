import styles from './SearchBar.module.css';

export function SearchBar() {
  return (
    <div className={styles.search}>
      <svg className={styles.icon} aria-hidden="true">
        <use xlinkHref="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.input}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
}
