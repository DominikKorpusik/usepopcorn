import { useEffect, useState } from "react";

import NavBar from "./NavBar";
import Main from "./Main";
import Search from "./Search.js";
import Results from "./Results";
import { ListBox } from "./ListBox";
import { GeneralList } from "./GeneralList.js";
import { WatchedSummary, WatchedMoviesList } from "./WatchedMoviesList.js";
import { MovieDetails } from "./MovieDetails.js";
export const API_KEY = "476a4d73";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    return JSON.parse(localStorage.getItem("watched")) || [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((currId) => (currId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&S=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name === "AbortError") return;
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 2) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {/* {isLoading ? <Loader /> : <GeneralList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <GeneralList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage error={error} />}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}

export function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ error }) {
  return (
    <p className="error">
      <span>🧰</span>
      {error}
    </p>
  );
}
