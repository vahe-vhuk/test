import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";

function ArticleDetails() {
  const { id } = useParams();
  const { articles } = useContext(DataContext);
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
        <section className="card" style={{ maxWidth: 700, width: "100%", textAlign: "left" }}>
          <h2>Article Not Found</h2>
          <p>We couldn’t find the article you’re looking for.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
      <section className="card" style={{ maxWidth: 700, width: "100%", textAlign: "left" }}>
        <h2>{article.title}</h2>
        <p style={{ color: "#bdbdbd", marginTop: 8 }}>
          {article.author ? `By ${article.author} • ` : null}
          {article.date}
        </p>
        <p style={{ marginTop: 16 }}>{article.content}</p>
      </section>
    </main>
  );
}

export default ArticleDetails;


