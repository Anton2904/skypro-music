'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';
import { sidebarPlaylists } from '@/data';

export function Sidebar() {
  const router = useRouter();
  const [username, setUsername] = useState('Пользователь');

  useEffect(() => {
    const savedUser = localStorage.getItem('skyproUser');

    if (savedUser) {
      const user = JSON.parse(savedUser) as { username?: string; email?: string };
      setUsername(user.username || user.email || 'Пользователь');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('skyproUser');
    localStorage.removeItem('skyproAccessToken');
    localStorage.removeItem('skyproRefreshToken');
    router.push('/signin');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.name}>{username}</p>
        <button type="button" className={styles.logout} aria-label="Выйти" onClick={handleLogout}>
          <svg className={styles.logoutIcon} aria-hidden="true">
            <use xlinkHref="/img/icon/sprite.svg#logout" />
          </svg>
        </button>
      </div>

      <div className={styles.list}>
        {sidebarPlaylists.map((playlist) => (
          <Link key={playlist.id} href={`/selection/${playlist.id}`} className={styles.item}>
            <Image
              src={playlist.src}
              alt={playlist.alt}
              width={250}
              height={150}
              className={styles.image}
            />
          </Link>
        ))}
      </div>
    </aside>
  );
}
