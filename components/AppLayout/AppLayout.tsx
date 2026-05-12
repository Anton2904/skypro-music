import { Navigation } from '@/components/Navigation/Navigation';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { FilterBar } from '@/components/FilterBar/FilterBar';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PlayerBar } from '@/components/PlayerBar/PlayerBar';
import { PlaylistInitializer } from '@/components/PlaylistInitializer/PlaylistInitializer';
import type { Track } from '@/lib/api/types';
import styles from './AppLayout.module.css';

type AppLayoutProps = {
  title: string;
  tracks: Track[];
  children: React.ReactNode;
};

export function AppLayout({ title, tracks, children }: AppLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <PlaylistInitializer tracks={tracks} />
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <section className={styles.centerBlock}>
            <SearchBar />
            <h1 className={styles.title}>{title}</h1>
            <FilterBar tracks={tracks} />
            {children}
          </section>
          <Sidebar />
        </main>
        <PlayerBar />
      </div>
    </div>
  );
}
