'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Navigation.module.css';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

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

      <button
        type="button"
        className={classNames(styles.burger, {
          [styles.burgerActive]: isMenuOpen,
        })}
        aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>

      {isMenuOpen ? (
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
      ) : null}
    </nav>
  );
}
