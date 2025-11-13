import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function ArticleEditor({ onPublish, initialTitle = "", initialContent = "" }) {
	const [title, setTitle] = useState(initialTitle);
	const [content, setContent] = useState(initialContent);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					[{ header: [1, 2, 3, false] }],
					["bold", "italic", "underline", "strike"],
					[{ list: "ordered" }, { list: "bullet" }],
					["link", "image", "video"],
					["clean"],
				],
				handlers: {
					image: function () {
						const url = window.prompt("Enter image URL");
						if (url) {
							const quill = this.quill;
							const range = quill.getSelection(true);
							quill.insertEmbed(range ? range.index : 0, "image", url, "user");
						}
					},
					video: function () {
						const url = window.prompt("Enter video URL (YouTube, Vimeo, mp4)");
						if (url) {
							const quill = this.quill;
							const range = quill.getSelection(true);
							quill.insertEmbed(range ? range.index : 0, "video", url, "user");
						}
					},
				},
			},
		};
	}, []);

	async function handlePublish() {
		try {
			setSubmitting(true);
			setError("");
			setSuccess("");
			if (!title.trim()) {
				setError("Title is required.");
				return;
			}
			if (!content || !content.trim()) {
				setError("Content is required.");
				return;
			}
			await onPublish?.({ title: title.trim(), content, author: "Admin" });
			setSuccess("Article published successfully.");
			setTitle("");
			setContent("");
		} catch (e) {
			console.error("Publish article failed:", e);
			setError(e?.message || "Failed to publish article");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<section className="card" style={{ maxWidth: 1000, width: "100%", margin: "0 auto", textAlign: "left" }}>
			<h2>Article Editor</h2>
			<p style={{ color: "#bdbdbd", marginBottom: 12 }}>Create and edit articles with formatting, images, and videos.</p>
			{error ? <div className="card" style={{ background: "#2a2a2a", borderColor: "#b00020", color: "#ffb4ab", marginBottom: 12 }}>{error}</div> : null}
			{success ? <div className="card" style={{ background: "#1b2b1b", borderColor: "#2e7d32", color: "#c8e6c9", marginBottom: 12 }}>{success}</div> : null}
			<div className="form" style={{ gap: 12 }}>
				<div className="form-row">
					<label htmlFor="article-title">Title</label>
					<input
						id="article-title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter title"
						disabled={submitting}
					/>
				</div>
				<div className="form-row">
					<label>Content</label>
					<div className="article-editor-wrapper">
						<ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} />
					</div>
				</div>
				<div className="form-actions">
					<button className="button primary" onClick={handlePublish} disabled={submitting}>
						{submitting ? "Publishing..." : "Publish"}
					</button>
				</div>
			</div>
		</section>
	);
}

export default ArticleEditor;


