import { useState, useCallback } from "react";

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: null,
    email: null,
    uid: null,
    imageUrl: `data/uploads/images/default.svg`,
  });

  const setUser = useCallback((name, email, uid, imageUrl) => {
    setUserInfo({ name, email, uid, imageUrl });
  }, []);

  const removeUser = useCallback(() => {
    setUserInfo({
      name: null,
      email: null,
      uid: null,
      imageUrl: `data/uploads/images/default.svg`,
    });
  }, []);

  return {
    name: userInfo.name,
    email: userInfo.email,
    uid: userInfo.uid,
    imageUrl: userInfo.imageUrl,
    setUser,
    removeUser,
  };
};
