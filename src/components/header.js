import React from "react";
import { useLocation, Link } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation();

  return (
    <nav>
      {pathname === "/" && (
        <React.Fragment>
          <Link to="/quiz">Start Quiz</Link>
          <Link to="/history">See attempts history</Link>
        </React.Fragment>
      )}

      {pathname === "/history" && <Link to="/">Home</Link>}
    </nav>
  );
}
