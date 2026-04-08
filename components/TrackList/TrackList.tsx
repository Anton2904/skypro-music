import styles from './TrackList.module.css';
import { TrackItem } from '@/components/TrackItem/TrackItem';

type Track = {
  id: number;
  title: string;
  subtitle?: string;
  author: string;
  album: string;
  duration: string;
};

type TrackListProps = {
  tracks: Track[];
};

export function TrackList({ tracks }: TrackListProps) {
  return (
    <section className={styles.content}>
      <div className={styles.header}>
        <div>Трек</div>
        <div>Исполнитель</div>
        <div>Альбом</div>
        <div className={styles.timeHeader}>
          <svg className={styles.watchIcon} aria-hidden="true">
            <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>

      <div className={styles.list}>
        {tracks.map((track) => (
          <TrackItem key={track.id} {...track} />
        ))}
      </div>
    </section>
  );
}
