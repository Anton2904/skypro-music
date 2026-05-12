'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import styles from './Navigation.module.css';

type StoredUser = {
  email?: string;
  username?: string;
};

function readUserFromStorage(): StoredUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedUser = localStorage.getItem('skyproUser');

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser) as StoredUser;
  } catch {
    localStorage.removeItem('skyproUser');
    return null;
  }
}

export function Navigation() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    setUser(readUserFromStorage());

    const handleStorageChange = () => {
      setUser(readUserFromStorage());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('skypro-auth-change', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('skypro-auth-change', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('skyproUser');
    localStorage.removeItem('skyproAccessToken');
    localStorage.removeItem('skyproRefreshToken');
    window.dispatchEvent(new Event('skypro-auth-change'));
    setUser(null);
    setIsMenuOpen(false);
    router.push('/signin');
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
            {user ? (
              <button type="button" className={styles.menuButton} onClick={handleLogout}>
                Выйти
              </button>
            ) : (
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            )}
          </li>
        </ul>
      ) : null}
    </nav>
  );
}
