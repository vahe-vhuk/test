import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../services/api";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const list = await getArticles();
        if (isMounted) setArticles(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("Failed to load articles:", e);
        if (isMounted) setError(e?.message || "Failed to load articles");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  return (
    <main className="main">
      {loading && (
        <section className="card" style={{ width: "100%", maxWidth: 700, textAlign: "left" }}>
          <h2>Loading articles...</h2>
        </section>
      )}
      {error && (
        <section className="card" style={{ width: "100%", maxWidth: 700, textAlign: "left" }}>
          <h2>Unable to load articles</h2>
          <p style={{ color: "#bdbdbd" }}>{error}</p>
        </section>
      )}
      {!loading && !error && articles.map((article) => (
        <Link
          key={article.id}
          to={`/articles/${article.id}`}
          className="card"
          style={{ width: 320, textAlign: "left", textDecoration: "none" }}
        >
          <h2>{article.title}</h2>
          <p>{article.excerpt || article.summary}</p>
        </Link>
      ))}
    </main>
  );
}

export default Articles;


