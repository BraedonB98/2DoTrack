import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const UserAuth = () => {
  const [token, setToken] = useState();
  const [tokenExpiration, setTokenExpiration] = useState();
  const [UID, setUID] = useState();

  const login = useCallback((uid, token, expiration) => {
    setToken(token);
    setUID(uid);
    if (!expiration) {
      expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
      setTokenExpiration(expiration);
    } else {
      setTokenExpiration(expiration);
    }
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: expiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpiration(null);
    setUID(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      logoutTimer = setTimeout(
        logout,
        tokenExpiration.getTime() - new Date().getTime()
      );
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiration, logout]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      //checks if token expired
      login(userData.userId, userData.token, new Date(userData.expiration));
    }
  }, [login]);

  return { token, login, logout, UID };
};
