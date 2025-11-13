import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/api";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getCourseById(id);
        if (isMounted) setCourse(data);
      } catch (e) {
        console.error("Failed to load course:", e);
        if (isMounted) setError(e?.message || "Failed to load course");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    if (id) load();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
        <section className="card" style={{ maxWidth: 700, width: "100%", textAlign: "left" }}>
          <h2>Loading course...</h2>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
        <section className="card" style={{ maxWidth: 700, width: "100%", textAlign: "left" }}>
          <h2>Unable to load course</h2>
          <p style={{ color: "#bdbdbd" }}>{error}</p>
        </section>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
        <section className="card" style={{ maxWidth: 700, width: "100%", textAlign: "left" }}>
          <h2>Course Not Found</h2>
          <p>We couldn’t find the course you’re looking for.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
      <section className="card" style={{ maxWidth: 800, width: "100%", textAlign: "left" }}>
        <h2>{course.title}</h2>
        <p style={{ color: "#bdbdbd" }}>{course.description}</p>
        <div style={{ marginTop: 16 }}>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Instructor:</strong> {course.instructor}</p>
        </div>
      </section>
    </main>
  );
}

export default CourseDetails;


