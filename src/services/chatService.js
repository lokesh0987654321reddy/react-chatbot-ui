// src/services/chatService.js
// Service for accessing chat APIs


const API_BASE_URL = "http://127.0.0.1:8000";

export async function sendMessage(message) {
  // POST request to /chat endpoint with expected body
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error("API request failed");
  }
  return response.json();
}

// Add more functions as needed for other API endpoints
