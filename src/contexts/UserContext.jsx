import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const UserContext = createContext();

// Create the user provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  const login = (userData) => {
    setUser(userData);
    const newUserString = JSON.stringify(userData)
    cookies.set('loggedInUser', newUserString);
  };

  const logout = () => {
    setUser(null);
    cookies.remove('loggedInUser');
  };

  const editUser = (updatedUserData) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...updatedUserData };
      const updatedUserString = JSON.stringify(updatedUser);
      cookies.set('loggedInUser', updatedUserString);
      localStorage.setItem(updatedUser.username, updatedUserString);
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, editUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };