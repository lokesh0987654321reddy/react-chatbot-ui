import { api } from "./api";

export const fetchModels = async () => {
  const res = await api.get("/models");
  return res.data;
};