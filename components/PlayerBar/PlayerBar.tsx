'use client';

import { useEffect, useRef, type ChangeEvent } from 'react';
import cn from 'classnames';
import { pauseTrack, playTrack, togglePlay } from '@/store/playerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './PlayerBar.module.css';

export function PlayerBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    if (audio.src !== currentTrack.audioUrl) {
      audio.src = currentTrack.audioUrl;
      audio.load();
    }

    if (isPlaying) {
      audio.play().catch(() => dispatch(pauseTrack()));
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying, dispatch]);

  const handlePlayClick = () => {
    dispatch(togglePlay());
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(event.target.value);
    }
  };

  return (
    <div className={styles.bar}>
      <audio ref={audioRef} onEnded={() => dispatch(pauseTrack())} onPlay={() => dispatch(playTrack())} hidden />
      <div className={styles.progress} />
      <div className={styles.content}>
        <div className={styles.player}>
          <div className={styles.controls}>
            <button type="button" className={styles.controlButton} aria-label="Предыдущий трек">
              <svg className={styles.iconSmall} aria-hidden="true">
                <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
              </svg>
            </button>
            <button
              type="button"
              className={cn(styles.controlButton, styles.playButton)}
              aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
              onClick={handlePlayClick}
              disabled={!currentTrack}
            >
              <svg className={cn(styles.iconPlay, isPlaying && styles.iconPause)} aria-hidden="true">
                <use xlinkHref={`/img/icon/sprite.svg#${isPlaying ? 'icon-pause' : 'icon-play'}`} />
              </svg>
            </button>
            <button type="button" className={styles.controlButton} aria-label="Следующий трек">
              <svg className={styles.iconSmall} aria-hidden="true">
                <use xlinkHref="/img/icon/sprite.svg#icon-next" />
              </svg>
            </button>
            <button type="button" className={styles.controlButton} aria-label="Повтор">
              <svg className={styles.iconMedium} aria-hidden="true">
                <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
              </svg>
            </button>
            <button type="button" className={styles.controlButton} aria-label="Перемешать">
              <svg className={styles.iconMedium} aria-hidden="true">
                <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
              </svg>
            </button>
          </div>

          <div className={styles.trackBlock}>
            <div className={styles.trackInfo}>
              <div className={styles.trackImage}>
                <svg className={styles.noteIcon} aria-hidden="true">
                  <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                </svg>
              </div>
              <div>
                <p className={styles.trackTitle}>{currentTrack?.title ?? 'Выберите трек'}</p>
                <p className={styles.trackAuthor}>{currentTrack?.author ?? 'Плейлист пока не запущен'}</p>
              </div>
            </div>

            <div className={styles.reactions}>
              <button type="button" className={styles.controlButton} aria-label="Нравится">
                <svg className={styles.iconReaction} aria-hidden="true">
                  <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                </svg>
              </button>
              <button type="button" className={styles.controlButton} aria-label="Не нравится">
                <svg className={styles.iconReaction} aria-hidden="true">
                  <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.volumeBlock}>
          <svg className={styles.volumeIcon} aria-hidden="true">
            <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
          </svg>
          <input className={styles.range} type="range" name="volume" min="0" max="1" step="0.01" defaultValue="1" onChange={handleVolumeChange} />
        </div>
      </div>
    </div>
  );
}
