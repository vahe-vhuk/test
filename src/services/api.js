import axios from "axios";

const apiBaseURL = process.env.REACT_APP_API_URL || "http://57.131.21.244/api/";

export const api = axios.create({
	baseURL: apiBaseURL.replace(/\/+$/, "") + "/",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 15000,
});

function extractError(error) {
	if (error.response) {
		return { message: error.response.data?.message || "Request failed", status: error.response.status };
	}
	if (error.request) {
		return { message: "No response from server", status: 0 };
	}
	return { message: error.message || "Unexpected error", status: 0 };
}

export async function getCourses() {
	try {
		const res = await api.get("courses");
		return res.data;
	} catch (err) {
		const info = extractError(err);
		console.error("getCourses error:", info, err);
		throw info;
	}
}

export async function getCourseById(id) {
	try {
		const res = await api.get(`courses/${id}`);
		return res.data;
	} catch (err) {
		const info = extractError(err);
		console.error("getCourseById error:", info, err);
		throw info;
	}
}

export async function getArticles() {
	try {
		const res = await api.get("articles");
		return res.data;
	} catch (err) {
		const info = extractError(err);
		console.error("getArticles error:", info, err);
		throw info;
	}
}

export async function getArticleById(id) {
	try {
		const res = await api.get(`articles/${id}`);
		return res.data;
	} catch (err) {
		const info = extractError(err);
		console.error("getArticleById error:", info, err);
		throw info;
	}
}

export async function createEnrollment(data) {
	try {
		// Prefer /enrollments if available, fallback to /users
		const preferred = await api.post("enrollments", data).then((r) => r.data).catch(async (e) => {
			if (e?.response?.status === 404) {
				const res = await api.post("users", data);
				return res.data;
			}
			throw e;
		});
		return preferred;
	} catch (err) {
		const info = extractError(err);
		console.error("createEnrollment error:", info, err);
		throw info;
	}
}

export async function createArticle(data) {
	try {
		const res = await api.post("articles", data);
		return res.data;
	} catch (err) {
		const info = extractError(err);
		console.error("createArticle error:", info, err);
		throw info;
	}
}


