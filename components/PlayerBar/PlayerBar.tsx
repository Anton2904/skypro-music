import cn from 'classnames';
import styles from './PlayerBar.module.css';

export function PlayerBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.progress} />
      <div className={styles.content}>
        <div className={styles.player}>
          <div className={styles.controls}>
            <button type="button" className={styles.controlButton} aria-label="Предыдущий трек">
              <svg className={styles.iconSmall} aria-hidden="true">
                <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
              </svg>
            </button>
            <button type="button" className={cn(styles.controlButton, styles.playButton)} aria-label="Воспроизвести">
              <svg className={styles.iconPlay} aria-hidden="true">
                <use xlinkHref="/img/icon/sprite.svg#icon-play" />
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
                <p className={styles.trackTitle}>Ты та...</p>
                <p className={styles.trackAuthor}>Баста</p>
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
          <input className={styles.range} type="range" name="volume" />
        </div>
      </div>
    </div>
  );
}
