import { createContext, useContext, useEffect, useState } from "react";
import storage from "../helpers/storage";

const LikesContext = createContext({});

export const useLikes = () => useContext(LikesContext);

export const LikesProvider = ({ children }) => {
  useEffect(() => {
    const allStorageContents = storage.getAll();
    setLikesState((prevState) => ({
      ...prevState,
      likes: allStorageContents,
    }));
  }, []);

  const [likesState, setLikesState] = useState({
    likes: {},
    likeItem: (item) => {
      const { id } = item;

      storage.addToLocalStorage(id, item);

      setLikesState((prevState) => {
        return {
          ...prevState,
          likes: { ...prevState.likes, ...{ [id]: item } },
        };
      });
    },
    removeItem: (item) => {
      const { id } = item;

      storage.removeFromLocalStorage(id);

      setLikesState((prevState) => {
        delete prevState.likes[id];
        return {
          ...prevState,
        };
      });
    },
  });

  return (
    <LikesContext.Provider value={likesState}>{children}</LikesContext.Provider>
  );
};

export default LikesContext;
