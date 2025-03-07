// src/services/api.js
const API_URL = "http://localhost:8080/api/tasks";

export async function getTasks() {
	const response = await fetch(API_URL);
	return response.json();
}

export async function createTask(task) {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(task),
	});
	return response.json();
}

export async function updateTask(id, task) {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(task),
	});
	return response.json();
}

export async function deleteTask(id) {
	await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
