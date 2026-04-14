import styles from './TrackItem.module.css';

type TrackItemProps = {
  title: string;
  subtitle?: string;
  author: string;
  album: string;
  duration: string;
};

export function TrackItem({ title, subtitle, author, album, duration }: TrackItemProps) {
  return (
    <article className={styles.item}>
      <div className={styles.titleBlock}>
        <div className={styles.iconWrapper}>
          <svg className={styles.noteIcon} aria-hidden="true">
            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.titleText}>
          {title} {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
        </div>
      </div>

      <div className={styles.author}>{author}</div>
      <div className={styles.album}>{album}</div>

      <div className={styles.time}>
        <svg className={styles.likeIcon} aria-hidden="true">
          <use xlinkHref="/img/icon/sprite.svg#icon-like" />
        </svg>
        <span>{duration}</span>
      </div>
    </article>
  );
}
