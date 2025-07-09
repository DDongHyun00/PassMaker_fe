import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";

function App() {
  console.log(import.meta.env.VITE_API_URL);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
