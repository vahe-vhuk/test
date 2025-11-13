import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { createEnrollment } from "../services/api";

const courses = [
  { value: "", label: "Select a course" },
  { value: "c_cpp", label: "C / C++ Fundamentals" },
  { value: "embedded", label: "Embedded Systems" },
];

function Enroll() {
  const { setAnalytics } = useContext(DataContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: "",
    phone: "",
    notes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");
      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        course: formData.course,
        notes: formData.notes,
      };
      await createEnrollment(payload);
      setAnalytics((prev) => ({ ...prev, totalApplicants: prev.totalApplicants + 1 }));
      setSuccess("Thanks! Your enrollment has been submitted.");
      setFormData({ fullName: "", email: "", course: "", phone: "", notes: "" });
    } catch (e) {
      console.error("Enrollment submit failed:", e);
      setError(e?.message || "Failed to submit enrollment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
      <section className="card" style={{ maxWidth: 640, width: "100%", textAlign: "left" }}>
        <h2>Enroll</h2>
        <p style={{ color: "#bdbdbd", marginBottom: 20 }}>
          Fill in your details and we’ll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="form">
          {error ? (
            <div className="card" style={{ background: "#2a2a2a", borderColor: "#b00020", color: "#ffb4ab", marginBottom: 12 }}>
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="card" style={{ background: "#1b2b1b", borderColor: "#2e7d32", color: "#c8e6c9", marginBottom: 12 }}>
              {success}
            </div>
          ) : null}
          <div className="form-row">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="form-row">
            <label htmlFor="course">Course</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              disabled={submitting}
            >
              {courses.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          <div className="form-row">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="button primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Enroll;


