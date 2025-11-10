import React from "react";
import { Link } from "react-router-dom";

// The list now comes from the DataContext on the detail page,
// but for this grid we can keep simple mock titles here or link to known IDs.
const mockArticles = [
  { id: "1", title: "Getting Started with C/C++", excerpt: "Your first steps into systems programming." },
  { id: "2", title: "Demystifying Microcontrollers", excerpt: "From pins to peripherals, what you need to know." },
  { id: "3", title: "Memory Management Essentials", excerpt: "Pointers, stacks, heaps—and how to avoid pitfalls." },
];

function Articles() {
  return (
    <main className="main">
      {mockArticles.map((article) => (
        <Link
          key={article.id}
          to={`/articles/${article.id}`}
          className="card"
          style={{ width: 320, textAlign: "left", textDecoration: "none" }}
        >
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
        </Link>
      ))}
    </main>
  );
}

export default Articles;


