import { api, API_BASE_URL } from "./api";

export function streamChatOpenRouter(message, chatId, model, useRag, onToken, onComplete, onError) {
  const eventSource = new EventSource(
    `${API_BASE_URL}/chat/stream/openrouter?message=${encodeURIComponent(message)}&chatId=${encodeURIComponent(chatId)}&model=${model}&useRag=${useRag}`,
    { withCredentials: true }
  );

  eventSource.onmessage = (event) => {
    if (event.data === "[DONE]") {
      eventSource.close();
      onComplete && onComplete();
      return;
    }

    onToken(event.data);
  };

  eventSource.onerror = (err) => {
    console.error("SSE error", err);
    eventSource.close();
    onError && onError(err);
  };

  return eventSource;
}

export function streamChatOllama(message, chatId, useRag, onToken, onComplete, onError) {
  const eventSource = new EventSource(
    `${API_BASE_URL}/chat/stream?message=${encodeURIComponent(message)}&chatId=${encodeURIComponent(chatId)}&useRag=${useRag}`,
    { withCredentials: true }
  );

  eventSource.onmessage = (event) => {
    if (event.data === "[DONE]") {
      eventSource.close();
      onComplete && onComplete();
      return;
    }

    onToken(event.data);
  };

  eventSource.onerror = (err) => {
    console.error("SSE error", err);
    eventSource.close();
    onError && onError(err);
  };

  return eventSource;
}


export async function saveChat(chatId, userText, botText) {
  return api.post(`/chat/${chatId}/save`, {
    user: userText,
    bot: botText
  });
}

export async function updateChatTitle(chatId, title) {
  const res = await fetch(
    `${API_BASE_URL}/chats/${chatId}/title?title=${encodeURIComponent(title)}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update chat title");
  }

  return res.json();
}


export async function getChatMessages(chatId) {
  try {
    const response = await api.get(`/chat/${chatId}/messages`);
    return response.data;
  } catch (err) {
    console.error("Failed to get chat messages", err);
    return [];
  }
}

export const fetchChatHistory = async () => {
  const res = await api.get("/chat/history");
  return res.data;
};

export const createNewChat = async () => {
  const res = await api.post("/chat/new");
  return res.data;
};
