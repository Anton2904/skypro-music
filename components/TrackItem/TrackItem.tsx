'use client';

import cn from 'classnames';
import type { Track } from '@/lib/api/types';
import { setCurrentTrack } from '@/store/playerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './TrackItem.module.css';

type TrackItemProps = {
  track: Track;
};

export function TrackItem({ track }: TrackItemProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const isCurrent = currentTrack?.id === track.id;

  const handleClick = () => {
    dispatch(setCurrentTrack(track));
  };

  const title = `${track.title}${track.subtitle ? ` ${track.subtitle}` : ''}`;

  return (
    <article
      className={cn(styles.item, isCurrent && styles.activeItem)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Включить трек ${title}`}
    >
      <div className={styles.titleBlock}>
        <div className={styles.iconWrapper}>
          {isCurrent ? (
            <span className={cn(styles.playingDot, isPlaying && styles.playingDotAnimated)} aria-hidden="true" />
          ) : (
            <svg className={styles.noteIcon} aria-hidden="true">
              <use xlinkHref="/img/icon/sprite.svg#icon-note" />
            </svg>
          )}
        </div>
        <div className={styles.titleText}>
          {track.title} {track.subtitle ? <span className={styles.subtitle}>{track.subtitle}</span> : null}
        </div>
      </div>

      <div className={styles.author}>{track.author}</div>
      <div className={styles.album}>{track.album}</div>

      <div className={styles.time}>
        <svg className={styles.likeIcon} aria-hidden="true">
          <use xlinkHref="/img/icon/sprite.svg#icon-like" />
        </svg>
        <span>{track.duration}</span>
      </div>
    </article>
  );
}
