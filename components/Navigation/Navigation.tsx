import Image from 'next/image';
import Link from 'next/link';
import styles from './Navigation.module.css';

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/img/logo.png"
          alt="Skypro Music"
          width={113}
          height={17}
          priority
        />
      </Link>

      <button type="button" className={styles.burger} aria-label="Открыть меню">
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>

      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/" className={styles.menuLink}>
            Главное
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/" className={styles.menuLink}>
            Мой плейлист
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/signin" className={styles.menuLink}>
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}
