'use client';

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import cn from 'classnames';
import { nextTrack, pauseTrack, playTrack, previousTrack, toggleLoop, togglePlay, toggleShuffle } from '@/store/playerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './PlayerBar.module.css';

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60).toString().padStart(2, '0');

  return `${minutes}:${secondsLeft}`;
};

const getDurationFromTrack = (duration?: string) => {
  if (!duration) {
    return 0;
  }

  const [minutes, seconds] = duration.split(':').map(Number);

  return minutes * 60 + seconds;
};

export function PlayerBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying, isShuffle, isLoop, playlist } = useAppSelector((state) => state.player);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const currentIndex = useMemo(() => playlist.findIndex((track) => track.id === currentTrack?.id), [currentTrack?.id, playlist]);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && (isShuffle || currentIndex < playlist.length - 1);
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    if (audio.src !== currentTrack.audioUrl) {
      audio.src = currentTrack.audioUrl;
      audio.load();
      setCurrentTime(0);
      setDuration(getDurationFromTrack(currentTrack.duration));
    }

    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch(() => dispatch(pauseTrack()));
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying, volume, dispatch]);

  const handlePlayClick = () => {
    dispatch(togglePlay());
  };

  const handlePreviousClick = () => {
    dispatch(previousTrack());
  };

  const handleNextClick = () => {
    dispatch(nextTrack());
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(event.target.value);

    setVolume(nextVolume);

    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
  };

  const handleLoadedMetadata = () => {
    const audioDuration = audioRef.current?.duration ?? 0;
    setDuration(Number.isFinite(audioDuration) ? audioDuration : getDurationFromTrack(currentTrack?.duration));
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime ?? 0);
  };

  const handleProgressClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!audioRef.current || !duration) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const nextTime = (clickPosition / rect.width) * duration;

    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleEnded = () => {
    const audio = audioRef.current;

    if (isLoop && audio) {
      audio.currentTime = 0;
      audio.play().catch(() => dispatch(pauseTrack()));
      return;
    }

    if (canGoNext) {
      dispatch(nextTrack());
    } else {
      if (audio) {
        audio.currentTime = 0;
      }
      dispatch(pauseTrack());
      setCurrentTime(0);
    }
  };

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => dispatch(playTrack())}
        onTimeUpdate={handleTimeUpdate}
        hidden
      />

      <button
        type="button"
        className={styles.progress}
        onClick={handleProgressClick}
        disabled={!currentTrack || !duration}
        aria-label="Перемотать трек"
      >
        <span className={styles.progressLine} style={{ width: `${progressPercent}%` }} />
      </button>

      <div className={styles.timeBlock}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration || getDurationFromTrack(currentTrack?.duration))}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.player}>
          <div className={styles.controls}>
            <button type="button" className={styles.controlButton} aria-label="Предыдущий трек" onClick={handlePreviousClick} disabled={!canGoPrevious}>
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
            <button type="button" className={styles.controlButton} aria-label="Следующий трек" onClick={handleNextClick} disabled={!canGoNext}>
              <svg className={styles.iconSmall} aria-hidden="true">
                <use xlinkHref="/img/icon/sprite.svg#icon-next" />
              </svg>
            </button>
            <button
              type="button"
              className={cn(styles.controlButton, isLoop && styles.activeControl)}
              aria-label="Повтор"
              aria-pressed={isLoop}
              onClick={() => dispatch(toggleLoop())}
            >
              <svg className={styles.iconMedium} aria-hidden="true">
                <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
              </svg>
            </button>
            <button
              type="button"
              className={cn(styles.controlButton, isShuffle && styles.activeControl)}
              aria-label="Перемешать"
              aria-pressed={isShuffle}
              onClick={() => dispatch(toggleShuffle())}
            >
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
          <input
            className={styles.range}
            type="range"
            name="volume"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Громкость"
          />
        </div>
      </div>
    </div>
  );
}
