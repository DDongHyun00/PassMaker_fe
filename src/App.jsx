import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import Header from "./common/components/Header.jsx";

function App() {
  console.log(import.meta.env.VITE_API_URL);

  return (
    <BrowserRouter>
      <AuthProvider>
          <Header />
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
