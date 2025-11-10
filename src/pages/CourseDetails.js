import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";

function CourseDetails() {
  const { id } = useParams();
  const { courses, analytics, setAnalytics } = useContext(DataContext);
  const course = courses.find((c) => c.id === id);

  useEffect(() => {
    if (id) {
      setAnalytics((prev) => ({
        ...prev,
        courseVisits: {
          ...prev.courseVisits,
          [id]: (prev.courseVisits[id] || 0) + 1,
        },
      }));
    }
  }, [id, setAnalytics]);

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
      <section className="card" style={{ maxWidth: 700, width: "100%", textAlign: "left" }}>
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


