import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Enroll from "./pages/Enroll";
import Articles from "./pages/Articles";
import CourseDetails from "./pages/CourseDetails";
import ArticleDetails from "./pages/ArticleDetails";
import Admin from "./pages/Admin";
import { DataProvider, DataContext } from "./context/DataContext";
import { getCourses } from "./services/api";

function AppShell() {
  const { analytics, setAnalytics } = useContext(DataContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [coursesError, setCoursesError] = useState("");
  useEffect(() => {
    // Increment total visitors once at app mount
    setAnalytics((prev) => ({ ...prev, totalVisitors: prev.totalVisitors + 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoadingCourses(true);
        setCoursesError("");
        const list = await getCourses();
        if (isMounted) setCourses(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("Failed to load courses:", e);
        if (isMounted) setCoursesError(e?.message || "Failed to load courses");
      } finally {
        if (isMounted) setLoadingCourses(false);
      }
    }
    load();
    return () => { isMounted = false; };
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
            <button
              className="menu-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <span className="menu-bar" />
              <span className="menu-bar" />
              <span className="menu-bar" />
            </button>
            <Link className="nav-link primary enroll-cta enroll-cta-mobile" to="/enroll">Enroll</Link>
            <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
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
              {loadingCourses && (
                <section className="card" style={{ width: "100%", maxWidth: 700, textAlign: "left" }}>
                  <h2>Loading courses...</h2>
                </section>
              )}
              {coursesError && (
                <section className="card" style={{ width: "100%", maxWidth: 700, textAlign: "left" }}>
                  <h2>Unable to load courses</h2>
                  <p style={{ color: "#bdbdbd" }}>{coursesError}</p>
                </section>
              )}
              {!loadingCourses && !coursesError && courses.map((c) => (
                <Link key={c.id} to={`/courses/${c.id}`} className="card" style={{ textDecoration: "none" }}>
                  <h2>{c.title}</h2>
                  <p>{c.description}</p>
                </Link>
              ))}
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
