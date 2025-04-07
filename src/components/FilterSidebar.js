import React, { useEffect, useState } from 'react';
import { fetchGenres } from '../api/rawg';
import './FilterSidebar.css'; 

const FilterSidebar = ({ selectedGenre, onGenreChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      if (data && data.results) {
        setGenres(data.results);
      }
    };
    loadGenres();
  }, []);

  return (
    <>
      <div className="p-3 border-end d-none d-md-block" style={{ maxWidth: '250px' }}>
        <h5>Filter by Category</h5>
        <ul className="list-unstyled">
          <li>
            <button
              className={`btn btn-link ${selectedGenre === null ? 'fw-bold' : ''}`}
              onClick={() => onGenreChange(null)}
            >
              All
            </button>
          </li>
          {genres.map((genre) => (
            <li key={genre.id}>
              <button
                className={`btn btn-link ${selectedGenre === genre.name ? 'fw-bold' : ''}`}
                onClick={() => onGenreChange(genre.name)}
              >
                {genre.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="d-md-none px-3 py-2 overflow-auto genre-scroll">
        <div className="d-flex gap-2">
          <button
            className={`btn btn-outline-secondary btn-sm ${selectedGenre === null ? 'active' : ''}`}
            onClick={() => onGenreChange(null)}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`btn btn-outline-secondary btn-sm ${selectedGenre === genre.name ? 'active' : ''}`}
              onClick={() => onGenreChange(genre.name)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
