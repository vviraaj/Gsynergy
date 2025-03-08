import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StoresPage from "./pages/StoresPage";
import SKUsPage from "./pages/SkUS/SKUsPage";
import PlanningPage from "./pages/PlanningPage";
import ChartsPage from "./pages/ChartsPage";
import Login from "./components/login";
import PrivateRoute from "./components/Routegurad";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/SignIn" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="stores" element={<StoresPage />} />
          <Route path="skus" element={<SKUsPage />} />
          <Route path="planning" element={<PlanningPage />} />
          <Route path="charts" element={<ChartsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
