import { createContext } from "react";

export const UserContext = createContext({
  name: null,
  email: null,
  userId: null,
  imageUrl: `data/uploads/images/default.svg`,
  setUser: () => {},
  removeUser: () => {},
});
