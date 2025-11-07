import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Evolon Programming Academy</h1>
        <p className="subtitle">
          Empowering the next generation of programmers through creativity,
          precision, and innovation.
        </p>
      </header>

      <main className="main">
        <section className="card">
          <h2>C / C++ Fundamentals</h2>
          <p>Build a solid foundation in low-level programming and algorithms.</p>
        </section>
        <section className="card">
          <h2>Embedded Systems</h2>
          <p>Learn to program microcontrollers and develop real-world IoT projects.</p>
        </section>
        <section className="card">
          <h2>Artificial Intelligence</h2>
          <p>Explore neural networks, vision systems, and smart applications.</p>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Evolon Academy — Founded by Vahe Sahakyan</p>
      </footer>
    </div>
  );
}

export default App;
