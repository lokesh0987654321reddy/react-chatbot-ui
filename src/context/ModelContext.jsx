import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchModels } from "../services/modelService";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [models, setModels] = useState([]);
  const [activeModel, setActiveModel] = useState(null);

  useEffect(() => {
    fetchModels().then((data) => {
      setModels(data);
      setActiveModel(data[0]); // default model
    });
  }, []);

  return (
    <ModelContext.Provider
      value={{ models, activeModel, setActiveModel }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModels = () => useContext(ModelContext);
