import styles from './page.module.css';
import { tracks } from '@/data';
import { Navigation } from '@/components/Navigation/Navigation';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { FilterBar } from '@/components/FilterBar/FilterBar';
import { TrackList } from '@/components/TrackList/TrackList';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PlayerBar } from '@/components/PlayerBar/PlayerBar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <section className={styles.centerBlock}>
            <SearchBar />
            <h1 className={styles.title}>Треки</h1>
            <FilterBar tracks={tracks} />
            <TrackList tracks={tracks} />
          </section>
          <Sidebar />
        </main>
        <PlayerBar />
      </div>
    </div>
  );
}
