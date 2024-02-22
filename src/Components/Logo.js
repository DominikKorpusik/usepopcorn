export default function Logo({ href, CompName, children }) {
  return (
    <div className="logo">
      <span role="img">{href}</span>
      <h1>{CompName}</h1>
      {children}
    </div>
  );
}
