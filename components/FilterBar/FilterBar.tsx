'use client';

import { useMemo, useState } from 'react';
import classNames from 'classnames';
import type { Track } from '@/data';
import styles from './FilterBar.module.css';

type FilterName = 'author' | 'year' | 'genre' | null;

type FilterBarProps = {
  tracks: Track[];
};

type FilterButtonProps = {
  label: string;
  nameFilter: Exclude<FilterName, null>;
  activeFilter: FilterName;
  onClick: (filterName: Exclude<FilterName, null>) => void;
};

function FilterButton({ label, nameFilter, activeFilter, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      className={classNames(styles.button, {
        [styles.active]: activeFilter === nameFilter,
      })}
      onClick={() => onClick(nameFilter)}
    >
      {label}
    </button>
  );
}

export function FilterBar({ tracks }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<FilterName>(null);

  const authors = useMemo(
    () => Array.from(new Set(tracks.map((track) => track.author))),
    [tracks],
  );

  const years = useMemo(
    () => Array.from(new Set(tracks.map((track) => track.year))).sort((a, b) => b - a),
    [tracks],
  );

  const genres = useMemo(
    () => Array.from(new Set(tracks.map((track) => track.genre))).sort((a, b) => a.localeCompare(b)),
    [tracks],
  );

  const toggleFilter = (filterName: Exclude<FilterName, null>) => {
    setActiveFilter((currentFilter) => (currentFilter === filterName ? null : filterName));
  };

  return (
    <div className={styles.filter}>
      <span className={styles.title}>Искать по:</span>

      <div className={styles.filterItem}>
        <FilterButton
          label="исполнителю"
          nameFilter="author"
          activeFilter={activeFilter}
          onClick={toggleFilter}
        />
        {activeFilter === 'author' ? (
          <div className={styles.popup}>
            <ul className={styles.filterList}>
              {authors.map((author) => (
                <li key={author} className={styles.filterOption}>
                  {author}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className={styles.filterItem}>
        <FilterButton
          label="году выпуска"
          nameFilter="year"
          activeFilter={activeFilter}
          onClick={toggleFilter}
        />
        {activeFilter === 'year' ? (
          <div className={styles.popup}>
            <ul className={styles.filterList}>
              {years.map((year) => (
                <li key={year} className={styles.filterOption}>
                  {year}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className={styles.filterItem}>
        <FilterButton
          label="жанру"
          nameFilter="genre"
          activeFilter={activeFilter}
          onClick={toggleFilter}
        />
        {activeFilter === 'genre' ? (
          <div className={styles.popup}>
            <ul className={styles.filterList}>
              {genres.map((genre) => (
                <li key={genre} className={styles.filterOption}>
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
