import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./Components/App";

import StarRating from "./Components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={10} defaultRating={5} />
    <StarRating
      color="red"
      size={50}
      messages={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
    />
  </React.StrictMode>
);
