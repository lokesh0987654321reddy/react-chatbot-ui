import { createContext, useContext, useEffect, useState } from "react";
import { fetchChatHistory } from "../services/chatService";
import { u } from "framer-motion/client";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load history once
    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = async () => {
        try {
            const data = await fetchChatHistory();
            setChats(data);
        } catch (err) {
            console.error("Failed to load chats", err);
        } finally {
            setLoading(false);
        }
    };

    const addChat = (chat) => {
        setChats((prev) => [chat, ...prev]);
    };

    const updateChat = (chatId, updates) => {
        setChats((prev) =>
            prev.map((chat) =>
                chat.id === chatId ? { ...chat, ...updates } : chat
            )
        );
    };

    return (
        <ChatContext.Provider value={{ chats, addChat, updateChat, loading, loadChats }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChats = () => useContext(ChatContext);
