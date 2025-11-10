import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

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

  function handleSubmit(event) {
    event.preventDefault();
    // For now, just log the data
    console.log("Enrollment submission:", formData);
    setAnalytics((prev) => ({ ...prev, totalApplicants: prev.totalApplicants + 1 }));
    alert("Thanks! Your enrollment info has been logged to the console.");
  }

  return (
    <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
      <section className="card" style={{ maxWidth: 520, width: "100%", textAlign: "left" }}>
        <h2>Enroll</h2>
        <p style={{ color: "#bdbdbd", marginBottom: 20 }}>
          Fill in your details and we’ll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
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
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="button primary">Submit</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Enroll;


