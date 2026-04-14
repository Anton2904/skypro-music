import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { sidebarPlaylists } from '@/data';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.name}>Sergey.Ivanov</p>
        <button type="button" className={styles.logout} aria-label="Выйти">
          <svg className={styles.logoutIcon} aria-hidden="true">
            <use xlinkHref="/img/icon/sprite.svg#logout" />
          </svg>
        </button>
      </div>

      <div className={styles.list}>
        {sidebarPlaylists.map((playlist) => (
          <Link key={playlist.id} href="/" className={styles.item}>
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
