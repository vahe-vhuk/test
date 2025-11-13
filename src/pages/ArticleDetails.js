import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../services/api";

function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getArticleById(id);
        if (isMounted) setArticle(data);
      } catch (e) {
        console.error("Failed to load article:", e);
        if (isMounted) setError(e?.message || "Failed to load article");
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
          <h2>Loading article...</h2>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main" style={{ flexDirection: "column", alignItems: "center" }}>
        <section className="card" style={{ maxWidth: 700, width: "100%", textAlign: "left" }}>
          <h2>Unable to load article</h2>
          <p style={{ color: "#bdbdbd" }}>{error}</p>
        </section>
      </main>
    );
  }

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
      <section className="card" style={{ maxWidth: 800, width: "100%", textAlign: "left" }}>
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


