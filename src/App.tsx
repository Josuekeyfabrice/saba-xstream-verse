
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Films from "./pages/Films";
import Series from "./pages/Series";
import Music from "./pages/Music";
import TV from "./pages/TV";
import Celebrities from "./pages/Celebrities";
import Post from "./pages/Post";
import Sport from "./pages/Sport";
import Politique from "./pages/Politique"; 
import Religion from "./pages/Religion"; 
import Payement from "./pages/Payement";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useState } from "react";

// Move the App component to be a function component that uses hooks
const App = () => {
  // Create queryClient inside the component body
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/films"
              element={
                <ProtectedRoute>
                  <Films />
                </ProtectedRoute>
              }
            />
            <Route
              path="/series"
              element={
                <ProtectedRoute>
                  <Series />
                </ProtectedRoute>
              }
            />
            <Route
              path="/music"
              element={
                <ProtectedRoute>
                  <Music />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tv"
              element={
                <ProtectedRoute>
                  <TV />
                </ProtectedRoute>
              }
            />
            <Route
              path="/celebrities"
              element={
                <ProtectedRoute>
                  <Celebrities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post"
              element={
                <ProtectedRoute>
                  <Post />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sport"
              element={
                <ProtectedRoute>
                  <Sport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/politique"
              element={
                <ProtectedRoute>
                  <Politique />
                </ProtectedRoute>
              }
            />
            <Route
              path="/religion"
              element={
                <ProtectedRoute>
                  <Religion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payement"
              element={
                <ProtectedRoute>
                  <Payement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
