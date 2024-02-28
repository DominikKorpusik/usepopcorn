import { useState } from "react";

import NavBar from "./NavBar";
import Main from "./Main";
import Search from "./Search.js";
import Results from "./Results";
import { ListBox } from "./ListBox";
import { GeneralList } from "./GeneralList.js";
import { WatchedSummary, WatchedMoviesList } from "./WatchedMoviesList.js";
import { MovieDetails } from "./MovieDetails.js";
import { useMovies } from "../Hooks/useMovies.js";
import { useLocalStorageState } from "../Hooks/useLocalStorageState.js";

export default function App() {
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

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
