import React, { useContext, useMemo, useState } from "react";
import { DataContext } from "../context/DataContext";

function Admin() {
  const { analytics, courses, setCourses, articles, setArticles } = useContext(DataContext);
  const [isAuthed, setIsAuthed] = useState(false);

  const [newCourse, setNewCourse] = useState({
    id: "",
    title: "",
    description: "",
    duration: "",
    instructor: "",
  });

  const [newArticle, setNewArticle] = useState({
    id: "",
    title: "",
    content: "",
    date: "",
    author: "",
    excerpt: "",
  });

  function loginMock(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = form.get("user");
    const pass = form.get("pass");
    if (user && pass) {
      setIsAuthed(true);
    } else {
      alert("Enter any username and password to continue.");
    }
  }

  function addCourse(e) {
    e.preventDefault();
    if (!newCourse.id || !newCourse.title) {
      alert("Please provide at least id and title for the course.");
      return;
    }
    setCourses((prev) => [...prev, newCourse]);
    setNewCourse({ id: "", title: "", description: "", duration: "", instructor: "" });
  }

  function addArticle(e) {
    e.preventDefault();
    if (!newArticle.id || !newArticle.title) {
      alert("Please provide at least id and title for the article.");
      return;
    }
    setArticles((prev) => [...prev, newArticle]);
    setNewArticle({ id: "", title: "", content: "", date: "", author: "", excerpt: "" });
  }

  if (!isAuthed) {
    return (
      <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
        <section className="card" style={{ maxWidth: 420, width: "100%", textAlign: "left" }}>
          <h2>Admin Login</h2>
          <form onSubmit={loginMock} className="form" style={{ marginTop: 16 }}>
            <div className="form-row">
              <label htmlFor="user">Username</label>
              <input id="user" name="user" type="text" />
            </div>
            <div className="form-row">
              <label htmlFor="pass">Password</label>
              <input id="pass" name="pass" type="password" />
            </div>
            <div className="form-actions">
              <button type="submit" className="button primary">Login</button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="main" style={{ flexDirection: "column", alignItems: "stretch", gap: 20 }}>
      <section className="card" style={{ maxWidth: 1000, width: "100%", margin: "0 auto", textAlign: "left" }}>
        <h2>Analytics Dashboard</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
          <div className="card" style={{ width: 220 }}>
            <h2>Total Applicants</h2>
            <p style={{ fontSize: 28 }}>{analytics.totalApplicants}</p>
          </div>
          <div className="card" style={{ width: 220 }}>
            <h2>Total Visitors</h2>
            <p style={{ fontSize: 28 }}>{analytics.totalVisitors}</p>
          </div>
          <div className="card" style={{ width: 420, textAlign: "left" }}>
            <h2>Per-course Visits</h2>
            <ul>
              {Object.entries(analytics.courseVisits).map(([courseId, count]) => (
                <li key={courseId} style={{ color: "#ccc" }}>
                  {courseId}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="card" style={{ maxWidth: 1000, width: "100%", margin: "0 auto", textAlign: "left" }}>
        <h2>Manage Courses</h2>
        <form onSubmit={addCourse} className="form" style={{ marginTop: 12 }}>
          <div className="form-row"><label>ID</label><input value={newCourse.id} onChange={(e) => setNewCourse({ ...newCourse, id: e.target.value })} /></div>
          <div className="form-row"><label>Title</label><input value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} /></div>
          <div className="form-row"><label>Description</label><textarea rows="3" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} /></div>
          <div className="form-row"><label>Duration</label><input value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} /></div>
          <div className="form-row"><label>Instructor</label><input value={newCourse.instructor} onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })} /></div>
          <div className="form-actions"><button className="button primary" type="submit">Add Course</button></div>
        </form>
        <div style={{ marginTop: 16 }}>
          <h3 style={{ color: "#2f80ed" }}>Existing Courses</h3>
          <ul>
            {courses.map((c) => (
              <li key={c.id} style={{ color: "#ccc" }}>{c.id} — {c.title}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card" style={{ maxWidth: 1000, width: "100%", margin: "0 auto", textAlign: "left" }}>
        <h2>Manage Articles</h2>
        <form onSubmit={addArticle} className="form" style={{ marginTop: 12 }}>
          <div className="form-row"><label>ID</label><input value={newArticle.id} onChange={(e) => setNewArticle({ ...newArticle, id: e.target.value })} /></div>
          <div className="form-row"><label>Title</label><input value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} /></div>
          <div className="form-row"><label>Content</label><textarea rows="3" value={newArticle.content} onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })} /></div>
          <div className="form-row"><label>Date</label><input value={newArticle.date} onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })} /></div>
          <div className="form-row"><label>Author</label><input value={newArticle.author} onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })} /></div>
          <div className="form-row"><label>Excerpt</label><input value={newArticle.excerpt} onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })} /></div>
          <div className="form-actions"><button className="button primary" type="submit">Add Article</button></div>
        </form>
        <div style={{ marginTop: 16 }}>
          <h3 style={{ color: "#2f80ed" }}>Existing Articles</h3>
          <ul>
            {articles.map((a) => (
              <li key={a.id} style={{ color: "#ccc" }}>{a.id} — {a.title}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Admin;


