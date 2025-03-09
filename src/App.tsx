import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/login";
import PrivateRoute from "./components/Routegurad";

// Lazy-loaded components
const StoresPage = lazy(() => import("./pages/StoresPage"));
const SKUsPage = lazy(() => import("./pages/SkUS/SKUsPage"));
const PlanningPage = lazy(() => import("./pages/PlanningPage"));
const ChartsPage = lazy(() => import("./pages/ChartsPage"));

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
          <Route
            path="stores"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <StoresPage />
              </Suspense>
            }
          />
          <Route
            path="skus"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SKUsPage />
              </Suspense>
            }
          />
          <Route
            path="planning"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PlanningPage />
              </Suspense>
            }
          />
          <Route
            path="charts"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ChartsPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
