import { useState } from "react";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo href={"🍿"} CompName={"usePopcorn"}></Logo>
      <Search />
      <Results />
    </nav>
  );
}

function Results() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}

function Logo({ href, CompName, children }) {
  return (
    <div className="logo">
      <span role="img">{href}</span>
      <h1>{CompName}</h1>
      {children}
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
