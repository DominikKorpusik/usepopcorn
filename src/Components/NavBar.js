import Logo from "./Logo";

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo href={"🍿"} CompName={"usePopcorn"}></Logo>
      {children}
    </nav>
  );
}
