import React, { useContext, useEffect } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Enroll from "./pages/Enroll";
import Articles from "./pages/Articles";
import CourseDetails from "./pages/CourseDetails";
import ArticleDetails from "./pages/ArticleDetails";
import Admin from "./pages/Admin";
import { DataProvider, DataContext } from "./context/DataContext";

function AppShell() {
  const { analytics, setAnalytics } = useContext(DataContext);
  useEffect(() => {
    // Increment total visitors once at app mount
    setAnalytics((prev) => ({ ...prev, totalVisitors: prev.totalVisitors + 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-row">
          <div className="header-left">
            <h1 className="title">Evolon Programming Academy</h1>
            <p className="subtitle">
              Empowering the next generation of programmers through creativity,
              precision, and innovation.
            </p>
          </div>
          <div className="header-right">
            <nav className="nav">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/articles">Articles</Link>
              <Link className="nav-link primary enroll-cta" to="/enroll">Enroll</Link>
            </nav>
          </div>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main className="main">
              <Link to="/courses/c_cpp" className="card" style={{ textDecoration: "none" }}>
                <h2>C / C++ Fundamentals</h2>
                <p>Build a solid foundation in low-level programming and algorithms.</p>
              </Link>
              <Link to="/courses/embedded" className="card" style={{ textDecoration: "none" }}>
                <h2>Embedded Systems</h2>
                <p>Learn to program microcontrollers and develop real-world IoT projects.</p>
              </Link>
            </main>
          }
        />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Evolon Academy — Founded by Vahe Sahakyan</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <AppShell />
    </DataProvider>
  );
}

export default App;
